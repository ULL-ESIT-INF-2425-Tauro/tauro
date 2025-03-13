package main

import (
	"log"
	"ms-tauro-products/configs"
	"ms-tauro-products/database"
	"ms-tauro-products/errors"
	"ms-tauro-products/middlewares"
	"ms-tauro-products/routes"

	"github.com/MarceloPetrucio/go-scalar-api-reference"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

// @title Tauro Product Catalog API
// @version 1.0
// @description A Go-based API built with Fiber for managing product information for 'Congelados Tauro', a company specializing in frozen goods.<br><br>
// @description This API integrates MongoDB for data persistence and Elasticsearch for advanced search capabilities.
// @BasePath /
func main() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading .env file")
	}

	log.Println("Environment variables loaded successfully")

	// Load config
	config := configs.LoadConfig()

	// Initialize database connections
	database.ConnectMongo()
	// database.ConnectElastic()

	// Initialize Fiber app
	app := fiber.New()

	/* // CORS middleware
	app.Use(func(c *fiber.Ctx) error {
		allowedOrigins := strings.Split(config.AllowedOrigins, ",")
		origin := c.Get("Origin")

		if origin == "" {
			return c.Status(fiber.StatusForbidden).JSON(errors.NewCORSError(
				"origin header is missing",
				origin,
			))
		}

		for _, allowedOrigin := range allowedOrigins {
			if strings.TrimSpace(origin) == strings.TrimSpace(allowedOrigin) {

				return cors.New(cors.Config{
					AllowOrigins: origin,
				})(c)
			}
		}

		return c.Status(fiber.StatusForbidden).JSON(errors.NewCORSError(
			"the requested origin is not allowed by CORS policy",
			origin,
		))
	}) */
	app.Use(cors.New(cors.Config{
		AllowOrigins: config.AllowedOrigins,
	}))

	// Logger Middleware
	app.Use(middlewares.Logger)

	// Routes
	routes.SetupRoutes(app)

	// Setup documentation route
	app.Get("/docs", func(c *fiber.Ctx) error {
		htmlContent, err := scalar.ApiReferenceHTML(&scalar.Options{
			SpecURL: "./docs/swagger.json",
			CustomOptions: scalar.CustomOptions{
				PageTitle: "Tauro Product Catalog API",
			},
			DarkMode: true,
		})

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(errors.BaseErrorResponse{
				Code:    500,
				Success: false,
				Message: "Documentation Error",
				Detail:  "Failed to load API reference",
			})
		}

		// Render html content
		return c.Type("html").SendString(htmlContent)
	})

	// Start the server
	log.Printf("Server is running on port: %s\n", config.Port)
	if err := app.Listen(":" + config.Port); err != nil {
		log.Fatal(err)
	}
}
