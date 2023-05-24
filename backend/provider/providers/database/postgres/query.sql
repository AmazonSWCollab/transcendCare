-- name: GetProviders :many
SELECT * FROM providers
ORDER BY title;

-- name: CreateProvider :exec
INSERT INTO providers (
  title, address, longitude, latitude
) VALUES (
  $1, $2, $3, $4
);

