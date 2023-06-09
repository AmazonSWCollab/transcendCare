// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2
// source: query.sql

package postgres

import (
	"context"
)

const createProvider = `-- name: CreateProvider :exec
INSERT INTO providers (
  title, address, longitude, latitude
) VALUES (
  $1, $2, $3, $4
)
`

type CreateProviderParams struct {
	Title     string
	Address   string
	Longitude float64
	Latitude  float64
}

func (q *Queries) CreateProvider(ctx context.Context, arg CreateProviderParams) error {
	_, err := q.db.ExecContext(ctx, createProvider,
		arg.Title,
		arg.Address,
		arg.Longitude,
		arg.Latitude,
	)
	return err
}

const getProviders = `-- name: GetProviders :many
SELECT id, title, address, longitude, latitude FROM providers
ORDER BY title
`

func (q *Queries) GetProviders(ctx context.Context) ([]Provider, error) {
	rows, err := q.db.QueryContext(ctx, getProviders)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Provider
	for rows.Next() {
		var i Provider
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.Address,
			&i.Longitude,
			&i.Latitude,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
