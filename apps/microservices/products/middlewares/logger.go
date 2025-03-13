package middlewares

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
)

// Logger middleware
// Logs the details of each request, including the method, path, query string (if present), execution time, and response status
func Logger(c *fiber.Ctx) error {
	start := time.Now()

	// Call the next middleware or handler
	err := c.Next()

	// If there is a query string, include it in the log
	queryString := c.Request().URI().QueryString()
	if len(queryString) > 0 {
		log.Printf(
			"[%s] %s?%s took %v, Status: %d",
			c.Method(),
			c.Path(),
			queryString,
			time.Since(start),
			c.Response().StatusCode(),
		)
	} else {
		// If there is no query string, omit the "?" from the log
		log.Printf(
			"[%s] %s took %v, Status: %d",
			c.Method(),
			c.Path(),
			time.Since(start),
			c.Response().StatusCode(),
		)
	}

	return err
}
