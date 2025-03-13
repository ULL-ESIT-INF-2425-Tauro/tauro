package responses

// Creates a new SuccessResponse for successful API operations
func NewSuccessResponse(code int, message string, data interface{}) SuccessResponse {
	return SuccessResponse{
		Code:    code,
		Success: true,
		Message: message,
		Data:    data,
	}
}
