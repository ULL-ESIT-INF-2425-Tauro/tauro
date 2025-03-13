package handlers

import (
	"fmt"
	"ms-tauro-products/errors"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// Extracts and converts query parameters from the request context
func parseQueryParameters(c *fiber.Ctx) (*int, *string, *string, *float64, *bool, *float64, *errors.BaseErrorResponse) {
	allowedParams := map[string]bool{
		"id":        true,
		"name":      true,
		"category":  true,
		"price":     true,
		"available": true,
		"igic":      true,
	}

	// Validate query parameters
	for key := range c.Queries() {
		if !allowedParams[key] {
			return nil, nil, nil, nil, nil, nil, errors.NewBadRequest(fmt.Sprintf("invalid query parameter: %s", key))
		}
	}

	// Get the search parameters from the query
	idParam := c.Query("id")
	nameParam := c.Query("name")
	categoryParam := c.Query("category")
	priceParam := c.Query("price")
	availableParam := c.Query("available")
	igicParam := c.Query("igic")

	// Convert parameters to their appropriate types
	var id *int
	if idParam != "" {
		idValue, err := strconv.Atoi(idParam)
		if err == nil {
			id = &idValue
		}
	}

	var name *string
	if nameParam != "" {
		name = &nameParam
	}

	var category *string
	if categoryParam != "" {
		category = &categoryParam
	}

	var price *float64
	if priceParam != "" {
		priceValue, err := strconv.ParseFloat(priceParam, 64)
		if err == nil {
			price = &priceValue
		}
	}

	var available *bool
	if availableParam != "" {
		availableValue := availableParam == "true"
		available = &availableValue
	}

	var igic *float64
	if igicParam != "" {
		igicValue, err := strconv.ParseFloat(igicParam, 64)
		if err == nil {
			igic = &igicValue
		}
	}

	return id, name, category, price, available, igic, nil
}
