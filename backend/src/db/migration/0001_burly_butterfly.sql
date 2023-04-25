ALTER TABLE "cities" ALTER COLUMN "name" SET DATA TYPE varchar(256);
CREATE INDEX IF NOT EXISTS "name_idx" ON "cities" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "cities" ("name");