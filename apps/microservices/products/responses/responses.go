package responses

// Common structure for all success responses
// @Description Base model used for all API success responses.
// @Tag Success Responses
type SuccessResponse struct {
	Code    int         `json:"code" example:"200" description:"HTTP status code"`                                              // HTTP status code
	Success bool        `json:"success" example:"true" description:"Operation success"`                                         // Operation success
	Message string      `json:"message" example:"Operation completed successfully" description:"Message describing the result"` // Message describing the result
	Data    interface{} `json:"data,omitempty" description:"Payload containing the response data (can be nil)"`                 // Response data (can be nil)
}
