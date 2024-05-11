-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema projeto-native-games
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema projeto-native-games
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projeto-native-games` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema projeto-native-games
-- -----------------------------------------------------
USE `projeto-native-games` ;

-- -----------------------------------------------------
-- Table `projeto-native-games`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto-native-games`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(200) NOT NULL,
  `pass` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto-native-games`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto-native-games`.`games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `image` TEXT NULL,
  `notes` VARCHAR(1000) NULL,
  `start` DATETIME NULL,
  `finish` DATETIME NULL,
  `platinum` DATETIME NULL,
  `status` ENUM('Jogando', 'Zerado', 'Platinado') NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_games_users_idx` (`users_id` ASC),
  CONSTRAINT `fk_games_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `projeto-native-games`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projeto-native-games`.`series`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto-native-games`.`series` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `image` TEXT NULL,
  `notes` VARCHAR(1000) NULL,
  `start` DATETIME NULL,
  `finish` DATETIME NULL,
  `last_ep` VARCHAR(50) NULL,
  `status` ENUM('Assistindo', 'Finalizado', 'Assistir mais tarde') NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_series_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_series_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `projeto-native-games`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
