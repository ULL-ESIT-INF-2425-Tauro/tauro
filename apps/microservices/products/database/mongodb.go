package database

import (
	"context"
	"log"
	"ms-tauro-products/configs"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoClient *mongo.Client
var mongoDB *mongo.Database

func ConnectMongo() {
	config := configs.LoadConfig()

	var err error
	mongoClient, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(config.MongoURI))
	if err != nil {
		log.Fatalf("failed to connect to MongoDB => %v", err)
	}

	mongoDB = mongoClient.Database(config.DBName)

	if err := CheckMongoConnection(); err != nil {
		log.Fatalf("failed to connect to MongoDB =>  %v", err)
	}
	log.Println("Connected to MongoDB")

}

func GetMongoDB() *mongo.Database {
	return mongoDB
}

func CheckMongoConnection() error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	return mongoClient.Ping(ctx, nil)
}
