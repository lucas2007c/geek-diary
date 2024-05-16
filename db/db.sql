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
  PRIMARY KEY (`id`))
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

-- Inserir um usuário
INSERT INTO `users` (`email`, `pass`) VALUES ('user@gmail.com', '123456');

-- Inserir jogos
INSERT INTO `games` (`id`, `name`, `image`, `notes`, `start`, `finish`, `platinum`, `status`, `users_id`) VALUES
(1, 'Batman Arkham knight', 'https://upload.wikimedia.org/wikipedia/pt/5/5d/Batman_Arkham_Knight_Capa.jpg?20140331090505', '', '2024-05-15', NULL, NULL, 'Platinado', 1),
(2, 'God of war 2018', 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/p3pYq0QxntZQREXRVdAzmn1w.png', '', '2024-05-15', NULL, NULL, 'Zerado', 1),
(3, 'Read dead redemption 2', 'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png', '', '2024-05-15', NULL, NULL, 'Jogando', 1),
(4, 'Aragami', 'https://image.api.playstation.com/cdn/UP1578/CUSA06168_00/aZ1WOSfMw9fsv4Y5KbT9ikS1THYP3egi.png', '', '2024-05-16', '2024-05-18', '2024-05-21', 'Platinado', 1),
(5, 'Spider man remaster', 'https://image.api.playstation.com/vulcan/ap/rnd/202009/3021/B2aUYFC0qUAkNnjbTHRyhrg3.png', '', '2024-05-16', '2024-05-30', '2024-06-12', 'Platinado', 1);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
