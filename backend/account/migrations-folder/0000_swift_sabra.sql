CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`preferred_name` text,
	`role` text DEFAULT ('user') NOT NULL,
	`city_name` text,
	`identity` text,
	`pronouns` text
);

CREATE TABLE `admins` (
	`id` integer PRIMARY KEY NOT NULL,
	`account_id` integer NOT NULL,
	`password` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`)
);

CREATE TABLE `providers` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip` text NOT NULL,
	`longitude` text NOT NULL,
	`latitude` text NOT NULL,
	`website` text NOT NULL,
	`category` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);

CREATE INDEX `user_id` ON `accounts` (`user_id`);
CREATE INDEX `name` ON `providers` (`name`);
CREATE INDEX `email` ON `providers` (`email`);
CREATE INDEX `phone` ON `providers` (`phone`);
CREATE INDEX `website` ON `providers` (`website`);