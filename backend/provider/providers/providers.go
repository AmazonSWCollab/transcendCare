package providers

import (
	"fmt"
)

// Address represents a physical (US) address
type Address struct {
	Street  string `json:"street"`
	City    string `json:"city"`
	State   string `json:"state"`
	Zipcode string `json:"zipcode"`
}

// Provider represents a provider of gender-affirming care
type Provider struct {
	Title    string    `json:"title"`
	Address  string    `json:"address"`
	ID       int32     `json:"id"`
	Location []float64 `json:"location"`
}

// Returned if a provider is not found
var ErrProviderNotFound = fmt.Errorf("Provider not found")

// TODO: Implement rest of CRUD operations/queries
// ProviderStore is an interface for a provider store
type ProviderStore interface {
	// // GetProvider returns a provider by id
	// Provider(id int) (*Provider, error)

	// GetProviders returns all providers
	Providers() ([]Provider, error)
	// // NewProvider creates a new provider
	NewProvider(p *Provider) error
	// // UpdateProvider updates an existing provider
	// UpdateProvider(p *Provider) error
	// // DeleteProvider deletes a provider by id
	// DeleteProvider(id int) error
}
