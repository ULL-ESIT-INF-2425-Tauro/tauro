package services

import (
	"context"
	"fmt"
	"ms-tauro-products/errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Helper function to find the lowest available id
func GetLowestAvailableID(collection *mongo.Collection) (*int, *errors.BaseErrorResponse) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Projection to only include the "id" field
	projection := bson.D{{Key: "_id", Value: 0}, {Key: "id", Value: 1}}
	opts := options.Find().SetProjection(projection).SetSort(bson.D{{Key: "id", Value: 1}})

	// IDs sorted in ascending order
	cursor, err := collection.Find(ctx, bson.D{}, opts)
	if err != nil {
		return nil, errors.NewInternalServerError(
			fmt.Sprintf("error fetching IDs: %v", err.Error()),
		)
	}
	defer cursor.Close(ctx)

	// Find the smallest available ID
	expectedID := 1
	for cursor.Next(ctx) {
		var product struct {
			ID int `bson:"id"`
		}
		if err := cursor.Decode(&product); err != nil {
			return nil, errors.NewInternalServerError(
				fmt.Sprintf("error decoding product: %v", err.Error()),
			)
		}

		// If the current ID does not match the expected ID, the expected ID is available
		if product.ID != expectedID {
			return &expectedID, nil
		}

		expectedID++
	}

	// If all IDs are consecutive, the next available ID is the expected one
	return &expectedID, nil
}
