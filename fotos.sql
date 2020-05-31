-- --------------------------------------------------------
-- Värd:                         eu-cdbr-west-03.cleardb.net
-- Serverversion:                5.6.47-log - MySQL Community Server (GPL)
-- Server-OS:                    Linux
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumpar struktur för tabell heroku_fc38e3d01c327ce.albums
DROP TABLE IF EXISTS `albums`;
CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- Dumpar data för tabell heroku_fc38e3d01c327ce.albums: ~8 rows (ungefär)
DELETE FROM `albums`;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` (`id`, `title`) VALUES
	(2, 'Andalucian dreams'),
	(3, 'My travels with Peter'),
	(6, 'My turtles pics'),
	(7, 'Easy living at Medieinstitutet'),
	(8, 'Icecream dreams'),
	(10, 'In the jungle'),
	(11, 'My silly pics at MacDOndalds'),
	(12, 'Vacations with the Maharaha of Persia');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;

-- Dumpar struktur för tabell heroku_fc38e3d01c327ce.albums_fotos
DROP TABLE IF EXISTS `albums_fotos`;
CREATE TABLE IF NOT EXISTS `albums_fotos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `foto_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;

-- Dumpar data för tabell heroku_fc38e3d01c327ce.albums_fotos: ~28 rows (ungefär)
DELETE FROM `albums_fotos`;
/*!40000 ALTER TABLE `albums_fotos` DISABLE KEYS */;
INSERT INTO `albums_fotos` (`id`, `album_id`, `foto_id`) VALUES
	(3, 2, 3),
	(9, 6, 9),
	(11, 6, 4),
	(12, 6, 1),
	(14, 8, 12),
	(16, 10, 4),
	(18, 10, 3),
	(19, 10, 11),
	(20, 2, 15),
	(21, 2, 14),
	(22, 3, 14),
	(24, 2, 12),
	(25, 3, 12),
	(26, 2, 13),
	(27, 2, 9),
	(31, 2, 4),
	(36, 2, 12),
	(37, 2, 15),
	(40, 3, 9),
	(41, 3, 11),
	(46, 3, 17),
	(48, 3, 18),
	(51, 3, 19),
	(63, 3, 20),
	(72, 3, 22),
	(81, 3, 20),
	(91, 3, 19),
	(101, 3, 20),
	(111, 3, 4),
	(121, 3, 4),
	(131, 3, 20),
	(141, 3, 4),
	(151, 3, 19);
/*!40000 ALTER TABLE `albums_fotos` ENABLE KEYS */;

-- Dumpar struktur för tabell heroku_fc38e3d01c327ce.albums_users
DROP TABLE IF EXISTS `albums_users`;
CREATE TABLE IF NOT EXISTS `albums_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- Dumpar data för tabell heroku_fc38e3d01c327ce.albums_users: ~13 rows (ungefär)
DELETE FROM `albums_users`;
/*!40000 ALTER TABLE `albums_users` DISABLE KEYS */;
INSERT INTO `albums_users` (`id`, `user_id`, `album_id`) VALUES
	(1, 1, 1),
	(2, 2, 2),
	(3, 1, 3),
	(4, 1, 4),
	(5, 1, 5),
	(6, 1, 6),
	(7, 1, 7),
	(8, 2, 8),
	(9, 1, 9),
	(10, 1, 10),
	(11, 1, 11),
	(16, 1, 12),
	(21, 1, 21);
/*!40000 ALTER TABLE `albums_users` ENABLE KEYS */;

-- Dumpar struktur för tabell heroku_fc38e3d01c327ce.fotos
DROP TABLE IF EXISTS `fotos`;
CREATE TABLE IF NOT EXISTS `fotos` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- Dumpar data för tabell heroku_fc38e3d01c327ce.fotos: ~15 rows (ungefär)
DELETE FROM `fotos`;
/*!40000 ALTER TABLE `fotos` DISABLE KEYS */;
INSERT INTO `fotos` (`id`, `title`, `url`, `comment`) VALUES
	(1, 'Eating hamburger', 'www.hamburagrestallet.com', 'always with ketchup'),
	(3, 'Some fine pic', 'https://www.bing.com/images/search?view=detailV2&ccid=MzHT25o4&id=33DC39D437CDF1410330EEBCA8CEF8E206F70F03&thid=OIP.MzHT25o4r8DDg0IpOlxj6wHaEy&mediaurl=https%3a%2f%2fblog.goway.com%2fglobetrotting%2fwp-content%2fuploads%2f2016%2f08%2fScenic-summer-evening', NULL),
	(4, 'Lousy life at Paddys', 'www.paddysbeert.com', 'always lightbeer'),
	(9, 'My turtle sleeping', 'trutling.se', 'go home to your turtle'),
	(11, 'My turtle hehehe', 'trutling.pop', 'turtle'),
	(12, 'Eating ice cream', 'www.gelatto.mongo', 'cold and sweet'),
	(13, 'Fishing in Denver', 'LAS Vegas sucks', NULL),
	(14, 'Eating hamburger', 'www.hamburagrestallet.com', 'always with ketchup'),
	(15, 'Granada girl dancing flamenco in the street', 'www.dancingnice', 'such nice dance'),
	(17, 'Loolapalooza by night', 'loola.com', NULL),
	(18, 'Loolapalooza by day', 'loola.com', NULL),
	(19, 'Loolapalooza by midday', 'loola.com', NULL),
	(20, 'Kyoto delicatess', 'kyoto.com', NULL),
	(22, 'Maharaha breakfast', 'arabian.com', NULL),
	(31, 'Always traveling', 'travels.se', 'IS there any filght to Lolapalloza?');
/*!40000 ALTER TABLE `fotos` ENABLE KEYS */;

-- Dumpar struktur för tabell heroku_fc38e3d01c327ce.fotos_users
DROP TABLE IF EXISTS `fotos_users`;
CREATE TABLE IF NOT EXISTS `fotos_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foto_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

-- Dumpar data för tabell heroku_fc38e3d01c327ce.fotos_users: ~24 rows (ungefär)
DELETE FROM `fotos_users`;
/*!40000 ALTER TABLE `fotos_users` DISABLE KEYS */;
INSERT INTO `fotos_users` (`id`, `foto_id`, `user_id`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(3, 3, 2),
	(4, 4, 1),
	(5, 5, 1),
	(6, 6, 1),
	(7, 7, 1),
	(8, 8, 1),
	(9, 9, 1),
	(10, 10, 1),
	(11, 11, 1),
	(14, 12, 2),
	(16, 13, 1),
	(22, 15, 2),
	(24, 14, 2),
	(27, 12, 2),
	(28, 16, 1),
	(29, 17, 1),
	(30, 18, 1),
	(31, 19, 1),
	(32, 20, 1),
	(33, 21, 1),
	(34, 22, 1),
	(41, 31, 1);
/*!40000 ALTER TABLE `fotos_users` ENABLE KEYS */;

-- Dumpar struktur för tabell heroku_fc38e3d01c327ce.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Dumpar data för tabell heroku_fc38e3d01c327ce.users: ~3 rows (ungefär)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
	(1, 'Gustavo', '$2b$10$J.cBZWBjv2cKFm5cvzIQCuLzLLF.Dck3ES4Bb66OwE7XynlpKGwRu', 'Gustavo', 'Catala'),
	(2, 'Johan', '$2b$10$J.cBZWBjv2cKFm5cvzIQCuLzLLF.Dck3ES4Bb66OwE7XynlpKGwRu', 'Johan', 'Nordström'),
	(11, 'ggsy@38', '$2b$10$vu4TqAo4fGmtw9bdg4QmS.FggMWWcqtNNgum1HWHuHASedt1/enya', 'Peter', 'Karlosn');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
