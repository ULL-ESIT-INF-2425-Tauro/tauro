package configs

import (
	"os"
)

type Config struct {
	MongoURI        string
	DBName          string
	Port            string
	ElasticUser     string
	ElasticPassword string
	ElasticAddress  string
	AllowedOrigins  string
	CaCertPath      string
}

func LoadConfig() *Config {
	return &Config{
		MongoURI:        os.Getenv("MONGO_URI"),
		DBName:          os.Getenv("DB_NAME"),
		Port:            os.Getenv("PORT"),
		ElasticUser:     os.Getenv("ELASTIC_USER"),
		ElasticPassword: os.Getenv("ELASTIC_PASSWORD"),
		ElasticAddress:  os.Getenv("ELASTIC_ADDRESS"),
		AllowedOrigins:  os.Getenv("ALLOWED_ORIGINS"),
		CaCertPath:      os.Getenv("CA_CERT_PATH"),
	}
}
