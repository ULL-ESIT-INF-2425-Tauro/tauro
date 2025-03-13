package examples

// @Description Just an example.
type InternalServerError_Generic struct {
	Code    int    `json:"code" example:"500" description:"HTTP status code indicating the type of error"`     // HTTP status code
	Success bool   `json:"success" example:"false" description:"Operation success"`                            // Operation success
	Message string `json:"message" example:"Internal Server Error" description:"Message describing the error"` // Message describing the error
	Detail  string `json:"detail,omitempty" example:"some error details" description:"Details of the error"`   // Specific details (optional)
}

// @Description Just an example.
type ValidationError_Generic struct {
	Code    int           `json:"code" example:"400" description:"HTTP status code indicating the type of error"`   // HTTP status code
	Success bool          `json:"success" example:"false" description:"Operation success"`                          // Operation success
	Message string        `json:"message" example:"Bad Request" description:"Message describing the result"`        // Message describing the result
	Detail  string        `json:"detail,omitempty" example:"some error details" description:"Details of the error"` // Specific details (optional)
	Context Context_POST0 `json:"context,omitempty" description:"Additional context about the error"`               // Contextual info about the error (optional)
}

// @Description Just an example.
type FieldErrors_POST0 struct {
	Body string `json:"body" example:"json: unknown field \"idd\""`
}

// @Description Just an example.
type Context_POST0 struct {
	FieldErrors FieldErrors_POST0 `json:"fieldErrors"`
}

// @Description Just an example.
type NotFoundError_Generic struct {
	Code    int    `json:"code" example:"404" description:"HTTP status code indicating the type of error"`            // HTTP status code
	Success bool   `json:"success" example:"false" description:"Operation success"`                                   // Operation success
	Message string `json:"message" example:"Resource Not Found" description:"Message describing the result"`          // Message describing the result
	Detail  string `json:"detail,omitempty" example:"product with id 1 not found" description:"Details of the error"` // Specific details (optional)                    // Contextual info about the error (optional)
}

// @Description Just an example.
type ValidationError_DEL0 struct {
	Code    int          `json:"code" example:"400" description:"HTTP status code indicating the type of error"`         // HTTP status code
	Success bool         `json:"success" example:"false" description:"Operation success"`                                // Operation success
	Message string       `json:"message" example:"Bad Request" description:"Message describing the result"`              // Message describing the result
	Detail  string       `json:"detail,omitempty" example:"invalid parameter format" description:"Details of the error"` // Specific details (optional)
	Context Context_DEL0 `json:"context,omitempty" description:"Additional context about the error"`                     // Contextual info about the error (optional)
}

// @Description Just an example.
type FieldErrors_DEL0 struct {
	Params string `json:"params" example:"expected an integer but received: \"2d\""`
}

// @Description Just an example.
type Context_DEL0 struct {
	FieldErrors FieldErrors_DEL0 `json:"fieldErrors"`
}

// @Description Just an example.
type ValidationError_GET2 struct {
	Code    int    `json:"code" example:"400" description:"HTTP status code indicating the type of error"`             // HTTP status code
	Success bool   `json:"success" example:"false" description:"Operation success"`                                    // Operation success
	Message string `json:"message" example:"Bad Request" description:"Message describing the result"`                  // Message describing the result
	Detail  string `json:"detail,omitempty" example:"invalid query parameter: idd" description:"Details of the error"` // Specific details (optional)                    // Contextual info about the error (optional)
}

// @Description Just an example.
type NotFoundError_GET2 struct {
	Code    int    `json:"code" example:"404" description:"HTTP status code indicating the type of error"`                                  // HTTP status code
	Success bool   `json:"success" example:"false" description:"Operation success"`                                                         // Operation success
	Message string `json:"message" example:"Resource Not Found" description:"Message describing the result"`                                // Message describing the result
	Detail  string `json:"detail,omitempty" example:"no products found matching the parameters: id=100" description:"Details of the error"` // Specific details (optional)                    // Contextual info about the error (optional)
}
