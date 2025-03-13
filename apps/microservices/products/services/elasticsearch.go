package services

import (
	"context"
	"encoding/json"
	"fmt"
	"ms-tauro-products/database"
	"ms-tauro-products/errors"
	"ms-tauro-products/models"
	"strings"
)

func SearchProductsInElastic(id *int, name *string, category *string, price *float64, available *bool, igic *float64) ([]models.Product, *errors.BaseErrorResponse) {
	esClient := database.GetElasticClient()

	// Create a context for the search
	ctx := context.Background()

	// Build the query
	query := map[string]interface{}{
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"must": []map[string]interface{}{},
			},
		},
	}

	// Add conditions to the query based on provided parameters
	if id != nil {
		query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"] = append(query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"].([]map[string]interface{}),
			map[string]interface{}{
				"term": map[string]interface{}{
					"id": *id,
				},
			})
	}

	if name != nil {
		query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"] = append(query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"].([]map[string]interface{}),
			map[string]interface{}{
				"match": map[string]interface{}{
					"name": *name,
				},
			})
	}

	if category != nil {
		query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"] = append(query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"].([]map[string]interface{}),
			map[string]interface{}{
				"match": map[string]interface{}{
					"category": *category,
				},
			})
	}

	if price != nil {
		query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"] = append(query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"].([]map[string]interface{}),
			map[string]interface{}{
				"term": map[string]interface{}{
					"price": *price,
				},
			})
	}

	if available != nil {
		query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"] = append(query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"].([]map[string]interface{}),
			map[string]interface{}{
				"term": map[string]interface{}{
					"available": *available,
				},
			})
	}

	if igic != nil {
		query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"] = append(query["query"].(map[string]interface{})["bool"].(map[string]interface{})["must"].([]map[string]interface{}),
			map[string]interface{}{
				"term": map[string]interface{}{
					"igic": *igic,
				},
			})
	}

	// Convert the query to JSON
	queryJSON, err := json.Marshal(query)
	if err != nil {
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("error marshalling query to JSON: %v", err.Error()),
		)
	}

	// Execute the search query
	res, err := esClient.Search(
		esClient.Search.WithContext(ctx),
		esClient.Search.WithIndex("product_catalog.products"),
		esClient.Search.WithBody(strings.NewReader(string(queryJSON))),
		esClient.Search.WithTrackTotalHits(true),
	)

	if err != nil {
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("error executing search query: %v", err.Error()),
		)
	}
	defer res.Body.Close()

	if res.IsError() {
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("error in search response: %s", res.String()),
		)
	}

	// Decode the response JSON
	var result struct {
		Hits struct {
			Hits []struct {
				Source models.Product `json:"_source"`
			} `json:"hits"`
		} `json:"hits"`
	}

	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("error parsing the search response: %v", err.Error()),
		)
	}

	// Extract products from the search results
	var products []models.Product
	for _, hit := range result.Hits.Hits {
		products = append(products, hit.Source)
	}

	if len(products) == 0 {
		// Compile the search parameters into a detailed string
		params := []string{}
		if id != nil {
			params = append(params, fmt.Sprintf("id=%d", *id))
		}
		if name != nil {
			params = append(params, fmt.Sprintf("name=%s", *name))
		}
		if category != nil {
			params = append(params, fmt.Sprintf("category=%s", *category))
		}
		if price != nil {
			params = append(params, fmt.Sprintf("price=%.2f", *price))
		}
		if available != nil {
			params = append(params, fmt.Sprintf("available=%v", *available))
		}
		if igic != nil {
			params = append(params, fmt.Sprintf("igic=%.2f", *igic))
		}

		// Construct the message
		return nil, errors.NewNotFoundError(
			fmt.Sprintf("no products found matching the parameters: %s", strings.Join(params, ", ")),
		)
	}

	return products, nil
}
