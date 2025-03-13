package errors

// Creates a new ValidationError with specific field errors
func NewValidationError(detail string, fieldErrors map[string]string) *BaseErrorResponse {
	return &BaseErrorResponse{
		Code:    400,
		Success: false,
		Message: "Validation Error",
		Detail:  detail,
		Context: map[string]interface{}{
			"fieldErrors": fieldErrors,
		},
	}
}

// Creates a new NotFoundError for a specific resource
func NewNotFoundError(detail string) *BaseErrorResponse {
	return &BaseErrorResponse{
		Code:    404,
		Success: false,
		Message: "Resource Not Found",
		Detail:  detail,
	}
}

// Creates a new InternalServerError with a detailed message
func NewInternalServerError(detail string) *BaseErrorResponse {
	return &BaseErrorResponse{
		Code:    500,
		Success: false,
		Message: "Internal Server Error",
		Detail:  detail,
	}
}

// Creates a new BadRequestError with a detailed message
func NewBadRequest(detail string) *BaseErrorResponse {
	return &BaseErrorResponse{
		Code:    400,
		Success: false,
		Message: "Bad Request",
		Detail:  detail,
	}
}

// Creates a new CORSError for unauthorized origins
func NewCORSError(detail string, origin string) *BaseErrorResponse {
	return &BaseErrorResponse{
		Code:    403,
		Success: false,
		Message: "CORS error",
		Detail:  detail,
		Context: map[string]interface{}{
			"origin": origin,
		},
	}
}
