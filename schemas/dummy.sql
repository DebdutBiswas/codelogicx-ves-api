SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `codelogicxves`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_auth`
--

CREATE TABLE `admin_auth` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `role` tinyint UNSIGNED NOT NULL,
  `reg_by` int UNSIGNED DEFAULT NULL,
  `reg_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin_auth`
--

INSERT INTO `admin_auth` (`id`, `username`, `password`, `name`, `active`, `role`, `reg_by`, `reg_date`) VALUES
(1, 'admin', '$2a$10$Vnnjv7ZEO663ZcT8ad2gFO0ptOhi7ZsYGF16n4i/DmNFy/yfuznVC', 'Super Admin', 1, 1, 1, '2022-02-23 16:51:37'),
(2, 'debdut', '$2a$10$4Vh3lLT7FSQKP8Bmj7.XWOK.eEC1WwqPaCGiKDJbbmxK4UL0hUKJq', 'Debdut', 1, 1, 1, '2022-02-23 20:59:29');

-- --------------------------------------------------------

--
-- Table structure for table `visitor_info`
--

CREATE TABLE `visitor_info` (
  `id` int UNSIGNED NOT NULL,
  `first_name` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(32) NOT NULL,
  `reg_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_met_with` varchar(255) NOT NULL,
  `checkout_count` int UNSIGNED NOT NULL DEFAULT '0',
  `last_checkout_time` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `visitor_info`
--

INSERT INTO `visitor_info` (`id`, `first_name`, `last_name`, `phone`, `reg_date`, `last_met_with`, `checkout_count`, `last_checkout_time`) VALUES
(1, 'Debdut', 'Biswas', '7003153094', '2022-02-23 21:44:32', 'Aparna Sen', 0, '2022-02-23 21:44:32'),
(2, 'Ramesh', 'Das', '7003853094', '2022-02-23 21:45:50', 'Sandip Paul', 0, NULL),
(3, 'Pradyut', 'Paul', '9876037840', '2022-02-23 22:14:28', 'Asit Pal', 1, '2022-02-23 16:14:32'),
(4, 'Gopal', 'Rai', '9856037840', '2022-02-23 22:15:28', 'Asit Pal', 0, '2022-02-23 16:14:32'),
(5, 'Gultu', 'Shill', '9856037840', '2022-02-23 22:44:32', 'Asit Pal', 0, NULL),
(13, 'Roddur', 'Das', '7003413094', '2022-02-24 18:18:24', 'Chandak Biswas', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `visitor_log`
--

CREATE TABLE `visitor_log` (
  `id` int UNSIGNED NOT NULL,
  `visitor_id` int UNSIGNED NOT NULL,
  `meet_with` varchar(255) NOT NULL,
  `checkout_purpose` text NOT NULL,
  `checkout_done` tinyint(1) NOT NULL DEFAULT '0',
  `entry_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `out_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `visitor_log`
--

INSERT INTO `visitor_log` (`id`, `visitor_id`, `meet_with`, `checkout_purpose`, `checkout_done`, `entry_time`, `out_time`) VALUES
(1, 2, 'Ashit Pal', 'To return back borrowed books', 0, '2022-02-23 23:06:44', NULL),
(2, 4, 'Pancham Sarkar', 'Personal cause', 0, '2022-02-23 23:06:44', NULL),
(4, 5, 'Aprna Sen', 'Personal', 1, '2022-02-23 23:05:40', '2022-02-23 23:06:44'),
(5, 4, 'Pranto Sen', 'Personal', 1, '2022-02-23 23:05:40', '2022-02-23 23:06:44'),
(6, 2, 'Subham Das', 'Personal', 1, '2022-02-23 23:05:40', '2022-02-23 23:05:45'),
(14, 2, 'Manik Pal', 'Personal', 1, '2022-02-23 23:05:40', '2022-02-23 23:05:45'),
(28, 13, 'Chandak Biswas', 'Personal', 1, '2022-02-24 23:05:40', NULL),
(29, 4, 'Debdut Biswas', 'Personal', 1, '2022-02-24 23:05:40', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_auth`
--
ALTER TABLE `admin_auth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `visitor_info`
--
ALTER TABLE `visitor_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `visitor_log`
--
ALTER TABLE `visitor_log`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `Id_Attribute_On_visitor_log` (`visitor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_auth`
--
ALTER TABLE `admin_auth`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `visitor_info`
--
ALTER TABLE `visitor_info`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `visitor_log`
--
ALTER TABLE `visitor_log`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `visitor_log`
--
ALTER TABLE `visitor_log`
  ADD CONSTRAINT `Id_Attribute_On_visitor_log` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
