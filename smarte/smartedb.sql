-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2026 at 01:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` int(11) NOT NULL,
  `unique_code` varchar(100) NOT NULL,
  `bldg` varchar(255) NOT NULL,
  `room` varchar(100) NOT NULL,
  `schedule_time` varchar(100) NOT NULL,
  `assigned_date` date NOT NULL,
  `cleaned` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `unique_code` varchar(100) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `att_date` date NOT NULL,
  `time_in` varchar(50) NOT NULL,
  `time_out` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Present'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `device_id` int(10) UNSIGNED NOT NULL,
  `room_id` int(10) UNSIGNED DEFAULT NULL,
  `device_code` varchar(50) NOT NULL,
  `device_name` varchar(100) DEFAULT 'SMART-E Unit',
  `api_key_hash` varchar(255) DEFAULT NULL,
  `status` enum('OCCUPIED','VACANT','ALERT','OFFLINE') NOT NULL DEFAULT 'OFFLINE',
  `last_seen` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`device_id`, `room_id`, `device_code`, `device_name`, `api_key_hash`, `status`, `last_seen`, `is_active`, `registered_at`, `updated_at`) VALUES
(5, 6, 'SMARTE-001', 'SMART-E Prototype 2.0', NULL, 'VACANT', '2026-11-15 18:19:41', 1, '2026-11-13 10:26:19', '2026-11-15 10:19:41');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `sender_name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `rating` int(11) DEFAULT 5,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `sender_name`, `category`, `rating`, `message`, `created_at`) VALUES
(4, 'Maria Santos', 'Website Experience', 5, 'okay naman siyaa', '2026-11-15 10:12:05'),
(5, 'Ben Ramos', 'Website Experience', 5, 'Love the devicee!', '2026-11-15 10:12:32');

-- --------------------------------------------------------

--
-- Table structure for table `janitors`
--

CREATE TABLE `janitors` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `unique_code` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `monitoring_logs`
--

CREATE TABLE `monitoring_logs` (
  `log_id` bigint(20) UNSIGNED NOT NULL,
  `device_id` int(10) UNSIGNED NOT NULL,
  `motion_detected` tinyint(1) NOT NULL,
  `light_detected` tinyint(1) NOT NULL,
  `status` enum('OCCUPIED','VACANT','ALERT','OFFLINE') NOT NULL,
  `recorded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monitoring_logs`
--

INSERT INTO `monitoring_logs` (`log_id`, `device_id`, `motion_detected`, `light_detected`, `status`, `recorded_at`) VALUES
(1, 5, 0, 0, 'VACANT', '2026-11-14 02:42:56'),
(2, 5, 0, 0, 'VACANT', '2026-11-14 02:43:06'),
(3, 5, 0, 0, 'VACANT', '2026-11-14 02:43:16'),
(4, 5, 0, 1, 'ALERT', '2026-11-14 02:43:40'),
(5, 5, 1, 0, 'OCCUPIED', '2026-11-14 02:43:50'),
(6, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:44:00'),
(7, 5, 0, 0, 'VACANT', '2026-11-14 02:44:10'),
(8, 5, 0, 0, 'VACANT', '2026-11-14 02:44:20'),
(9, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:44:30'),
(10, 5, 1, 0, 'OCCUPIED', '2026-11-14 02:44:40'),
(11, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:44:50'),
(12, 5, 1, 0, 'OCCUPIED', '2026-11-14 02:45:00'),
(13, 5, 0, 1, 'ALERT', '2026-11-14 02:45:10'),
(14, 5, 0, 1, 'ALERT', '2026-11-14 02:45:19'),
(15, 5, 1, 0, 'OCCUPIED', '2026-11-14 02:45:29'),
(16, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:45:40'),
(17, 5, 0, 0, 'VACANT', '2026-11-14 02:45:50'),
(18, 5, 0, 1, 'ALERT', '2026-11-14 02:46:00'),
(19, 5, 0, 0, 'VACANT', '2026-11-14 02:46:09'),
(20, 5, 0, 1, 'ALERT', '2026-11-14 02:46:20'),
(21, 5, 0, 1, 'ALERT', '2026-11-14 02:46:30'),
(22, 5, 0, 0, 'VACANT', '2026-11-14 02:46:40'),
(23, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:46:50'),
(24, 5, 0, 1, 'ALERT', '2026-11-14 02:47:00'),
(25, 5, 0, 1, 'ALERT', '2026-11-14 02:47:10'),
(26, 5, 0, 1, 'ALERT', '2026-11-14 02:47:20'),
(27, 5, 0, 1, 'ALERT', '2026-11-14 02:47:30'),
(28, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:47:40'),
(29, 5, 0, 1, 'ALERT', '2026-11-14 02:47:50'),
(30, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:47:59'),
(31, 5, 0, 1, 'ALERT', '2026-11-14 02:48:10'),
(32, 5, 0, 1, 'ALERT', '2026-11-14 02:48:20'),
(33, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:48:29'),
(34, 5, 0, 1, 'ALERT', '2026-11-14 02:48:39'),
(35, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:48:50'),
(36, 5, 0, 1, 'ALERT', '2026-11-14 02:49:00'),
(37, 5, 0, 1, 'ALERT', '2026-11-14 02:49:10'),
(38, 5, 0, 0, 'VACANT', '2026-11-14 02:49:20'),
(39, 5, 0, 1, 'ALERT', '2026-11-14 02:49:30'),
(40, 5, 0, 1, 'ALERT', '2026-11-14 02:49:40'),
(41, 5, 0, 1, 'ALERT', '2026-11-14 02:49:50'),
(42, 5, 0, 1, 'ALERT', '2026-11-14 02:50:00'),
(43, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:50:10'),
(44, 5, 0, 1, 'ALERT', '2026-11-14 02:50:20'),
(45, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:50:33'),
(46, 5, 0, 1, 'ALERT', '2026-11-14 02:50:40'),
(47, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:50:50'),
(48, 5, 0, 1, 'ALERT', '2026-11-14 02:50:59'),
(49, 5, 0, 1, 'ALERT', '2026-11-14 02:51:13'),
(50, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:51:21'),
(51, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:51:30'),
(52, 5, 1, 1, 'OCCUPIED', '2026-11-14 02:51:40'),
(53, 5, 0, 0, 'VACANT', '2026-11-14 03:18:49'),
(54, 5, 0, 1, 'ALERT', '2026-11-14 03:18:58'),
(55, 5, 1, 1, 'OCCUPIED', '2026-11-14 03:19:39'),
(56, 5, 0, 1, 'ALERT', '2026-11-14 03:19:48'),
(57, 5, 1, 1, 'OCCUPIED', '2026-11-14 03:25:39'),
(58, 5, 0, 1, 'ALERT', '2026-11-14 03:25:48'),
(59, 5, 0, 0, 'VACANT', '2026-11-14 03:25:58'),
(60, 5, 0, 1, 'ALERT', '2026-11-14 03:26:18'),
(61, 5, 0, 0, 'VACANT', '2026-11-14 03:27:18'),
(62, 5, 0, 1, 'ALERT', '2026-11-14 03:27:28'),
(63, 5, 0, 0, 'VACANT', '2026-11-14 03:27:38'),
(64, 5, 0, 1, 'ALERT', '2026-11-14 03:27:48'),
(65, 5, 0, 0, 'VACANT', '2026-11-14 03:27:58'),
(66, 5, 0, 1, 'ALERT', '2026-11-14 03:28:18'),
(67, 5, 0, 0, 'VACANT', '2026-11-14 03:28:28'),
(68, 5, 0, 1, 'ALERT', '2026-11-14 03:28:38'),
(69, 5, 0, 0, 'VACANT', '2026-11-14 03:28:49'),
(70, 5, 0, 1, 'ALERT', '2026-11-14 03:29:08'),
(71, 5, 0, 0, 'VACANT', '2026-11-14 03:29:18'),
(72, 5, 0, 1, 'ALERT', '2026-11-14 03:29:29'),
(73, 5, 0, 0, 'VACANT', '2026-11-14 03:29:38'),
(74, 5, 0, 1, 'ALERT', '2026-11-14 03:29:58'),
(75, 5, 0, 0, 'VACANT', '2026-11-14 03:30:09'),
(76, 5, 0, 1, 'ALERT', '2026-11-14 03:30:18'),
(77, 5, 0, 0, 'VACANT', '2026-11-14 03:30:28'),
(78, 5, 0, 1, 'ALERT', '2026-11-14 03:30:38'),
(79, 5, 0, 0, 'VACANT', '2026-11-14 04:05:41'),
(80, 5, 1, 1, 'OCCUPIED', '2026-11-14 04:06:03'),
(81, 5, 0, 1, 'ALERT', '2026-11-14 04:06:11'),
(82, 5, 0, 1, 'ALERT', '2026-11-14 06:50:37'),
(83, 5, 1, 1, 'OCCUPIED', '2026-11-14 06:50:47'),
(84, 5, 0, 1, 'ALERT', '2026-11-14 06:50:57'),
(85, 5, 1, 1, 'OCCUPIED', '2026-11-14 06:51:07'),
(86, 5, 0, 1, 'ALERT', '2026-11-14 06:51:17'),
(87, 5, 1, 1, 'OCCUPIED', '2026-11-14 06:51:27'),
(88, 5, 0, 1, 'ALERT', '2026-11-14 06:51:37'),
(89, 5, 1, 1, 'OCCUPIED', '2026-11-14 06:51:47'),
(90, 5, 0, 1, 'ALERT', '2026-11-14 06:54:07'),
(91, 5, 0, 0, 'VACANT', '2026-11-14 07:10:26'),
(92, 5, 0, 1, 'ALERT', '2026-11-14 07:10:36'),
(93, 5, 1, 1, 'OCCUPIED', '2026-11-14 07:11:21'),
(94, 5, 0, 1, 'ALERT', '2026-11-14 07:11:31'),
(95, 5, 1, 1, 'OCCUPIED', '2026-11-14 07:11:41'),
(96, 5, 0, 1, 'ALERT', '2026-11-14 07:12:42'),
(97, 5, 1, 1, 'OCCUPIED', '2026-11-14 07:13:31'),
(98, 5, 0, 1, 'ALERT', '2026-11-14 07:13:42'),
(99, 5, 1, 1, 'OCCUPIED', '2026-11-14 07:14:01'),
(100, 5, 0, 1, 'ALERT', '2026-11-14 07:14:32'),
(101, 5, 1, 1, 'OCCUPIED', '2026-11-14 07:15:01'),
(102, 5, 0, 1, 'ALERT', '2026-11-14 07:15:12'),
(103, 5, 1, 1, 'OCCUPIED', '2026-11-14 07:15:42'),
(104, 5, 0, 1, 'ALERT', '2026-11-14 07:48:08'),
(105, 5, 1, 1, 'OCCUPIED', '2026-11-14 07:48:58'),
(106, 5, 0, 1, 'ALERT', '2026-11-14 07:49:18'),
(107, 5, 1, 1, 'OCCUPIED', '2026-11-14 07:49:28'),
(108, 5, 0, 1, 'ALERT', '2026-11-14 08:10:46'),
(109, 5, 1, 1, 'OCCUPIED', '2026-11-14 08:11:05'),
(110, 5, 0, 1, 'ALERT', '2026-11-14 08:11:45'),
(111, 5, 1, 1, 'OCCUPIED', '2026-11-14 08:11:55'),
(112, 5, 0, 1, 'ALERT', '2026-11-14 08:13:25'),
(113, 5, 1, 1, 'OCCUPIED', '2026-11-14 08:13:35'),
(114, 5, 0, 1, 'ALERT', '2026-11-14 08:14:45'),
(115, 5, 1, 1, 'OCCUPIED', '2026-11-14 08:14:56'),
(116, 5, 0, 1, 'ALERT', '2026-11-14 08:50:43'),
(117, 5, 1, 1, 'OCCUPIED', '2026-11-15 08:28:47'),
(118, 5, 0, 1, 'ALERT', '2026-11-15 08:28:57'),
(119, 5, 1, 0, 'OCCUPIED', '2026-11-15 08:29:07'),
(120, 5, 0, 1, 'ALERT', '2026-11-15 08:29:27'),
(121, 5, 0, 0, 'VACANT', '2026-11-15 08:29:37'),
(122, 5, 1, 0, 'OCCUPIED', '2026-11-15 08:29:47'),
(123, 5, 0, 0, 'VACANT', '2026-11-15 08:30:07'),
(124, 5, 1, 0, 'OCCUPIED', '2026-11-15 08:30:27'),
(125, 5, 0, 1, 'ALERT', '2026-11-15 08:30:37'),
(126, 5, 1, 1, 'OCCUPIED', '2026-11-15 08:30:57'),
(127, 5, 0, 1, 'ALERT', '2026-11-15 08:31:17'),
(128, 5, 1, 1, 'OCCUPIED', '2026-11-15 08:31:37'),
(129, 5, 0, 1, 'ALERT', '2026-11-15 08:32:07'),
(130, 5, 1, 1, 'OCCUPIED', '2026-11-15 08:32:17'),
(131, 5, 0, 0, 'VACANT', '2026-11-15 08:32:37'),
(132, 5, 0, 1, 'ALERT', '2026-11-15 09:30:21'),
(133, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:31:11'),
(134, 5, 0, 1, 'ALERT', '2026-11-15 09:31:21'),
(135, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:33:15'),
(136, 5, 0, 1, 'ALERT', '2026-11-15 09:33:35'),
(137, 5, 1, 0, 'OCCUPIED', '2026-11-15 09:33:40'),
(138, 5, 0, 1, 'ALERT', '2026-11-15 09:33:50'),
(139, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:34:00'),
(140, 5, 0, 1, 'ALERT', '2026-11-15 09:34:05'),
(141, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:34:35'),
(142, 5, 0, 1, 'ALERT', '2026-11-15 09:34:45'),
(143, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:34:50'),
(144, 5, 0, 1, 'ALERT', '2026-11-15 09:34:55'),
(145, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:35:20'),
(146, 5, 0, 1, 'ALERT', '2026-11-15 09:35:29'),
(147, 5, 0, 0, 'VACANT', '2026-11-15 09:36:04'),
(148, 5, 0, 1, 'ALERT', '2026-11-15 09:36:32'),
(149, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:36:52'),
(150, 5, 0, 1, 'ALERT', '2026-11-15 09:37:17'),
(151, 5, 1, 0, 'OCCUPIED', '2026-11-15 09:37:22'),
(152, 5, 0, 0, 'VACANT', '2026-11-15 09:37:32'),
(153, 5, 0, 1, 'ALERT', '2026-11-15 09:37:37'),
(154, 5, 0, 0, 'VACANT', '2026-11-15 09:37:42'),
(155, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:37:47'),
(156, 5, 0, 1, 'ALERT', '2026-11-15 09:38:07'),
(157, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:38:47'),
(158, 5, 0, 1, 'ALERT', '2026-11-15 09:38:57'),
(159, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:39:07'),
(160, 5, 0, 1, 'ALERT', '2026-11-15 09:39:17'),
(161, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:40:17'),
(162, 5, 0, 1, 'ALERT', '2026-11-15 09:40:22'),
(163, 5, 1, 0, 'OCCUPIED', '2026-11-15 09:40:42'),
(164, 5, 0, 1, 'ALERT', '2026-11-15 09:41:12'),
(165, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:41:37'),
(166, 5, 0, 0, 'VACANT', '2026-11-15 09:42:38'),
(167, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:42:58'),
(168, 5, 0, 1, 'ALERT', '2026-11-15 09:43:19'),
(169, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:43:21'),
(170, 5, 0, 1, 'ALERT', '2026-11-15 09:43:27'),
(171, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:43:36'),
(172, 5, 0, 1, 'ALERT', '2026-11-15 09:44:56'),
(173, 5, 1, 0, 'OCCUPIED', '2026-11-15 09:45:36'),
(174, 5, 0, 0, 'VACANT', '2026-11-15 09:45:40'),
(175, 5, 1, 0, 'OCCUPIED', '2026-11-15 09:45:51'),
(176, 5, 0, 0, 'VACANT', '2026-11-15 09:46:00'),
(177, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:46:05'),
(178, 5, 0, 1, 'ALERT', '2026-11-15 09:46:10'),
(179, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:46:20'),
(180, 5, 0, 1, 'ALERT', '2026-11-15 09:46:40'),
(181, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:46:50'),
(182, 5, 0, 1, 'ALERT', '2026-11-15 09:46:56'),
(183, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:47:06'),
(184, 5, 0, 1, 'ALERT', '2026-11-15 09:47:11'),
(185, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:47:37'),
(186, 5, 0, 1, 'ALERT', '2026-11-15 09:47:42'),
(187, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:48:01'),
(188, 5, 0, 1, 'ALERT', '2026-11-15 09:48:05'),
(189, 5, 1, 1, 'OCCUPIED', '2026-11-15 09:48:37'),
(190, 5, 0, 1, 'ALERT', '2026-11-15 09:48:41'),
(191, 5, 0, 0, 'VACANT', '2026-11-15 10:17:55'),
(192, 5, 0, 1, 'ALERT', '2026-11-15 10:18:00'),
(193, 5, 1, 0, 'OCCUPIED', '2026-11-15 10:18:47'),
(194, 5, 0, 1, 'ALERT', '2026-11-15 10:18:57'),
(195, 5, 1, 0, 'OCCUPIED', '2026-11-15 10:19:08'),
(196, 5, 0, 1, 'ALERT', '2026-11-15 10:19:37'),
(197, 5, 0, 0, 'VACANT', '2026-11-15 10:19:41');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `device_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `status` enum('OCCUPIED','VACANT','ALERT','OFFLINE') DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_id`, `device_id`, `title`, `message`, `status`, `is_read`, `created_at`) VALUES
(1, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 06:50:37'),
(2, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 02:50 PM.', '', 0, '2026-11-14 06:50:37'),
(3, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 06:50:57'),
(4, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 06:51:17'),
(5, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 06:51:37'),
(6, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 06:54:07'),
(7, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 03:10 PM.', '', 0, '2026-11-14 07:10:06'),
(8, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 07:10:36'),
(9, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 03:11 PM.', '', 0, '2026-11-14 07:11:02'),
(10, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 07:11:31'),
(11, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 07:12:42'),
(12, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 07:13:42'),
(13, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 07:14:32'),
(14, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 07:15:12'),
(15, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 07:48:08'),
(16, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 03:48 PM.', '', 0, '2026-11-14 07:48:08'),
(17, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 07:49:18'),
(18, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 08:10:47'),
(19, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 04:10 PM.', '', 0, '2026-11-14 08:10:47'),
(20, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 08:11:45'),
(21, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 08:13:25'),
(22, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 08:14:45'),
(23, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-14 08:50:43'),
(24, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 04:50 PM.', '', 0, '2026-11-14 08:50:43'),
(25, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 04:28 PM.', '', 0, '2026-11-15 08:28:37'),
(26, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 08:28:57'),
(27, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 08:29:27'),
(28, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 08:30:37'),
(29, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 08:31:17'),
(30, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 08:32:07'),
(31, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:30:21'),
(32, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 05:30 PM.', '', 0, '2026-11-15 09:30:21'),
(33, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:31:21'),
(34, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 05:32 PM.', '', 0, '2026-11-15 09:32:10'),
(35, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:33:35'),
(36, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:33:50'),
(37, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:34:05'),
(38, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:34:45'),
(39, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:34:55'),
(40, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:35:29'),
(41, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:36:32'),
(42, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 05:36 PM.', '', 0, '2026-11-15 09:36:32'),
(43, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:37:17'),
(44, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:37:37'),
(45, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:38:07'),
(46, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 05:38 PM.', '', 0, '2026-11-15 09:38:07'),
(47, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:38:57'),
(48, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:39:17'),
(49, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:40:22'),
(50, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:41:12'),
(51, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 05:42 PM.', '', 0, '2026-11-15 09:42:38'),
(52, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:43:19'),
(53, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 05:43 PM.', '', 0, '2026-11-15 09:43:19'),
(54, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:43:27'),
(55, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:44:56'),
(56, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 05:44 PM.', '', 0, '2026-11-15 09:44:56'),
(57, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:46:10'),
(58, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:46:40'),
(59, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:46:56'),
(60, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:47:11'),
(61, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:47:42'),
(62, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:48:05'),
(63, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 09:48:41'),
(64, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 05:49 PM.', '', 0, '2026-11-15 09:49:46'),
(65, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 06:17 PM.', '', 0, '2026-11-15 10:17:46'),
(66, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 10:18:00'),
(67, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 06:18 PM.', '', 0, '2026-11-15 10:18:35'),
(68, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 10:18:57'),
(69, 5, 5, 'Unnecessary Energy Consumption Detected!', 'Light is ON while Room 404 is vacant. Please check the area and turn off the light to save energy.', 'ALERT', 0, '2026-11-15 10:19:37'),
(70, 5, 5, 'SMART-E Device Reconnected', 'SMART-E device SMARTE-001 in Room 404 has reconnected successfully. Connection restored at 06:19 PM.', '', 0, '2026-11-15 10:19:37');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `room_name` varchar(100) NOT NULL,
  `location` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `user_id`, `room_name`, `location`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(5, NULL, 'Room 404', NULL, NULL, 1, '2026-11-13 10:06:59', '2026-11-13 10:06:59'),
(6, 5, 'Room 404', 'Bldg. EBB', NULL, 1, '2026-11-14 06:39:11', '2026-11-14 06:39:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `role` enum('admin','facilitator') NOT NULL DEFAULT 'facilitator',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password_hash`, `profile_photo`, `role`, `created_at`, `updated_at`) VALUES
(5, 'Maria Santos', 'santosmari@gmail.com', '$2y$10$QMj68.uzxD3apvmLOsVHKOGy/v.HnOukwAgMbgfsUVPTFv1fbbNWa', NULL, 'facilitator', '2026-11-14 03:54:54', '2026-11-14 03:54:54'),
(6, 'Juan Dela Cruz', 'juan@example.com', '$2y$10$gZnTH2dpu7edHyD46FpWc.zu5TORORKGeK7BOtuyDuQR3D/sK6aHS', NULL, 'facilitator', '2026-11-14 08:33:50', '2026-11-14 08:33:50'),
(7, 'Ben Ramos', 'b3n@example.com', '$2y$10$LsS1GnFvs37NDI9HoEXhnu.ddYXdQmih8BFsy9ZFAFmsJMGhRXVEy', NULL, 'facilitator', '2026-11-15 09:14:45', '2026-11-15 09:14:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`device_id`),
  ADD UNIQUE KEY `device_code` (`device_code`),
  ADD KEY `fk_devices_room` (`room_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`);

--
-- Indexes for table `janitors`
--
ALTER TABLE `janitors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `unique_code` (`unique_code`);

--
-- Indexes for table `monitoring_logs`
--
ALTER TABLE `monitoring_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `idx_logs_device_time` (`device_id`,`recorded_at`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `fk_notifications_user` (`user_id`),
  ADD KEY `fk_notifications_device` (`device_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`),
  ADD UNIQUE KEY `uq_room_owner_name` (`user_id`,`room_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `device_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `janitors`
--
ALTER TABLE `janitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `monitoring_logs`
--
ALTER TABLE `monitoring_logs`
  MODIFY `log_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `devices`
--
ALTER TABLE `devices`
  ADD CONSTRAINT `fk_devices_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON UPDATE CASCADE;

--
-- Constraints for table `monitoring_logs`
--
ALTER TABLE `monitoring_logs`
  ADD CONSTRAINT `fk_logs_device` FOREIGN KEY (`device_id`) REFERENCES `devices` (`device_id`) ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notifications_device` FOREIGN KEY (`device_id`) REFERENCES `devices` (`device_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fk_rooms_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
