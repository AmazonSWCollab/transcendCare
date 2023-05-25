package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/AmazonSWCollab/transcendCare/providers"
	"github.com/AmazonSWCollab/transcendCare/providers/scraper"
	"github.com/AmazonSWCollab/transcendCare/providers/docs"
	"github.com/AmazonSWCollab/transcendCare/providers/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
	"github.com/joho/godotenv"
)


func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal(err)
	}

	app := fiber.New(fiber.Config{
		GETOnly: true,
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	app.Use(logger.New())

	app.Use(func(c *fiber.Ctx) error {
		c.Set("Content-Type", "application/json")
		return c.Next()
	})

  docs.init()

  app.Get("/docs/*", swagger.HandlerDefault)
	app.Get("/api/v1/providers", func(w *fiber.Ctx) error {
		dbPath := os.Getenv("DATABASE_URL")
		if dbPath == "" {
			return fmt.Errorf("DATABASE_URL not set")
		}

		db, err := database.NewPostgres(dbPath)
		if err != nil {
			log.Fatal("Connection to database:", err)
		}

		providerArray, err := providers.ProviderStore.Providers(db)

		if err != nil || len(providerArray) == 0 {
			

			// then return marshalled providers
			b, err := json.Marshal(scraper.RunScrape())

			// add providers to database first
			for _, p := range providerArray {
				err := providers.ProviderStore.NewProvider(db, &p)
				if err != nil {
					log.Println("failed to add provider:", err)
					return err
				}
			}

			if err != nil {
				log.Println("failed to serialize response:", err)
				return err
			}

			return w.Send(b)
		}
		// otherwise return providers from database
		b, err := json.Marshal(providerArray)
		if err != nil {
			log.Println("failed to serialize response:", err)
			return err
		}
		return w.Send(b)
	})

	app.Listen(":4041")
}

