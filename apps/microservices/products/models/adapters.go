package models

func (productRequest *ProductRequest) AdaptToProductResponse(metadata *ProductMetadata) *ProductResponse {
	productResponse := &ProductResponse{
		ID:        productRequest.ID,
		Name:      productRequest.Name,
		Category:  productRequest.Category,
		Price:     productRequest.Price,
		PVP:       productRequest.PVP,
		IGIC:      productRequest.IGIC,
		Available: productRequest.Available,
		KG:        productRequest.KG,
		Units:     productRequest.Units,
	}

	if !metadata.CreatedAt.IsZero() {
		productResponse.CreatedAt = metadata.CreatedAt
	}

	if !metadata.UpdatedAt.IsZero() {
		productResponse.UpdatedAt = metadata.UpdatedAt
	}

	return productResponse
}

func (productResponse *ProductResponse) AdaptToProductMetadata() *ProductMetadata {
	productMetadata := &ProductMetadata{
		CreatedAt: productResponse.CreatedAt,
		UpdatedAt: productResponse.UpdatedAt,
	}

	return productMetadata
}
