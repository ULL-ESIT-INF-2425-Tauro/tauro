package routes

import (
	"ms-tauro-products/handlers"

	"github.com/gofiber/fiber/v2"
)

// Route constant
const basePath = "/api/products"

func SetupRoutes(app *fiber.App) {
	// Grouping product-related routes
	productGroup := app.Group(basePath)

	// Define routes
	productGroup.Get("/", handlers.GetProductsHandler)         // GET /api/products
	productGroup.Post("/", handlers.CreateProductHandler)      // POST /api/products
	productGroup.Put("/:id", handlers.UpdateProductHandler)    // PUT /api/products/:id
	productGroup.Delete("/:id", handlers.DeleteProductHandler) // DELETE /api/products/:id

	productGroup.Get("/search", handlers.GetProductHandler)    // GET /api/products/search/:params
	productGroup.Get("/available-id", handlers.GetAvailableID) // GET /api/products/code
}
