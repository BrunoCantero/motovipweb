CREATE TABLE `users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`username` varchar(45),
	`password` varchar(45) NOT NULL,
	`email` varchar(45),
	`user_roles_id` INT(11),
	PRIMARY KEY (`id`)
);

CREATE TABLE `user_roles` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`description` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `cadets` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(80) NOT NULL,
	`dni` INT(11) NOT NULL,
	`vehicle_patent` varchar(15),
	`adress` varchar(150),
	`phone_number` varchar(45),
	`description` varchar(100),
	PRIMARY KEY (`id`)
);

CREATE TABLE `orders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`date_time` DATETIME,
	`adress` varchar(120),
	`amount` FLOAT,
	`order_fee_mv` FLOAT,
	`order_fee_cadet` FLOAT,
	`order_description` varchar(180),
	`user_id` INT(11) NOT NULL,
	`cadet_id` INT(11) NOT NULL,
	`customer_id` INT(11) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `customers` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	`adrres` varchar(120) NOT NULL,
	`phone_number` varchar(120) NOT NULL,
	`description` varchar(120) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`user_roles_id`) REFERENCES `user_roles`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk1` FOREIGN KEY (`cadet_id`) REFERENCES `cadets`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk2` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`);

