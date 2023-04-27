CREATE TABLE `cities` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);

CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`full_name` text NOT NULL,
	`last_name` text NOT NULL,
	`preferred_name` text,
	`role` text DEFAULT ('user') NOT NULL,
	`city_id` text,
	`date_of_birth` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`identity` text,
	`other_identity` text,
	`pronouns` text,
	`custom_pronouns` text,
	FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`),
	FOREIGN KEY (`city_id`,`city_id`) REFERENCES `cities`(`id`,`name`)
);

CREATE INDEX `name_idx` ON `cities` (`name`);
CREATE UNIQUE INDEX `unique_idx` ON `cities` (`name`);
CREATE INDEX `user_id` ON `users` (`user_id`);