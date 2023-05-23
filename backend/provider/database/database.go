package db

import (
  "context"
  "database/sql"
  "fmt"

  _ "github.com/lib/pq"
)

type Providers struct {
  db *sql.DB
  q *providers.Queries
}

func NewProviders(url string) (*Providers, error) {
  db, err := sql.Open("postgres", url)
  if err != nil {
    return nil, err
  }

  if _, err := db.Exec(providers.Schema); err != nil {
    return nil, fmt.Errorf("executing schema: %w", err)
  }

  return &Providers{
    db: db,
    q: providers.New(db)
  }, nil
}

