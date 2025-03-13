# Binary name
APP_NAME=ms-tauro-products

# Directories
SRC_DIR=.
BUILD_DIR=bin

# Environment variables
GO_ENV=development

# Build flags
BUILD_FLAGS=-ldflags "-s -w"

.PHONY: all air build run test lint fmt clean help

# Default help
all: help

## air: Start Air for automatic reload
air:
	@echo "Starting Air..."
	@air

## build: Compile the binary
build:
	@echo "Compiling the project..."
	@mkdir -p $(BUILD_DIR)
	go build $(BUILD_FLAGS) -o $(BUILD_DIR)/$(APP_NAME) $(SRC_DIR)

## run: Run the application (without Air)
run:
	@echo "Running the application..."
	GO_ENV=$(GO_ENV) go run $(SRC_DIR)/main.go

## test: Run tests
test:
	@echo "Running tests..."
	go test ./...

## doc: Generate documentation
doc:
	@echo "Generating documentation..."
	swag init && air

## linter: Run linters
linter:
	@echo "Analyzing code with linters..."
	golangci-lint run

## format: Format the code
format:
	@echo "Formatting the code..."
	@gofmt -w .
	@goimports -w .

## clean: Clean up binaries and generated files
clean:
	@echo "Cleaning up generated files..."
	rm -rf $(BUILD_DIR)

## help: Display this help
help:
	@echo "Available commands:"
	@sed -n 's/^## //p' $(MAKEFILE_LIST) | while read -r line; do \
		target=$$(echo $$line | awk -F': ' '{print $$1}'); \
		description=$$(echo $$line | awk -F': ' '{print $$2}'); \
		printf "  \033[36m%-15s\033[0m %s\n" "$$target" "$$description"; \
	done