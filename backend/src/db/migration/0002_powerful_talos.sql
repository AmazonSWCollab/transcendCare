DO $$ BEGIN
 CREATE TYPE "identity" AS ENUM('non-binary', 'female', 'male', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "pronouns" AS ENUM('they/them/theirs', 'she/her/hers', 'he/him/his', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "cities" ALTER COLUMN "name" SET DATA TYPE varchar(256);
ALTER TABLE "users" ALTER COLUMN "full_name" SET DATA TYPE varchar(256);
ALTER TABLE "users" ALTER COLUMN "phone" SET DATA TYPE varchar(10);
ALTER TABLE "users" ADD COLUMN "last_name" varchar(256) NOT NULL;
ALTER TABLE "users" ADD COLUMN "preferred_name" varchar(256);
ALTER TABLE "users" ADD COLUMN "date_of_birth" date;
ALTER TABLE "users" ADD COLUMN "identity" "identity" DEFAULT 'other';
ALTER TABLE "users" ADD COLUMN "pronouns" "pronouns" DEFAULT 'custom';
CREATE INDEX IF NOT EXISTS "name_idx" ON "cities" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "cities" ("name");