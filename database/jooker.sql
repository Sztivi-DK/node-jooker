-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 09, 2026 at 08:59 AM
-- Server version: 8.0.44
-- PHP Version: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jooker`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `message`, `created_at`, `active`) VALUES
(1, 'Teszt Elek', 'tesztelek@mail.com', 'Ez egy teszt kapcsolatfelvétel.', '2026-09-06 02:00:36', 1),
(2, 'Jóska Pista', 'joskapista@mail.com', 'Ez egy teszt üzenet. Célja, hogy világosan látszódjon, megkaptad ezt.', '2026-09-09 04:56:15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `references`
--

CREATE TABLE `references` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `short_description` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `detailed_description` text COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `location` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `service_id` int UNSIGNED NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `deactivated_by_service` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `references`
--

INSERT INTO `references` (`id`, `title`, `short_description`, `detailed_description`, `image`, `date`, `location`, `service_id`, `active`, `deactivated_by_service`) VALUES
(1, 'Teszt referencia', 'Ez egy teszt referencia rövid leírása.', 'Ez a referencia az adatbázisos működés tesztelésére szolgál.', '', '2026-09-04', 'Nagykáta', 1, 1, 0),
(2, 'Második teszt referencia', 'Második teszt referenciának elkészítése', 'Második teszt referenciának elkészítése  sajtos, tejfölös tésztával, nádi hegedűvel.', '', '2026-09-08', 'Tés', 1, 1, 0),
(3, 'API teszt referencia', 'PUT-tal módosított referencia.', 'Ezzel teszteljük a PUT /api/references/:id végpont működését.', '', '2026-09-09', 'Debrecen', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `short_description` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `detailed_description` text COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `short_description`, `detailed_description`, `image`, `active`) VALUES
(1, 'Teszt szolgáltatás', 'Ez egy teszt szolgáltatás. +', 'Ez a szolgáltatás az adatbázis-kapcsolat tesztelésére szolgál.', NULL, 1),
(2, 'Második teszt szolgáltatás', 'Ez egy új teszt szolgáltatás. + mód2', 'Ez a szolgáltatás az admin létrehozási funkció tesztelésére készült.', NULL, 1),
(3, 'Harmadik teszt szolgáltatás', 'Ez a harmadik teszt szolgáltatás.', 'Ez a harmadik teszt szolgáltatás a validálást teszteli.', NULL, 1),
(4, 'API teszt szolgáltatás', 'Ez egy API-n keresztül létrehozott szolgáltatás.', 'Ezzel teszteljük a POST /api/services végpont működését.', NULL, 1),
(5, 'API2 teszt szolgáltatás', 'Ez a szolgáltatás PUT kéréssel módosítva lett.', 'Ezzel teszteljük a PUT /api/services/:id végpont működését.', NULL, 0),
(6, 'API védett teszt szolgáltatás', 'Ez egy JWT-vel létrehozott teszt szolgáltatás.', 'Ezzel ellenőrizzük, hogy érvényes tokennel működik-e a védett POST API végpont.', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'admin1', 'info@jookerteam.hu', '$2b$10$snAYoHDT5Q4SAfwUjw.RUeDqn91eTrI5c9jQdK20bdR4h3oDuffoS', '2026-09-06 13:14:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `references`
--
ALTER TABLE `references`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_references_service` (`service_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD UNIQUE KEY `unique_username` (`username`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `references`
--
ALTER TABLE `references`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `references`
--
ALTER TABLE `references`
  ADD CONSTRAINT `fk_references_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
