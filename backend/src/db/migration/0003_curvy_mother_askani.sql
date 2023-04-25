ALTER TABLE "users" ALTER COLUMN "identity" SET NOT NULL;
ALTER TABLE "users" ALTER COLUMN "pronouns" SET NOT NULL;
ALTER TABLE "users" ADD COLUMN "other_identity" varchar(128);
ALTER TABLE "users" ADD COLUMN "custom_pronouns" varchar(32);