package main

import (
  "github.com/AmazonSWCollab/transcenCare/backend/provider/scraper"
  
  "github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
	
  "github.com/gocolly/colly/v2"
	"github.com/joho/godotenv"
)

func RunApp() error {
	err := godotenv.Load()
	
  if err != nil {
		return err
	}

  app := fiber.New()
  
  app.Use(cors.New())
	app.Use(logger.New())
	
  app.Use(func(c *fiber.Ctx) {
		c.Set("Content-Type", "application/json")
		c.Next()
	})

	app.Get("/docs/*", swagger.HandlerDefault)

	app.Get("/api/v1/providers", scraper.Handler)


	app.Listen(":4041")

  return nil
}

