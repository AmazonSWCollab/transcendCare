package server

import (
  "github.com/AmazonSWCollab/transcenCare/backend/provider/scraper"

	"github.com/gocolly/colly/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func RunApp() error {
	err := godotenv.Load()
	
  if err != nil {
		return err
	}

  app := fiber.New()

	app.Use(func(c *fiber.Ctx) error {
		c.Set("Content-Type", "application/json")
		return c.Next()
	})

	app.Get("/api/v1/providers", scraper.Handler)

	app.Listen(":4041")

  return nil
}

