-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 14 2024 г., 10:56
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `crm`
--

-- --------------------------------------------------------

--
-- Структура таблицы `achievments`
--

CREATE TABLE `achievments` (
  `id` int(11) NOT NULL,
  `academic_degree` varchar(255) NOT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `count_of_projects` int(11) DEFAULT NULL,
  `count_of_monography` int(11) DEFAULT NULL,
  `count_of_seminar` int(11) DEFAULT NULL,
  `count_of_articles` int(11) DEFAULT NULL,
  `count_of_sertific` int(11) DEFAULT NULL,
  `points` int(11) NOT NULL,
  `status` varchar(25) DEFAULT NULL,
  `current_grade` int(11) DEFAULT NULL,
  `pretend_grade` int(11) DEFAULT NULL,
  `possible_grade` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `achievments`
--

INSERT INTO `achievments` (`id`, `academic_degree`, `experience`, `count_of_projects`, `count_of_monography`, `count_of_seminar`, `count_of_articles`, `count_of_sertific`, `points`, `status`, `current_grade`, `pretend_grade`, `possible_grade`, `userId`, `createdAt`, `updatedAt`) VALUES
(6, 'phd', '10', 1, 1, 1, 2, 1, 200, 'colculated', NULL, 2, 4, 3, '2024-03-06 09:16:29', '2024-04-12 14:57:52'),
(7, 'phd', '5', 1, 1, 1, 2, 2, 245, 'colculated', NULL, 3, 9, 7, '2024-04-04 06:55:20', '2024-04-04 12:59:30'),
(8, 'phd', '10', 1, 1, 0, 2, 1, 165, 'colculated', NULL, 14, 6, 12, '2024-04-08 10:22:29', '2024-04-08 10:22:34');

-- --------------------------------------------------------

--
-- Структура таблицы `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `file` text DEFAULT NULL,
  `link` text DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `publicationId` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(25) DEFAULT NULL,
  `parsed` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `articles`
--

INSERT INTO `articles` (`id`, `title`, `file`, `link`, `userId`, `publicationId`, `points`, `status`, `comment`, `parsed`, `createdAt`, `updatedAt`) VALUES
(32, 'art-1', NULL, NULL, 7, 1, 25, 1, NULL, 0, '2024-04-04 12:51:08', '2024-04-04 12:51:08'),
(35, 'art-2', 'Articles\\file-1712571744225', NULL, 12, 3, 20, 1, NULL, 0, '2024-04-08 10:22:24', '2024-04-08 10:22:24'),
(40, 'artt', NULL, 'https://caer.narxoz.kz/jour/article/view/955', 3, 1, 25, 1, 'year doesnt accord', 1, '2024-04-12 13:53:57', '2024-04-12 13:53:57'),
(42, 'art-2', NULL, 'https://innovation-entrepreneurship.springeropen.com/articles/10.1186/s13731-023-00355-3', 3, 3, 20, 1, '', 1, '2024-04-12 14:39:37', '2024-04-12 14:39:37'),
(43, 'fake link', NULL, 'http://localhost:8080/achievments', 3, 1, 25, 0, 'fake link', 0, '2024-04-12 14:57:45', '2024-04-12 14:57:45');

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'обязательные', '2024-02-05 05:42:04', '2024-02-05 05:42:04'),
(2, 'дополнительные', '2024-02-05 05:42:17', '2024-02-05 05:42:17'),
(3, 'Minor', '2024-02-05 05:42:28', '2024-02-05 05:42:28');

-- --------------------------------------------------------

--
-- Структура таблицы `crns`
--

CREATE TABLE `crns` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `crns`
--

INSERT INTO `crns` (`id`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'CRN 357', '2024-01-05 19:26:39', '2024-01-05 19:26:39'),
(3, 'Crn 555', '2024-02-18 07:22:15', '2024-02-18 07:22:15'),
(4, 'CRN 356', '2024-02-18 07:43:29', '2024-02-18 07:43:29');

-- --------------------------------------------------------

--
-- Структура таблицы `deanroles`
--

CREATE TABLE `deanroles` (
  `id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `deanroles`
--

INSERT INTO `deanroles` (`id`, `value`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'head', 'head is main man in department', '2024-02-18 07:55:37', '2024-02-18 07:55:37'),
(2, 'vice-head', 'vice-head is main man in department after head', '2024-02-18 08:35:22', '2024-02-18 08:35:22'),
(3, 'other specialists', 'vice-head is main man in department after head', '2024-02-18 08:38:22', '2024-02-18 08:38:22');

-- --------------------------------------------------------

--
-- Структура таблицы `deans`
--

CREATE TABLE `deans` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `deanRoleId` int(11) DEFAULT NULL,
  `salary` int(11) NOT NULL,
  `duties` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `deans`
--

INSERT INTO `deans` (`id`, `userId`, `deanRoleId`, `salary`, `duties`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 500000, 'heading by employeers', '2024-02-19 10:52:08', '2024-02-19 10:52:08');

-- --------------------------------------------------------

--
-- Структура таблицы `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `departments`
--

INSERT INTO `departments` (`id`, `title`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'digital school', 'цифровая школа', '2024-01-05 09:31:37', '2024-01-05 09:31:37'),
(3, 'school of menegment and managment', 'ШКОЛА ЭКОНОМИКИ И МЕНЕДЖМЕНТА', '2024-02-03 10:38:13', '2024-02-03 10:38:13'),
(4, 'school of business', 'ШКОЛА ЭКОНОМИКИ И МЕНЕДЖМЕНТА', '2024-02-03 10:38:54', '2024-02-03 10:38:54');

-- --------------------------------------------------------

--
-- Структура таблицы `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `hasPhd` tinyint(1) NOT NULL DEFAULT 0,
  `experience` int(11) NOT NULL,
  `min_count_article` int(11) NOT NULL,
  `min_count_projects` int(11) NOT NULL,
  `min_count_sertificates` int(11) DEFAULT 0,
  `min_count_seminar` int(11) DEFAULT 0,
  `min_count_monography` int(11) DEFAULT 0,
  `points` int(11) NOT NULL,
  `positionId` int(11) NOT NULL,
  `departmentId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `grades`
--

INSERT INTO `grades` (`id`, `title`, `hasPhd`, `experience`, `min_count_article`, `min_count_projects`, `min_count_sertificates`, `min_count_seminar`, `min_count_monography`, `points`, `positionId`, `departmentId`, `createdAt`, `updatedAt`) VALUES
(1, '1', 1, 10, 2, 2, 1, 1, 1, 100, 1, 3, '2024-02-15 10:32:42', '2024-02-15 10:32:42'),
(2, '1', 1, 10, 2, 2, 1, 1, 2, 100, 1, 1, '2024-02-15 10:47:51', '2024-02-15 10:47:51'),
(3, '2', 1, 10, 2, 2, 1, 1, 1, 100, 1, 1, '2024-02-15 11:14:12', '2024-02-15 11:14:12'),
(4, '3', 1, 10, 2, 1, 1, 1, 0, 100, 1, 1, '2024-02-15 11:15:03', '2024-02-15 11:15:03'),
(5, '1', 1, 10, 1, 1, 1, 1, 0, 100, 2, 1, '2024-02-15 11:19:45', '2024-02-15 11:19:45'),
(6, '2', 1, 8, 1, 1, 1, 0, 0, 100, 2, 1, '2024-02-15 11:20:29', '2024-02-15 11:20:29'),
(7, '3', 1, 7, 1, 1, 1, 1, 0, 90, 2, 1, '2024-02-15 11:21:11', '2024-02-15 11:21:11'),
(8, '1', 1, 7, 1, 0, 2, 1, 0, 90, 3, 1, '2024-02-15 11:22:23', '2024-02-15 11:22:23'),
(9, '2', 1, 5, 1, 0, 1, 1, 0, 90, 3, 1, '2024-02-15 11:22:44', '2024-02-15 11:22:44'),
(10, '3', 1, 5, 1, 0, 1, 1, 0, 85, 3, 1, '2024-02-15 11:23:01', '2024-02-15 11:23:01'),
(11, '1', 0, 4, 1, 0, 0, 2, 0, 80, 4, 1, '2024-02-15 11:23:55', '2024-02-15 11:23:55'),
(12, '2', 0, 4, 1, 0, 0, 3, 0, 80, 4, 1, '2024-02-15 11:24:31', '2024-02-15 11:24:31'),
(13, '3', 0, 4, 1, 0, 0, 1, 0, 80, 4, 1, '2024-02-15 11:25:13', '2024-02-15 11:25:13'),
(14, '1', 0, 5, 1, 1, 0, 1, 0, 100, 5, 1, '2024-03-02 10:23:59', '2024-03-02 10:23:59'),
(15, '1', 1, 10, 3, 2, 2, 3, 2, 200, 1, 4, '2024-04-07 07:04:08', '2024-04-07 07:04:08'),
(16, '2', 1, 9, 2, 2, 1, 2, 1, 190, 1, 4, '2024-04-07 07:16:47', '2024-04-07 07:16:47');

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `credit_count` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `lessons`
--

INSERT INTO `lessons` (`id`, `title`, `credit_count`, `description`, `departmentId`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(1, 'web development', 6, 'backend sid of web development', 3, 1, '2024-02-05 06:18:47', '2024-02-05 06:18:47'),
(2, 'managment', 5, 'management', 3, 1, '2024-02-05 06:25:12', '2024-02-05 06:25:12'),
(3, 'Алгоритм', 6, 'совокупность точно заданных правил решения некоторого класса задач ', 1, 1, '2024-02-17 05:02:02', '2024-02-17 05:02:02'),
(4, 'web-development', 6, 'web-development using by express and vue', 1, 1, '2024-04-03 06:47:23', '2024-04-03 06:47:23'),
(5, 'backend development', 6, 'backend development using by laravel', 1, 1, '2024-04-03 06:49:29', '2024-04-03 06:49:29'),
(6, 'bank managment', 5, 'bank managment is minor from major finance', 1, 3, '2024-04-03 06:51:37', '2024-04-03 06:51:37');

-- --------------------------------------------------------

--
-- Структура таблицы `organizations`
--

CREATE TABLE `organizations` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `points` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `organizations`
--

INSERT INTO `organizations` (`id`, `title`, `points`, `createdAt`, `updatedAt`) VALUES
(1, 'Harvard', 60, '2024-02-12 06:25:46', '2024-02-12 06:25:46'),
(2, 'Oxford', 60, '2024-02-12 06:27:00', '2024-02-12 06:27:00'),
(3, 'MIT', 50, '2024-02-12 06:28:00', '2024-02-12 06:28:00'),
(4, 'NU', 50, '2024-02-12 06:28:12', '2024-02-12 06:28:12'),
(5, 'university of Stanford', 60, '2024-02-12 06:35:49', '2024-02-12 06:35:49'),
(6, 'university of Chicago', 60, '2024-02-12 06:37:08', '2024-02-12 06:37:08'),
(7, 'university of Hogwarts', 60, '2024-02-12 06:37:27', '2024-02-12 06:37:27');

-- --------------------------------------------------------

--
-- Структура таблицы `positions`
--

CREATE TABLE `positions` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `positions`
--

INSERT INTO `positions` (`id`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'Профессор', '2024-02-12 05:43:05', '2024-02-12 05:43:05'),
(2, 'Ассоциированный профессор', '2024-02-12 05:43:42', '2024-02-12 05:43:42'),
(3, 'Ассистент-профессор', '2024-02-12 05:48:14', '2024-02-12 05:48:14'),
(4, 'Старший преподаватель', '2024-02-12 05:48:56', '2024-02-12 05:48:56'),
(5, 'Преподователь', '2024-02-17 05:43:04', '2024-02-17 05:43:04');

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(25) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `title`, `file`, `userId`, `categoryId`, `points`, `status`, `comment`, `createdAt`, `updatedAt`) VALUES
(35, 'project-1', 'Projects\\1709716584676-19nigeria.jpg', 3, 1, 25, 1, NULL, '2024-03-06 09:16:24', '2024-03-06 09:16:24'),
(36, 'project-2', 'Projects\\1709716584713-800.jpg', 3, 2, 20, 1, NULL, '2024-03-06 09:16:24', '2024-03-06 09:16:24'),
(37, 'seminar', 'Projects\\1709716646077-1557573704_124_390_3072_2048_600x0_80_0_0_01eaa7213d85856dde2fb2cd6f5f4a05.jpg', 3, 3, 15, 1, NULL, '2024-03-06 09:17:26', '2024-03-06 09:17:26'),
(43, 'pro-1', 'Projects\\1712212551915-1.jpg', 2, 1, 25, 1, NULL, '2024-04-04 06:35:51', '2024-04-04 06:35:51'),
(44, 'pro-1', 'Projects\\1712234822885-19nigeria.jpg', 7, 2, 20, 1, NULL, '2024-04-04 12:47:02', '2024-04-04 12:47:02'),
(45, 'pro-2', 'Projects\\1712235382518-2.jpg', 7, 1, 25, 1, NULL, '2024-04-04 12:56:22', '2024-04-04 12:56:22'),
(46, 'sem-1', 'Projects\\1712235567106-19nigeria.jpg', 7, 3, 15, 1, NULL, '2024-04-04 12:59:27', '2024-04-04 12:59:27'),
(47, 'pro1', 'Projects\\1712571744018-1.jpg', 12, 1, 25, 1, NULL, '2024-04-08 10:22:24', '2024-04-08 10:22:24'),
(48, 'pro-2', 'Projects\\1712571744118-2.jpg', 12, 2, 20, 1, NULL, '2024-04-08 10:22:24', '2024-04-08 10:22:24');

-- --------------------------------------------------------

--
-- Структура таблицы `project_categories`
--

CREATE TABLE `project_categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `points` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `project_categories`
--

INSERT INTO `project_categories` (`id`, `title`, `points`, `createdAt`, `updatedAt`) VALUES
(1, 'scientific project', 25, '2024-02-12 09:05:30', '2024-02-12 09:05:30'),
(2, 'monography', 20, '2024-02-12 09:05:57', '2024-02-12 09:05:57'),
(3, 'seminar', 15, '2024-02-12 09:06:04', '2024-02-12 09:06:04');

-- --------------------------------------------------------

--
-- Структура таблицы `publications`
--

CREATE TABLE `publications` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `points` int(11) NOT NULL,
  `base_url` varchar(80) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `publications`
--

INSERT INTO `publications` (`id`, `title`, `points`, `base_url`, `createdAt`, `updatedAt`) VALUES
(1, 'KOKCOH', 25, 'https://caer.narxoz.kz/jour/article/', '2024-02-12 06:06:11', '2024-02-12 06:06:11'),
(3, 'Scopus', 20, 'https://innovation-entrepreneurship.springeropen.com/articles/', '2024-02-12 06:10:23', '2024-02-12 06:10:23');

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `value`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin has access to any endpoint', '2024-01-05 09:01:02', '2024-01-05 09:01:02'),
(2, 'user', 'user has not access to any endpoint', '2024-01-05 09:01:24', '2024-01-05 09:01:24'),
(4, 'teacher', 'teacher has access to own lessons, crn, shedules', '2024-01-05 09:04:46', '2024-01-05 09:04:46'),
(6, 'main_admin', 'main_admin has access to all settings on app ', '2024-04-07 07:23:36', '2024-04-07 07:23:36');

-- --------------------------------------------------------

--
-- Структура таблицы `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240105063850-deleted.js'),
('20240105112233-save.js');

-- --------------------------------------------------------

--
-- Структура таблицы `sertificates`
--

CREATE TABLE `sertificates` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `file` text NOT NULL,
  `userId` int(11) NOT NULL,
  `OrganizationId` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `comment` varchar(25) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `sertificates`
--

INSERT INTO `sertificates` (`id`, `title`, `file`, `userId`, `OrganizationId`, `points`, `status`, `comment`, `createdAt`, `updatedAt`) VALUES
(22, 'sertific', 'Sertificates\\1712211239073-1.jpg', 3, 3, 50, 1, NULL, '2024-04-04 06:13:59', '2024-04-04 06:13:59'),
(28, 'sert-1', 'Sertificates\\1712235101057-19nigeria.jpg', 7, 2, 60, 1, NULL, '2024-04-04 12:51:41', '2024-04-04 12:51:41'),
(29, 'sert-2', 'Sertificates\\1712235473294-1.jpg', 7, 5, 60, 1, NULL, '2024-04-04 12:57:53', '2024-04-04 12:57:53'),
(30, 'sert-2', 'Sertificates\\1712571744265-19nigeria.jpg', 12, 2, 60, 1, NULL, '2024-04-08 10:22:24', '2024-04-08 10:22:24');

-- --------------------------------------------------------

--
-- Структура таблицы `shedules`
--

CREATE TABLE `shedules` (
  `id` int(11) NOT NULL,
  `lessonId` int(11) NOT NULL,
  `week_days` varchar(255) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `auditory` varchar(255) NOT NULL,
  `CRNId` int(11) DEFAULT NULL,
  `TeacherId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `shedules`
--

INSERT INTO `shedules` (`id`, `lessonId`, `week_days`, `start_time`, `end_time`, `auditory`, `CRNId`, `TeacherId`, `createdAt`, `updatedAt`) VALUES
(1, 3, 'monday', '08:00:00', '09:15:00', '141', 1, 1, '2024-02-19 11:35:48', '2024-02-19 11:35:48'),
(2, 3, 'monday', '10:30:00', '11:45:00', '141', 1, 1, '2024-02-22 05:59:27', '2024-02-22 05:59:27'),
(3, 3, 'thursday', '08:00:00', '09:15:00', '505', 3, 1, '2024-02-22 06:01:17', '2024-02-22 06:01:17'),
(4, 3, 'wednesday', '09:15:00', '10:30:00', '502', 4, 1, '2024-02-22 06:03:12', '2024-02-22 06:03:12'),
(5, 4, 'tuesday', '09:15:00', '10:30:00', '503', 3, 2, '2024-04-07 06:53:24', '2024-04-07 06:53:24'),
(6, 4, 'tuesday', '09:15:00', '10:30:00', '503', 3, 2, '2024-04-07 06:53:24', '2024-04-07 06:53:24');

-- --------------------------------------------------------

--
-- Структура таблицы `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `salary` int(11) NOT NULL,
  `student_survey` int(11) NOT NULL,
  `achivmentsId` int(11) DEFAULT NULL,
  `gradeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `teachers`
--

INSERT INTO `teachers` (`id`, `userId`, `salary`, `student_survey`, `achivmentsId`, `gradeId`, `createdAt`, `updatedAt`) VALUES
(1, 3, 400000, 55, 6, 13, '2024-02-16 06:32:59', '2024-03-06 09:35:00'),
(2, 2, 50000, 20, NULL, NULL, '2024-04-04 00:57:09', '2024-04-04 00:57:09'),
(3, 7, 500, 50, 7, 9, '2024-04-04 06:51:08', '2024-04-04 13:51:18'),
(4, 12, 50000, 50, 8, NULL, '2024-04-08 10:17:49', '2024-04-08 10:22:34');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `cv_file` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `image`, `cv_file`, `phone_number`, `password`, `roleId`, `departmentId`, `createdAt`, `updatedAt`) VALUES
(1, 'user-9@gmail.com', 'raiymbek', 'amantayev', 'Images\\1706954194473-egipet-v-avguste_1578309989.jpg', 'Images\\1706954194494-Ð ÐµÐ·ÑÐ¼Ðµ Backend Ð Ð°Ð·ÑÐ°Ð±Ð¾ÑÑÐ¸Ðº Raiymbek Amantayev Ð¾Ñ 09-11-2023 09-07 (4).pdf', '87476798570', '$2b$10$qLhOluFI6Le7UlM/wCVh2eUQ.DDoSxEuGP2p3tmf9ubHGgU3UnhAy', 1, 1, '2024-02-03 09:52:27', '2024-02-03 10:58:24'),
(2, 'user-8@gmail.com', NULL, NULL, NULL, NULL, NULL, '$2b$10$AMw03ZErsbcL1o4oJfzikeB/JUufNyMawCLI3DIu6jyZlqrTYuEoS', 4, 1, '2024-02-03 09:57:01', '2024-04-04 01:13:51'),
(3, 'user-7@gmail.com', 'Mikhail', 'Aubakirova', NULL, NULL, NULL, '$2b$10$CGqSn/t0tXQIj7di/bTAr.OxL/CeKpXcnISSNnbRuSwK67xryGOtK', 4, 1, '2024-02-03 09:57:09', '2024-02-03 11:13:23'),
(4, 'user-6@gmail.com', NULL, NULL, NULL, NULL, NULL, '$2b$10$ZUUWsoT46EfFYgRqviQEC.wqWnmQfisarwi3T/HOwY5PstjkNPguO', 1, 4, '2024-02-03 09:57:15', '2024-02-03 15:36:09'),
(5, 'user-5@gmail.com', NULL, NULL, NULL, NULL, NULL, '$2b$10$dR48XcBvmW604KmOkTOcyeXlIe5xWjwN439DCT5PtrH3F9Ssm2SU.', 1, 3, '2024-02-03 09:57:23', '2024-02-03 15:36:36'),
(6, 'user-4@gmail.com', NULL, NULL, NULL, NULL, NULL, '$2b$10$9WMB0J8R88k6su.pN27E..VbYm1tFK9YDgVi98ivOwy33HxypdmGq', 4, 3, '2024-02-03 09:57:30', '2024-02-03 15:35:42'),
(7, 'user-14@gmail.com', NULL, NULL, NULL, NULL, NULL, '$2b$10$eXnSnPvOlkMia2wN0bXnxuCFYRiV8wSoHH4ZpNvIYeAPFaXYRo4Qy', 4, 1, '2024-04-03 00:59:33', '2024-04-04 06:48:51'),
(8, 'main_admin@gmail.com', NULL, NULL, NULL, NULL, NULL, '$2b$10$GnVAAgj3GU8rINJjGqQvgOKQmEEu1f.KOsjCHj9q2lrUf9Gw.WJWO', 6, NULL, '2024-04-07 08:22:18', '2024-04-07 08:22:18'),
(12, 'user-111@gmail.com', NULL, NULL, NULL, NULL, NULL, '$2b$10$zK9QuGHRPZGPySZtVHpBA./gnuvLCj.HZyp67s.f5ItwcEnl0aFbG', 4, 1, '2024-04-08 10:15:55', '2024-04-08 10:16:59');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `achievments`
--
ALTER TABLE `achievments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `current_grade` (`current_grade`),
  ADD KEY `pretend_grade` (`pretend_grade`),
  ADD KEY `possible_grade` (`possible_grade`),
  ADD KEY `userId` (`userId`);

--
-- Индексы таблицы `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `publicationId` (`publicationId`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `crns`
--
ALTER TABLE `crns`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `deanroles`
--
ALTER TABLE `deanroles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `deans`
--
ALTER TABLE `deans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `deanRoleId` (`deanRoleId`);

--
-- Индексы таблицы `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `positionId` (`positionId`),
  ADD KEY `departmentId` (`departmentId`);

--
-- Индексы таблицы `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `departmentId` (`departmentId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Индексы таблицы `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Индексы таблицы `project_categories`
--
ALTER TABLE `project_categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `sertificates`
--
ALTER TABLE `sertificates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `OrganizationId` (`OrganizationId`);

--
-- Индексы таблицы `shedules`
--
ALTER TABLE `shedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessonId` (`lessonId`),
  ADD KEY `CRNId` (`CRNId`),
  ADD KEY `TeacherId` (`TeacherId`);

--
-- Индексы таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `achivmentsId` (`achivmentsId`),
  ADD KEY `gradeId` (`gradeId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`),
  ADD KEY `departmentId` (`departmentId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `achievments`
--
ALTER TABLE `achievments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `crns`
--
ALTER TABLE `crns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `deanroles`
--
ALTER TABLE `deanroles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `deans`
--
ALTER TABLE `deans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `positions`
--
ALTER TABLE `positions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT для таблицы `project_categories`
--
ALTER TABLE `project_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `publications`
--
ALTER TABLE `publications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `sertificates`
--
ALTER TABLE `sertificates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT для таблицы `shedules`
--
ALTER TABLE `shedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `achievments`
--
ALTER TABLE `achievments`
  ADD CONSTRAINT `achievments_ibfk_1` FOREIGN KEY (`current_grade`) REFERENCES `grades` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `achievments_ibfk_2` FOREIGN KEY (`pretend_grade`) REFERENCES `grades` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `achievments_ibfk_3` FOREIGN KEY (`possible_grade`) REFERENCES `grades` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `achievments_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`publicationId`) REFERENCES `publications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `deans`
--
ALTER TABLE `deans`
  ADD CONSTRAINT `deans_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `deans_ibfk_2` FOREIGN KEY (`deanRoleId`) REFERENCES `deanroles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`positionId`) REFERENCES `positions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `project_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `sertificates`
--
ALTER TABLE `sertificates`
  ADD CONSTRAINT `sertificates_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sertificates_ibfk_2` FOREIGN KEY (`OrganizationId`) REFERENCES `organizations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `shedules`
--
ALTER TABLE `shedules`
  ADD CONSTRAINT `shedules_ibfk_1` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shedules_ibfk_2` FOREIGN KEY (`CRNId`) REFERENCES `crns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `shedules_ibfk_3` FOREIGN KEY (`TeacherId`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `teachers_ibfk_2` FOREIGN KEY (`achivmentsId`) REFERENCES `achievments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `teachers_ibfk_3` FOREIGN KEY (`gradeId`) REFERENCES `grades` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
