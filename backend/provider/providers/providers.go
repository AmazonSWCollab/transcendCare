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
	Title    string   `json:"title"`
	Address  string   `json:"address"`
	ID       int      `json:"id"`
	Location []string `json:"location"`
}

// Returned if a provider is not found
var ErrProviderNotFound = fmt.Errorf("Provider not found")

// ProviderStore is an interface for a provider store
type ProviderStore interface {
	// GetProvider returns a provider by id
	Provider(id int) (*Provider, error)
	// GetProviders returns all providers
	Providers() ([]*Provider, error)
	// CreateProvider creates a new provider
	CreateProvider(p *Provider) error
	// UpdateProvider updates an existing provider
	UpdateProvider(p *Provider) error
	// DeleteProvider deletes a provider by id
	DeleteProvider(id int) error
}
