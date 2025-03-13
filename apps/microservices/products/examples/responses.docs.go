package examples

// @Description Just an example.
type Success_GET0 struct {
	Code    int         `json:"code" example:"200" description:"HTTP status code"`                                             // HTTP status code
	Success bool        `json:"success" example:"true" description:"Operation success"`                                        // Operation success
	Message string      `json:"message" example:"products retrieved successfully" description:"Message describing the result"` // Message describing the result
	Data    interface{} `json:"data,omitempty" description:"Payload containing the response data (can be nil)"`                // Response data (can be nil)
}

// @Description Just an example.
type Success_POST0 struct {
	Code    int         `json:"code" example:"200" description:"HTTP status code"`                                          // HTTP status code
	Success bool        `json:"success" example:"true" description:"Operation success"`                                     // Operation success
	Message string      `json:"message" example:"product created successfully" description:"Message describing the result"` // Message describing the result
	Data    interface{} `json:"data,omitempty" description:"Payload containing the response data (can be nil)"`             // Response data (can be nil)
}

// @Description Just an example.
type Success_GET1 struct {
	Code    int         `json:"code" example:"200" description:"HTTP status code"`                                                            // HTTP status code
	Success bool        `json:"success" example:"true" description:"Operation success"`                                                       // Operation success
	Message string      `json:"message" example:"successfully retrieved the lowest available ID" description:"Message describing the result"` // Message describing the result
	Data    interface{} `json:"data,omitempty" description:"Payload containing the response data (can be nil)"`                               // Response data (can be nil)
}

// @Description Just an example.
type Success_PUT0 struct {
	Code    int         `json:"code" example:"200" description:"HTTP status code"`                                          // HTTP status code
	Success bool        `json:"success" example:"true" description:"Operation success"`                                     // Operation success
	Message string      `json:"message" example:"product updated successfully" description:"Message describing the result"` // Message describing the result
	Data    interface{} `json:"data,omitempty" description:"Payload containing the response data (can be nil)"`             // Response data (can be nil)
}

// @Description Just an example.
type Success_DEL0 struct {
	Code    int         `json:"code" example:"200" description:"HTTP status code"`                                          // HTTP status code
	Success bool        `json:"success" example:"true" description:"Operation success"`                                     // Operation success
	Message string      `json:"message" example:"product deleted successfully" description:"Message describing the result"` // Message describing the result
	Data    interface{} `json:"data,omitempty" description:"Payload containing the response data (can be nil)"`             // Response data (can be nil)
}
