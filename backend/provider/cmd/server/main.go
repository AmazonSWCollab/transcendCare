package main

import (
	"fmt"
	"os"

	// "github.com/AmazonSWCollab/transcendCare/backend/provider/database"
	"github.com/AmazonSWCollab/transcendCare/backend/provider/scraper"
	"github.com/go-delve/delve/pkg/config"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
)

type EnvVars struct {
	PORT string
}

func RunApp(env EnvVars) (*fiber.App, func(), error) {
	// database, err := db.NewProviders()

	// if err != nil {
	// 	return nil, nil, err
	// }

	app := fiber.New()
	app.Use(cors.New())
	app.Use(logger.New())
	app.Use(func(c *fiber.Ctx) {
		c.Set("Content-Type", "application/json")
		c.Next()
	})

	app.Get("/swagger/*", swagger.HandlerDefault)

	app.Get("/api/v1/providers", scraper.Handler)

	app.Listen(":4041")

	return nil, nil, nil
}

func run(env EnvVars) (func(), error) {
	app, cleanup, err := RunApp(env)
	if err != nil {
		return nil, err
	}

	var port = fmt.Sprintf("0.0.0.0.%s", env.PORT)
	go func() {
		app.Listen(port)
	}()

	return func() {
		cleanup()
		app.Shutdown()
	}, nil
}

func main() {
	var exitCode int

	defer func() {
		os.Exit(exitCode)
	}()

	env, err := config.LoadConfig()
	if err != nil {
		fmt.Printf("error: %v", err)
		exitCode = 1
		return
	}

	cleanup, err := run(env)

	defer cleanup()
	if err != nil {
		fmt.Printf("Error: %v", err)
		exitCode = 1
		return
	}

	shutdown.Gracefully()
}
