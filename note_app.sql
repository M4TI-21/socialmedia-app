-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 26 Mar 2024, 08:37
-- Wersja serwera: 10.4.22-MariaDB
-- Wersja PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `note_app`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `bookmarks`
--

CREATE TABLE `bookmarks` (
  `bookmark_id` int(11) NOT NULL,
  `bm_name` varchar(200) NOT NULL,
  `bm_email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `bookmarks`
--

INSERT INTO `bookmarks` (`bookmark_id`, `bm_name`, `bm_email`) VALUES
(1, 'unsigned', 'mati@koks.com'),
(2, 'Lorem ipsum', 'mati@koks.com');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notes`
--

CREATE TABLE `notes` (
  `note_id` int(11) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `creation_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `favorite` tinyint(1) NOT NULL,
  `color` varchar(200) NOT NULL,
  `bookmark` int(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `notes`
--

INSERT INTO `notes` (`note_id`, `user_email`, `title`, `content`, `creation_date`, `update_date`, `favorite`, `color`, `bookmark`) VALUES
(2, 'mati@koks.com', 'Wycieczka turystyczna Gdańsk-Sopot-Gdynia', 'Organizator: Biuro Turystyczne \"FUN TRAVEL\"\nUl. Piekarska 6a\n64-920 Piła\nwww.Funtravel.pl\nTel.: (067) 214-81-92\nTel.: (067) 214-81-93\n\nCzas trwania wycieczki: 5 dni\n\nTermin wycieczki: 02-04.VII.2020', '2024-03-26 08:15:13', '2024-03-26 08:15:13', 0, '#ff65a3', 1),
(3, 'mati@koks.com', 'Link', 'https://www.google.com/search?sca_esv=6cb148437a7a9a38&q=sigma&uds=AMwkrPt4t1EVCCdSUNw8MsX-M3cqgIHZwaD4xMNEmzeDFnLO3jDY7iDpt58hiAZuy0ibCnkEpHgLxSXnyZ9eHFoOtUpmuptCeN2aVsE0MaJ5znv2HQRbQlTsaXtdK1ft9ESyHAzG5tLbAtHTh-ub6mO_RnAb7voMuts_ffVgUNA9sl9tnjYoIhZcC5qNawxvy81WA9uLOVQQzpM4fPVf-PpFFIQdhwOl121wlMqapxf0Ux1h-uyqHyfn8e7Fty7x_fKY3INnutPjol0uLHDNF8f39OpCrp_0V2aGo-e7PMJeLT6DCaK4XaSPMw-NmglMbQdYSqwns3vu&udm=2&prmd=ivnbz&sa=X&ved=2ahUKEwj5trPwsJGFAxWCSvEDHZbjAwgQtKgLegQIDhAB&biw=1920&bih=953&dpr=1#vhid=MfGA_6kthUacZM&vssid=mosaic', '2024-03-26 08:15:53', '2024-03-26 08:15:53', 1, '#feff9c', 1),
(4, 'mati@koks.com', 'Lorem ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sapien mi, tincidunt id dapibus eget, facilisis quis risus. Curabitur vehicula dui tellus, eget viverra ipsum tristique a. Pellentesque tincidunt congue nisl. Vestibulum non lobortis lacus. Donec pharetra velit in venenatis tempor. Vivamus nisi tellus, ornare at turpis pulvinar, consequat ornare purus. Aliquam aliquam pellentesque cursus. Fusce ultrices, justo eu tincidunt ultricies, ante sem ultrices nisi, id imperdiet dolor tellus non leo.', '2024-03-26 08:16:20', '2024-03-26 08:16:20', 1, '#cdfc93', 2),
(5, 'mati@koks.com', 'Lorem ipsum', 'Lorem ipsum dolor sit amet', '2024-03-26 08:16:42', '2024-03-26 08:16:42', 0, '#e4eeff', 2),
(6, 'mati@koks.com', '123', '456', '2024-03-26 08:16:52', '2024-03-26 08:16:52', 1, '#ff7eb9', 1),
(7, 'mati@koks.com', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ali', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sapien mi, tincidunt id dapibus eget, facilisis quis risus.', '2024-03-26 08:17:23', '2024-03-26 08:17:23', 0, '#fff740', 2),
(8, 'mati@koks.com', '123', '456', '2024-03-26 08:17:37', '2024-03-26 08:17:37', 0, '#cdfc93', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `todo`
--

CREATE TABLE `todo` (
  `todo_id` int(11) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `todo_content` varchar(100) NOT NULL,
  `due_date` varchar(200) DEFAULT NULL,
  `finished` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `todo`
--

INSERT INTO `todo` (`todo_id`, `user_email`, `todo_content`, `due_date`, `finished`) VALUES
(1, 'mati@koks.com', 'Do homework', '2024-03-26 22:00', 0),
(2, 'mati@koks.com', 'Go shopping', '2024-03-27 18:00', 0),
(3, 'mati@koks.com', 'Buy new shoes', NULL, 1),
(5, 'mati@koks.com', 'Study', NULL, 1),
(8, 'mati@koks.com', 'Go on a trip', '2024-05-31 12:00', 0),
(9, 'mati@koks.com', 'Go for a workout', '2012-03-26 12:00', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `tag` varchar(200) NOT NULL,
  `date_of_birth` varchar(200) NOT NULL,
  `pass` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`user_id`, `email`, `name`, `tag`, `date_of_birth`, `pass`) VALUES
(1, 'mati@koks.com', 'Mati', 'matikoks', '2024-03-01', '123Essa');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`bookmark_id`);

--
-- Indeksy dla tabeli `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`);

--
-- Indeksy dla tabeli `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`todo_id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `bookmark_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `notes`
--
ALTER TABLE `notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `todo`
--
ALTER TABLE `todo`
  MODIFY `todo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
