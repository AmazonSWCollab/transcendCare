package database

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/AmazonSWCollab/transcendCare/providers"
	"github.com/AmazonSWCollab/transcendCare/providers/database/postgres"
	_ "github.com/lib/pq"
)

type Postgres struct {
	db *sql.DB
	q  *postgres.Queries
}

var _ providers.ProviderStore = (*Postgres)(nil)

func NewPostgres(url string) (*Postgres, error) {
	db, err := sql.Open("postgres", url)
	if err != nil {
		return nil, err
	}

	if _, err := db.Exec(postgres.Schema); err != nil {
		return nil, fmt.Errorf("executing schema: %w", err)
	}

	return &Postgres{
		db: db,
		q:  postgres.New(db),
	}, nil
}

func (p *Postgres) Providers() ([]providers.Provider, error) {
	providers_, err := p.q.GetProviders(context.TODO())
	if err != nil {
		return nil, postgresError(err)
	}
	var ps []providers.Provider
	for _, provider := range providers_ {
		ps = append(ps, providers.Provider{
			ID:       provider.ID,
			Title:    provider.Title,
			Address:  provider.Address,
			Location: []float64{provider.Longitude, provider.Latitude},
		})
	}

	return ps, nil
}

func postgresError(err error) error {
	if errors.Is(err, sql.ErrNoRows) {
		return providers.ErrProviderNotFound
	}
	return err
}

// func (p *Postgres) Provider(id int) (*providers.Provider, error) {
// 	provider, err := p.q.GetProvider(context.Background(), id)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return &providers.Provider{
// 		ID:       provider.ID,
// 		Title:    provider.Title,
// 		Address:  provider.Address,
// 		Location: []string{provider.Longitude, provider.Latitude},
// 	}, nil
// }
