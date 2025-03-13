package services

import (
	"context"
	"fmt"
	"time"

	"ms-tauro-products/database"
	"ms-tauro-products/errors"
	"ms-tauro-products/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Fetches all products from the database
func GetProductsService() ([]models.ProductResponse, *errors.BaseErrorResponse) {
	// Define a timeout context for the database operation
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := database.GetMongoDB().Collection("products")

	// Fetch all products from the collection
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("error during find operation: %v", err.Error()),
		)
	}
	defer cursor.Close(ctx)

	var products []models.ProductResponse
	if err := cursor.All(ctx, &products); err != nil {
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("error decoding products: %v", err),
		)
	}

	return products, nil
}

// Creates a new product
func CreateProductService(productRequest *models.ProductRequest) (*models.ProductResponse, *errors.BaseErrorResponse) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := database.GetMongoDB().Collection("products")

	// Check if a product with the same id already exists in the database
	var existingProduct models.Product
	err := collection.FindOne(ctx, bson.M{"id": productRequest.ID}).Decode(&existingProduct)
	if err == nil {
		return nil, errors.NewBadRequest(
			fmt.Sprintf("product with id %d already exists", productRequest.ID),
		)
	}

	currentTime := time.Now()

	productResponse := productRequest.AdaptToProductResponse(&models.ProductMetadata{
		CreatedAt: currentTime,
		UpdatedAt: currentTime,
	})

	_, err = collection.InsertOne(ctx, productResponse)
	if err != nil {
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("error inserting product into MongoDB: %v", err),
		)
	}

	return productResponse, nil
}

// Updates an existing product
func UpdateProductService(id int, updatedProduct *models.ProductRequest) (*models.ProductResponse, *errors.BaseErrorResponse) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := database.GetMongoDB().Collection("products")

	// Filter to check for duplicate ID's excluding the current product ID
	duplicateFilter := bson.M{
		"id": bson.M{
			"$eq": updatedProduct.ID,
			"$ne": id,
		},
	}

	// Check for duplicated ID's using filter
	err := collection.FindOne(ctx, duplicateFilter).Err()
	if err == nil {
		return nil, errors.NewBadRequest(
			"the provided product ID already exists for another product",
		)
	} else if err != mongo.ErrNoDocuments {
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("an unexpected error occurred while checking for duplicates: %v", err),
		)
	}

	var productToUpdate *models.ProductResponse
	err = collection.FindOne(ctx, bson.M{"id": id}).Decode(&productToUpdate)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.NewNotFoundError(
				fmt.Sprintf("product with id %v not found", id),
			)
		}
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("error retrieving product to update: %v", err),
		)
	}

	productToUpdateMetadata := productToUpdate.AdaptToProductMetadata()
	productToUpdateMetadata.UpdatedAt = time.Now()

	productResponse := updatedProduct.AdaptToProductResponse(productToUpdateMetadata)

	// Filter to locate the product to update
	filter := bson.M{"id": id}
	update := bson.M{
		"$set": bson.M{
			"id":        productResponse.ID,
			"name":      productResponse.Name,
			"category":  productResponse.Category,
			"price":     productResponse.Price,
			"pvp":       productResponse.PVP,
			"igic":      productResponse.IGIC,
			"available": productResponse.Available,
			"kg":        productResponse.KG,
			"units":     productResponse.Units,
			"updatedAt": productResponse.UpdatedAt,
		},
	}

	result, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("an unexpected error occurred while updating product: %v", err),
		)
	}

	// Check if the product was found and updated
	if result.MatchedCount == 0 {
		return nil, errors.NewNotFoundError(
			fmt.Sprintf("product with id %v not found", id),
		)
	}

	return productResponse, nil
}

// Deletes the product
func DeleteProductService(id int) *errors.BaseErrorResponse {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := database.GetMongoDB().Collection("products")

	result, err := collection.DeleteOne(ctx, bson.M{"id": id})
	if err != nil {
		return errors.NewInternalServerError(
			fmt.Sprintf("error deleting product: %v", err),
		)
	}

	if result.DeletedCount == 0 {
		return errors.NewNotFoundError(
			fmt.Sprintf("product with id %v not found", id),
		)
	}

	return nil
}
