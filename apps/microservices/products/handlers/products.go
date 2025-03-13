package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"ms-tauro-products/database"
	"ms-tauro-products/errors"
	"ms-tauro-products/models"
	"ms-tauro-products/responses"
	"ms-tauro-products/services"

	"github.com/gofiber/fiber/v2"
)

// Handles the request to fetch the list of products
// @Summary Get products - [#GET_0]
// @Description Retrieves the list of all products from the database.
// @Tags Products
// @Produce json
// @Success 200 {object} examples.Success_GET0{data=[]models.ProductResponse} "List of products"
// @Failure 500 {object} examples.InternalServerError_Generic "Internal server error"
// @Router /api/products [get]
func GetProductsHandler(c *fiber.Ctx) error {
	products, err := services.GetProductsService()
	if err != nil {
		return c.Status(err.Code).JSON(err)
	}

	// Return the list of products with status 200
	return c.Status(http.StatusOK).JSON(
		responses.NewSuccessResponse(
			http.StatusOK,
			"products retrieved successfully",
			products,
		),
	)
}

// Handles the creation of a new product
// @Summary Create product - [#POST_0]
// @Description Creates a new product with the provided details and returns it on success.
// @Tags Products
// @Accept json
// @Produce json
// @Param product body models.ProductRequest true "Product data"
// @Success 201 {object} examples.Success_POST0{data=models.ProductResponse} "Created product"
// @Failure 400 {object} examples.ValidationError_Generic "Invalid product data"
// @Failure 500 {object} examples.InternalServerError_Generic "Error creating product"
// @Router /api/products [post]
func CreateProductHandler(c *fiber.Ctx) error {
	var product models.ProductRequest

	// Parse the body as JSON and strictly disallow unknown fields
	body := c.Body()
	decoder := json.NewDecoder(bytes.NewReader(body))
	decoder.DisallowUnknownFields()

	// Decode the JSON body into the product struct
	if err := decoder.Decode(&product); err != nil {
		// Check for specific unmarshal type errors
		if jsonError, ok := err.(*json.UnmarshalTypeError); ok {
			fieldName := jsonError.Field
			expectedType := jsonError.Type.String()

			return c.Status(http.StatusBadRequest).JSON(
				errors.NewValidationError(
					"invalid field type in request body",
					map[string]string{
						fieldName: fmt.Sprintf("expected type %s", expectedType),
					},
				),
			)
		}

		// Handle generic JSON parsing errors
		return c.Status(http.StatusBadRequest).JSON(
			errors.NewValidationError(
				"invalid JSON format or unexpected fields",
				map[string]string{
					"body": err.Error(),
				},
			),
		)
	}

	// Create product
	createdProduct, err := services.CreateProductService(&product)
	if err != nil {
		return c.Status(err.Code).JSON(err)
	}

	// Return the created product with status 201
	return c.Status(http.StatusCreated).JSON(
		responses.NewSuccessResponse(
			http.StatusCreated,
			"product created successfully",
			createdProduct,
		),
	)
}

// Handles the update of a product by ID
// @Summary Update product - [#PUT_0]
// @Description Updates an existing product by its ID.
// @Tags Products
// @Accept json
// @Produce json
// @Param id path int true "Product ID"
// @Param product body models.ProductRequest true "Product"
// @Success 200 {object} examples.Success_PUT0{data=models.ProductResponse} "Updated product"
// @Failure 400 {object} examples.ValidationError_Generic "Invalid product data"
// @Failure 404 {object} examples.NotFoundError_Generic "Resource not found"
// @Failure 500 {object} examples.InternalServerError_Generic "Error creating product"
// @Router /api/products/{id} [put]
func UpdateProductHandler(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			errors.NewValidationError(
				"invalid parameter format",
				map[string]string{
					"params": fmt.Sprintf("expected an integer but received: '%s'", c.Params("id")),
				},
			),
		)
	}

	var product *models.ProductRequest
	var updatedProduct *models.ProductResponse

	// Parse the body as JSON and strictly disallow unknown fields
	body := c.Body()
	decoder := json.NewDecoder(bytes.NewReader(body))
	decoder.DisallowUnknownFields()

	// Decode the JSON body into the product struct
	if err := decoder.Decode(&product); err != nil {
		// Check for specific unmarshal type errors
		if jsonError, ok := err.(*json.UnmarshalTypeError); ok {
			fieldName := jsonError.Field
			expectedType := jsonError.Type.String()

			return c.Status(http.StatusBadRequest).JSON(
				errors.NewValidationError(
					"invalid field type in request body",
					map[string]string{
						fieldName: fmt.Sprintf("expected type %s", expectedType),
					},
				),
			)
		}

		// Handle generic JSON parsing errors
		return c.Status(http.StatusBadRequest).JSON(
			errors.NewValidationError(
				"invalid JSON format or unexpected fields",
				map[string]string{
					"body": err.Error(),
				},
			),
		)
	}

	// Updates the product
	var errorResp *errors.BaseErrorResponse
	updatedProduct, errorResp = services.UpdateProductService(id, product)
	if errorResp != nil {
		return c.Status(errorResp.Code).JSON(errorResp)
	}

	// Return the updated product with status 200
	return c.Status(http.StatusOK).JSON(
		responses.NewSuccessResponse(
			http.StatusOK,
			"product updated successfully",
			updatedProduct,
		),
	)
}

// Handles the deletion of a product by ID
// @Summary Delete product - [#DEL_0]
// @Description Deletes an existing product by its ID.
// @Tags Products
// @Param id path int true "Product ID"
// @Success 200 {object} examples.Success_DEL0{data=nil} "Product deleted successfully"
// @Failure 400 {object} examples.ValidationError_DEL0 "Invalid parameter format"
// @Failure 404 {object} examples.NotFoundError_Generic "Product not found"
// @Failure 500 {object} examples.InternalServerError_Generic "Error deleting product"
// @Router /api/products/{id} [delete]
func DeleteProductHandler(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			errors.NewValidationError(
				"invalid parameter format",
				map[string]string{
					"params": fmt.Sprintf("expected an integer but received: '%s'", c.Params("id")),
				},
			),
		)
	}

	// Deletes the product
	errResp := services.DeleteProductService(id)
	if errResp != nil {
		return c.Status(errResp.Code).JSON(errResp)
	}

	// Return 200 No Content if the deletion was successful
	return c.Status(http.StatusOK).JSON(responses.NewSuccessResponse(
		200,
		"product deleted successfully",
		nil,
	))
}

// Handles product search queries
// @Summary Products search queries - [#GET_2]
// @Description Retrieves a list of products from the database based on query parameters.
// @Tags Products
// @Produce json
// @Param id query int false "Filter by product ID"
// @Param name query string false "Filter by product name"
// @Param category query string false "Filter by product category"
// @Param price query number false "Filter by product price"
// @Param available query bool false "Filter by availability status"
// @Param igic query number false "Filter by IGIC"
// @Success 200 {object} examples.Success_GET0{data=[]models.ProductResponse} "List of products"
// @Failure 400 {object} examples.ValidationError_GET2 "Invalid parameters"
// @Failure 404 {object} examples.NotFoundError_GET2 "Product not found"
// @Failure 500 {object} examples.InternalServerError_Generic "Internal server error"
// @Router /api/products/search [get]
func GetProductHandler(c *fiber.Ctx) error {
	// Parse the query parameters
	id, name, category, price, available, igic, err := parseQueryParameters(c)

	if err != nil {
		return c.Status(err.Code).JSON(err)
	}

	// Call the service that searches for products in Elasticsearch
	products, err := services.SearchProductsInElastic(id, name, category, price, available, igic)
	if err != nil {
		return c.Status(err.Code).JSON(err)
	}

	// Return the found products
	return c.Status(http.StatusOK).JSON(
		responses.NewSuccessResponse(
			200,
			"products retrieved successfully",
			products,
		),
	)
}

// Handles the request to get the lowest available ID
// @Summary Get available ID - [#GET_1]
// @Description Retrieves the lowest available product ID from the database. This is useful for ensuring that new products are assigned an appropriate unique identifier.
// @Tags Products
// @Produce json
// @Success 200 {object} examples.Success_GET1{data=int} "Lowest available ID"
// @Failure 500 {object} examples.InternalServerError_Generic "Error searching for available IDs"
// @Router /api/products/available-id [get]
func GetAvailableID(c *fiber.Ctx) error {
	collection := database.GetMongoDB().Collection("products")
	id, err := services.GetLowestAvailableID(collection)
	if err != nil {
		return c.Status(err.Code).JSON(err)
	}

	// Return the found id with status 200
	return c.Status(http.StatusOK).JSON(
		responses.NewSuccessResponse(
			http.StatusOK,
			"successfully retrieved the lowest available ID",
			id,
		),
	)
}
