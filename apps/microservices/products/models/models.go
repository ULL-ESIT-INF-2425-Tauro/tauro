package models

import (
	"time"
)

// Product representation
// @Description Full product structure combining base fields and metadata.
// @Tags Product Models
type Product struct {
	ID        int       `json:"id" bson:"id" example:"245" format:"int32" description:"Unique identifier for the product"`
	Name      string    `json:"name" bson:"name" example:"Caballas" description:"Name of the product"`
	Category  string    `json:"category" bson:"category" example:"Pescados" description:"Category of the product"`
	Price     float32   `json:"price" bson:"price" example:"2.2" format:"float" description:"Base price of the product"`
	PVP       float32   `json:"pvp" bson:"pvp" example:"3.25" format:"float" description:"Retail price of the product"`
	IGIC      *float32  `json:"igic,omitempty" bson:"igic,omitempty" example:"3" format:"float" description:"Applicable tax percentage for the product"`
	Available *bool     `json:"available,omitempty" bson:"available,omitempty" example:"true" description:"Availability status of the product"`
	KG        *float32  `json:"kg,omitempty" bson:"kg,omitempty" example:"2.5" format:"float" description:"Weight of the product in kilograms (if applicable)"`
	Units     *float32  `json:"units,omitempty" bson:"units,omitempty" example:"1.19" format:"float" description:"Price per unit of the product (if applicable)"`
	CreatedAt time.Time `json:"created_at" bson:"created_at" example:"2024-12-11T15:04:05Z" format:"date-time" description:"Timestamp when the product was created"`
	UpdatedAt time.Time `json:"updated_at" bson:"updated_at" example:"2024-12-12T10:00:00Z" format:"date-time" description:"Timestamp when the product was last updated"`
}

// Request structure for creating or updating a product
// @Description Payload for creating or updating product data.
// @Tags Product Request
type ProductRequest struct {
	ID        int      `json:"id" bson:"id" example:"245" format:"int32" description:"Unique identifier for the product"`
	Name      string   `json:"name" bson:"name" example:"Caballas" description:"Name of the product"`
	Category  string   `json:"category" bson:"category" example:"Pescados" description:"Category of the product"`
	Price     float32  `json:"price" bson:"price" example:"2.2" format:"float" description:"Base price of the product"`
	PVP       float32  `json:"pvp" bson:"pvp" example:"3.25" format:"float" description:"Retail price of the product"`
	IGIC      *float32 `json:"igic,omitempty" bson:"igic,omitempty" example:"3" format:"float" description:"Applicable tax percentage for the product"`
	Available *bool    `json:"available,omitempty" bson:"available,omitempty" example:"true" description:"Availability status of the product"`
	KG        *float32 `json:"kg,omitempty" bson:"kg,omitempty" example:"2.5" format:"float" description:"Weight of the product in kilograms (if applicable)"`
	Units     *float32 `json:"units,omitempty" bson:"units,omitempty" example:"1.19" format:"float" description:"Price per unit of the product (if applicable)"`
}

// Response structure returned to clients
// @Description Response structure containing product details.
// @Tags Product Response
type ProductResponse struct {
	ID        int       `json:"id" bson:"id" example:"245" format:"int32" description:"Unique identifier for the product"`
	Name      string    `json:"name" bson:"name" example:"Caballas" description:"Name of the product"`
	Category  string    `json:"category" bson:"category" example:"Pescados" description:"Category of the product"`
	Price     float32   `json:"price" bson:"price" example:"2.2" format:"float" description:"Base price of the product"`
	PVP       float32   `json:"pvp" bson:"pvp" example:"3.25" format:"float" description:"Retail price of the product"`
	IGIC      *float32  `json:"igic,omitempty" bson:"igic,omitempty" example:"3" format:"float" description:"Applicable tax percentage for the product"`
	Available *bool     `json:"available,omitempty" bson:"available,omitempty" example:"true" description:"Availability status of the product"`
	KG        *float32  `json:"kg,omitempty" bson:"kg,omitempty" example:"2.5" format:"float" description:"Weight of the product in kilograms (if applicable)"`
	Units     *float32  `json:"units,omitempty" bson:"units,omitempty" example:"1.19" format:"float" description:"Price per unit of the product (if applicable)"`
	CreatedAt time.Time `json:"created_at" bson:"created_at" example:"2024-12-11T15:04:05Z" format:"date-time" description:"Timestamp when the product was created"`
	UpdatedAt time.Time `json:"updated_at" bson:"updated_at" example:"2024-12-12T10:00:00Z" format:"date-time" description:"Timestamp when the product was last updated"`
}

type ProductMetadata struct {
	CreatedAt time.Time `json:"created_at" bson:"created_at" example:"2024-12-11T15:04:05Z" format:"date-time" description:"Timestamp when the product was created"`
	UpdatedAt time.Time `json:"updated_at" bson:"updated_at" example:"2024-12-12T10:00:00Z" format:"date-time" description:"Timestamp when the product was last updated"`
}
