-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema projeto-native-games
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema projeto-native-games
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projeto-native-games` DEFAULT CHARACTER SET utf8 ;
USE `projeto-native-games` ;

-- -----------------------------------------------------
-- Table `projeto-native-games`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto-native-games`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(200) NOT NULL,
  `pass` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique-email` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `projeto-native-games`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto-native-games`.`games` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `notes` VARCHAR(1000) NULL DEFAULT NULL,
  `start` DATE NULL DEFAULT NULL,
  `finish` DATE NULL DEFAULT NULL,
  `platinum` DATE NULL DEFAULT NULL,
  `status` ENUM('Jogando', 'Zerado', 'Platinado') NULL DEFAULT NULL,
  `saved` TINYINT NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_games_users_idx` (`users_id` ASC),
  CONSTRAINT `fk_games_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `projeto-native-games`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `projeto-native-games`.`series`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto-native-games`.`series` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `notes` VARCHAR(1000) NULL DEFAULT NULL,
  `start` DATE NULL DEFAULT NULL,
  `finish` DATE NULL DEFAULT NULL,
  `last_ep` VARCHAR(50) NULL DEFAULT NULL,
  `status` ENUM('Assistindo', 'Finalizado', 'Assistir mais tarde') NULL DEFAULT NULL,
  `saved` TINYINT NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_series_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_series_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `projeto-native-games`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `projeto-native-games`.`session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto-native-games`.`session` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NOT NULL,
  `token` VARCHAR(1000) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `session_token_key` USING HASH (`token`),
  INDEX `userId` (`userId` ASC),
  CONSTRAINT `session_userId_fkey`
    FOREIGN KEY (`userId`)
    REFERENCES `projeto-native-games`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
