package database

import (
	"database/sql"
	"fmt"

	"github.com/AmazonSWCollab/transcendCare/database/postgres"
	_ "github.com/lib/pq"
)

type Providers struct {
	db *sql.DB
	q  *postgres.Queries
}

func NewProviders(url string) (*Providers, error) {
	db, err := sql.Open("postgres", url)
	if err != nil {
		return nil, err
	}

	if _, err := db.Exec(postgres.Schema); err != nil {
		return nil, fmt.Errorf("executing schema: %w", err)
	}

	return &Providers{
		db: db,
		q:  postgres.New(db),
	}, nil
}
