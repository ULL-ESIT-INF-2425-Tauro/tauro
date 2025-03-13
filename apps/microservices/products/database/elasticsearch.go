package database

import (
	"crypto/x509"
	"fmt"
	"log"
	"ms-tauro-products/configs"
	"os"

	"github.com/elastic/go-elasticsearch/v8"
)

var esClient *elasticsearch.Client

// Initializes the Elasticsearch client with a CA certificate for security
func ConnectElastic() {
	// Read the CA certificate from the provided path
	caCert, err := os.ReadFile(configs.LoadConfig().CaCertPath)
	if err != nil {
		log.Printf("error reading CA certificate => %v", err)
		return
	}

	// Create a CertPool and append the CA certificate
	caCertPool := x509.NewCertPool()
	if ok := caCertPool.AppendCertsFromPEM(caCert); !ok {
		log.Printf("failed to append CA certificate")
		return
	}

	config := configs.LoadConfig()

	// Create a new Elasticsearch client
	esClient, err = elasticsearch.NewClient(elasticsearch.Config{
		Addresses: []string{config.ElasticAddress},
		Username:  config.ElasticUser,
		Password:  config.ElasticPassword,
		CACert:    caCert,
	})

	if err != nil {
		log.Printf("error creating Elasticsearch client => %v", err)
	}

	// Check the connection to Elasticsearch
	if err := CheckElasticConnection(); err != nil {
		log.Fatalf("failed to connect to Elasticsearch => %v", err)
	}
	log.Println("Connected to Elasticsearch")

}

// Verifies the connection to Elasticsearch
func CheckElasticConnection() error {
	// Get basic info from the Elasticsearch cluster to test connection
	res, err := esClient.Info()
	if err != nil {
		return fmt.Errorf("error getting Elasticsearch info => %v", err)
	}
	defer res.Body.Close()

	// Check if the response from Elasticsearch contains an error
	if res.IsError() {
		return fmt.Errorf("error connecting to Elasticsearch => %s", res.String())
	}

	return nil
}

// Getter
func GetElasticClient() *elasticsearch.Client {
	return esClient
}
