ALTER TYPE "identity" ADD VALUE 'transgender';
ALTER TABLE "users" ALTER COLUMN "identity" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "identity" DROP NOT NULL;
ALTER TABLE "users" ALTER COLUMN "other_identity" SET DATA TYPE varchar(64);
ALTER TABLE "users" ALTER COLUMN "pronouns" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "pronouns" DROP NOT NULL;
ALTER TABLE "users" DROP COLUMN IF EXISTS "phone";