package errors

// Common structure for all error responses
// @Description Base error model used for all API errors.
// @Tag Errors
type BaseErrorResponse struct {
	Code    int                    `json:"code" example:"400" description:"HTTP status code indicating the type of error"`     // HTTP status code
	Success bool                   `json:"success" example:"false" description:"Operation success"`                            // Operation success
	Message string                 `json:"message" example:"Bad Request" description:"Message describing the result"`          // Message describing the result
	Detail  string                 `json:"detail,omitempty" example:"Invalid product data" description:"Details of the error"` // Specific details (optional)
	Context map[string]interface{} `json:"context,omitempty" description:"Additional context about the error"`                 // Contextual info about the error (optional)
}
