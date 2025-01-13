-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 13 jan. 2025 à 22:59
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `portmeeting`
--

-- --------------------------------------------------------

--
-- Structure de la table `accounts_directionmodels`
--

DROP TABLE IF EXISTS `accounts_directionmodels`;
CREATE TABLE IF NOT EXISTS `accounts_directionmodels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `name` varchar(180) NOT NULL,
  `description` varchar(180) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `accounts_directionmodels`
--

INSERT INTO `accounts_directionmodels` (`id`, `created_at`, `updated_at`, `status`, `name`, `description`, `images`) VALUES
(1, '2025-01-10 21:45:19.298704', '2025-01-10 21:45:19.298704', 1, 'DG', 'Direction Generale', NULL),
(2, '2025-01-11 19:21:35.329385', '2025-01-11 19:21:35.332380', 1, 'DSIN', 'Direction du système de l\'information numérique', NULL),
(3, '2025-01-11 19:22:06.782281', '2025-01-11 19:22:06.782281', 1, 'DL', 'Direction de la logistique', NULL),
(4, '2025-01-11 19:23:04.285010', '2025-01-11 19:23:04.285010', 1, 'DOMSE', 'Direction des Opérations Maritimes, de la Sécurité et de l\'Environnement', NULL),
(5, '2025-01-11 19:23:23.939107', '2025-01-11 19:23:23.939107', 1, 'DCMC', 'Direction Commercial, Marketing et de la Communication', NULL),
(6, '2025-01-11 19:23:43.996252', '2025-01-11 19:23:43.996252', 1, 'DEESP', 'Direction des Etudes Economiques, de la Stratégie et de la Planification', NULL),
(12, '2025-01-13 21:30:55.908920', '2025-01-13 21:30:55.908920', 1, 'DRH', 'Direction des ressources humaines', NULL),
(9, '2025-01-13 21:25:10.274044', '2025-01-13 21:25:10.274044', 1, 'DDP', 'Direction domaine et patrimoine', NULL),
(10, '2025-01-13 21:25:17.513292', '2025-01-13 21:25:17.513292', 1, 'DAAJC', 'Directions juridique et contencieux', NULL),
(11, '2025-01-13 21:25:37.998725', '2025-01-13 21:25:37.998725', 1, 'DFC', 'Direction Finance comptabilite', NULL),
(13, '2025-01-13 21:31:37.323172', '2025-01-13 21:31:37.323172', 1, 'DAGS', 'Direction des achats et stocks', NULL),
(14, '2025-01-13 21:32:08.606082', '2025-01-13 21:32:08.606082', 1, 'TP', 'Direction Terminal à pêche', NULL),
(15, '2025-01-13 21:32:30.149159', '2025-01-13 21:32:30.149159', 1, 'DCAQ', 'Direction Qualité', NULL),
(16, '2025-01-13 21:33:15.039354', '2025-01-13 21:33:15.039354', 1, 'DIMO', 'Direction de l\'ingenierie et maitrise d\'ouvrage', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `accounts_usersmodels`
--

DROP TABLE IF EXISTS `accounts_usersmodels`;
CREATE TABLE IF NOT EXISTS `accounts_usersmodels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `role` varchar(20) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `phone_number` varchar(13) NOT NULL,
  `matricule` varchar(4) NOT NULL,
  `direction_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `accounts_usersmodels_direction_id_ccf8aa8b` (`direction_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `accounts_usersmodels`
--

INSERT INTO `accounts_usersmodels` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `created_at`, `updated_at`, `status`, `role`, `avatar`, `phone_number`, `matricule`, `direction_id`) VALUES
(1, 'pbkdf2_sha256$870000$XA9XbS4G9CDT496EQJteVW$Ekr6PA+g20xi11LfSSfQEMR+R6PhlaNjqH2EBZyGc8g=', NULL, 0, 'abibuali09', '', '', 'abibuali09@gmail.com', 0, 1, '2025-01-10 21:41:55.544007', '2025-01-10 21:41:57.765171', '2025-01-10 21:41:57.765171', 1, 'super_admin', NULL, '0554772283', '0000', NULL),
(2, 'pbkdf2_sha256$870000$mh5doZNDCXx0PMkIh4NqUp$unXezLMLDatdkWNWrwC6FSRQGLSH5MexUs8U0JTi3fk=', NULL, 0, 'user1', '', '', 'user1@gmail.com', 0, 1, '2025-01-10 21:46:30.736791', '2025-01-10 21:46:32.773689', '2025-01-10 21:46:32.773689', 1, 'employe', NULL, '123456789', '1010', 1);

-- --------------------------------------------------------

--
-- Structure de la table `accounts_usersmodels_groups`
--

DROP TABLE IF EXISTS `accounts_usersmodels_groups`;
CREATE TABLE IF NOT EXISTS `accounts_usersmodels_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usersmodels_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_usersmodels_gro_usersmodels_id_group_id_61a86dde_uniq` (`usersmodels_id`,`group_id`),
  KEY `accounts_usersmodels_groups_usersmodels_id_83d14ddc` (`usersmodels_id`),
  KEY `accounts_usersmodels_groups_group_id_dacc4710` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `accounts_usersmodels_user_permissions`
--

DROP TABLE IF EXISTS `accounts_usersmodels_user_permissions`;
CREATE TABLE IF NOT EXISTS `accounts_usersmodels_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usersmodels_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_usersmodels_use_usersmodels_id_permissio_70adf481_uniq` (`usersmodels_id`,`permission_id`),
  KEY `accounts_usersmodels_user_permissions_usersmodels_id_3406a2c9` (`usersmodels_id`),
  KEY `accounts_usersmodels_user_permissions_permission_id_c4756d55` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_group_id_b120cbf9` (`group_id`),
  KEY `auth_group_permissions_permission_id_84c5c92e` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  KEY `auth_permission_content_type_id_2f476e4b` (`content_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add direction models', 6, 'add_directionmodels'),
(22, 'Can change direction models', 6, 'change_directionmodels'),
(23, 'Can delete direction models', 6, 'delete_directionmodels'),
(24, 'Can view direction models', 6, 'view_directionmodels'),
(25, 'Can add users models', 7, 'add_usersmodels'),
(26, 'Can change users models', 7, 'change_usersmodels'),
(27, 'Can delete users models', 7, 'delete_usersmodels'),
(28, 'Can view users models', 7, 'view_usersmodels'),
(29, 'Can add booking rooms models', 8, 'add_bookingroomsmodels'),
(30, 'Can change booking rooms models', 8, 'change_bookingroomsmodels'),
(31, 'Can delete booking rooms models', 8, 'delete_bookingroomsmodels'),
(32, 'Can view booking rooms models', 8, 'view_bookingroomsmodels'),
(33, 'Can add notification models', 9, 'add_notificationmodels'),
(34, 'Can change notification models', 9, 'change_notificationmodels'),
(35, 'Can delete notification models', 9, 'delete_notificationmodels'),
(36, 'Can view notification models', 9, 'view_notificationmodels'),
(37, 'Can add plage horaire models', 10, 'add_plagehorairemodels'),
(38, 'Can change plage horaire models', 10, 'change_plagehorairemodels'),
(39, 'Can delete plage horaire models', 10, 'delete_plagehorairemodels'),
(40, 'Can view plage horaire models', 10, 'view_plagehorairemodels'),
(41, 'Can add equipement models', 11, 'add_equipementmodels'),
(42, 'Can change equipement models', 11, 'change_equipementmodels'),
(43, 'Can delete equipement models', 11, 'delete_equipementmodels'),
(44, 'Can view equipement models', 11, 'view_equipementmodels'),
(45, 'Can add rooms models', 12, 'add_roomsmodels'),
(46, 'Can change rooms models', 12, 'change_roomsmodels'),
(47, 'Can delete rooms models', 12, 'delete_roomsmodels'),
(48, 'Can view rooms models', 12, 'view_roomsmodels'),
(49, 'Can add picture room models', 13, 'add_pictureroommodels'),
(50, 'Can change picture room models', 13, 'change_pictureroommodels'),
(51, 'Can delete picture room models', 13, 'delete_pictureroommodels'),
(52, 'Can view picture room models', 13, 'view_pictureroommodels');

-- --------------------------------------------------------

--
-- Structure de la table `bookings_bookingroomsmodels`
--

DROP TABLE IF EXISTS `bookings_bookingroomsmodels`;
CREATE TABLE IF NOT EXISTS `bookings_bookingroomsmodels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `name` varchar(180) NOT NULL,
  `date` date NOT NULL,
  `heure_debut` time(6) NOT NULL,
  `heure_fin` time(6) NOT NULL,
  `etat` varchar(20) NOT NULL,
  `salle_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_booking_constraint` (`salle_id`,`date`,`heure_debut`,`heure_fin`),
  KEY `bookings_bookingroomsmodels_salle_id_d689927c` (`salle_id`),
  KEY `bookings_bookingroomsmodels_user_id_f3d8d2bf` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `bookings_bookingroomsmodels`
--

INSERT INTO `bookings_bookingroomsmodels` (`id`, `created_at`, `updated_at`, `status`, `name`, `date`, `heure_debut`, `heure_fin`, `etat`, `salle_id`, `user_id`) VALUES
(1, '2025-01-13 18:12:55.558456', '2025-01-13 18:12:55.558456', 1, '', '2025-01-13', '08:00:00.000000', '10:00:00.000000', 'en_attente', 1, 1),
(2, '2025-01-13 18:14:57.624122', '2025-01-13 18:14:57.624122', 1, '', '2025-01-13', '11:00:00.000000', '14:00:00.000000', 'validee', 1, 1),
(3, '2025-01-13 18:12:55.558456', '2025-01-13 18:12:55.558456', 1, '', '2025-01-13', '20:00:00.000000', '21:00:00.000000', 'validee', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `bookings_bookingroomsmodels_equipements_specifiques`
--

DROP TABLE IF EXISTS `bookings_bookingroomsmodels_equipements_specifiques`;
CREATE TABLE IF NOT EXISTS `bookings_bookingroomsmodels_equipements_specifiques` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bookingroomsmodels_id` bigint NOT NULL,
  `equipementmodels_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookings_bookingroomsmod_bookingroomsmodels_id_eq_178333f8_uniq` (`bookingroomsmodels_id`,`equipementmodels_id`),
  KEY `bookings_bookingroomsmodels_bookingroomsmodels_id_21e44aaa` (`bookingroomsmodels_id`),
  KEY `bookings_bookingroomsmodels_equipementmodels_id_bd63d040` (`equipementmodels_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `bookings_bookingroomsmodels_equipements_specifiques`
--

INSERT INTO `bookings_bookingroomsmodels_equipements_specifiques` (`id`, `bookingroomsmodels_id`, `equipementmodels_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 2, 1),
(7, 2, 2),
(8, 2, 3),
(9, 2, 4),
(10, 2, 5);

-- --------------------------------------------------------

--
-- Structure de la table `bookings_notificationmodels`
--

DROP TABLE IF EXISTS `bookings_notificationmodels`;
CREATE TABLE IF NOT EXISTS `bookings_notificationmodels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `message` longtext NOT NULL,
  `date_envoi` datetime(6) NOT NULL,
  `etat` varchar(20) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bookings_notificationmodels_user_id_c6724671` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bookings_plagehorairemodels`
--

DROP TABLE IF EXISTS `bookings_plagehorairemodels`;
CREATE TABLE IF NOT EXISTS `bookings_plagehorairemodels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `heure_debut` varchar(5) NOT NULL,
  `heure_fin` varchar(5) NOT NULL,
  `salle_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bookings_plagehorairemodels_salle_id_672cca30` (`salle_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `bookings_plagehorairemodels`
--

INSERT INTO `bookings_plagehorairemodels` (`id`, `heure_debut`, `heure_fin`, `salle_id`) VALUES
(7, '08:00', '09:00', 1),
(8, '10:00', '11:00', 1),
(9, '12:00', '13:00', 1),
(10, '14:00', '15:00', 1),
(11, '16:00', '17:00', 1),
(12, '18:00', '19:00', 1),
(13, '20:00', '21:00', 1),
(14, '22:00', '23:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6` (`user_id`)
) ;

-- --------------------------------------------------------

--
-- Structure de la table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(2, 'auth', 'permission'),
(3, 'auth', 'group'),
(4, 'contenttypes', 'contenttype'),
(5, 'sessions', 'session'),
(6, 'accounts', 'directionmodels'),
(7, 'accounts', 'usersmodels'),
(8, 'bookings', 'bookingroomsmodels'),
(9, 'bookings', 'notificationmodels'),
(10, 'bookings', 'plagehorairemodels'),
(11, 'rooms', 'equipementmodels'),
(12, 'rooms', 'roomsmodels'),
(13, 'rooms', 'pictureroommodels');

-- --------------------------------------------------------

--
-- Structure de la table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-01-10 21:27:12.819799'),
(2, 'contenttypes', '0002_remove_content_type_name', '2025-01-10 21:27:12.937920'),
(3, 'auth', '0001_initial', '2025-01-10 21:27:13.409111'),
(4, 'auth', '0002_alter_permission_name_max_length', '2025-01-10 21:27:13.480697'),
(5, 'auth', '0003_alter_user_email_max_length', '2025-01-10 21:27:13.491700'),
(6, 'auth', '0004_alter_user_username_opts', '2025-01-10 21:27:13.504257'),
(7, 'auth', '0005_alter_user_last_login_null', '2025-01-10 21:27:13.509948'),
(8, 'auth', '0006_require_contenttypes_0002', '2025-01-10 21:27:13.511949'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2025-01-10 21:27:13.520948'),
(10, 'auth', '0008_alter_user_username_max_length', '2025-01-10 21:27:13.529948'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2025-01-10 21:27:13.543268'),
(12, 'auth', '0010_alter_group_name_max_length', '2025-01-10 21:27:13.625127'),
(13, 'auth', '0011_update_proxy_permissions', '2025-01-10 21:27:13.638731'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2025-01-10 21:27:13.647740'),
(15, 'accounts', '0001_initial', '2025-01-10 21:27:14.281706'),
(16, 'accounts', '0002_alter_usersmodels_avatar', '2025-01-10 21:27:14.374611'),
(17, 'accounts', '0003_alter_directionmodels_options', '2025-01-10 21:27:14.382470'),
(18, 'admin', '0001_initial', '2025-01-10 21:27:14.708874'),
(19, 'admin', '0002_logentry_remove_auto_add', '2025-01-10 21:27:14.723658'),
(20, 'admin', '0003_logentry_add_action_flag_choices', '2025-01-10 21:27:14.737200'),
(21, 'rooms', '0001_initial', '2025-01-10 21:27:14.982725'),
(22, 'rooms', '0002_alter_roomsmodels_image', '2025-01-10 21:27:15.094379'),
(23, 'rooms', '0003_roomsmodels_equipment', '2025-01-10 21:27:15.383945'),
(24, 'bookings', '0001_initial', '2025-01-10 21:27:16.012238'),
(25, 'bookings', '0002_plagehorairemodels', '2025-01-10 21:27:16.162214'),
(26, 'sessions', '0001_initial', '2025-01-10 21:27:16.240908'),
(27, 'bookings', '0003_alter_bookingroomsmodels_options_and_more', '2025-01-11 16:50:53.200744'),
(28, 'bookings', '0004_alter_plagehorairemodels_heure_debut_and_more', '2025-01-11 16:50:53.746542'),
(29, 'bookings', '0005_bookingroomsmodels_direction', '2025-01-12 16:48:15.838638'),
(30, 'bookings', '0006_remove_bookingroomsmodels_direction', '2025-01-12 16:48:16.100689'),
(31, 'rooms', '0004_alter_roomsmodels_direction_and_more', '2025-01-12 16:48:16.197625'),
(32, 'accounts', '0004_directionmodels_avatar', '2025-01-12 20:51:55.976789'),
(33, 'accounts', '0005_remove_directionmodels_avatar_directionmodels_images', '2025-01-12 20:51:56.184795'),
(34, 'rooms', '0005_pictureroommodels', '2025-01-12 20:51:56.416801'),
(35, 'rooms', '0006_remove_roomsmodels_image', '2025-01-12 20:51:56.553790');

-- --------------------------------------------------------

--
-- Structure de la table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rooms_equipementmodels`
--

DROP TABLE IF EXISTS `rooms_equipementmodels`;
CREATE TABLE IF NOT EXISTS `rooms_equipementmodels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `name` varchar(180) NOT NULL,
  `etat` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `rooms_equipementmodels`
--

INSERT INTO `rooms_equipementmodels` (`id`, `created_at`, `updated_at`, `status`, `name`, `etat`) VALUES
(1, '2025-01-10 22:03:09.422179', '2025-01-10 22:03:09.422179', 1, 'micro', 'disponible'),
(2, '2025-01-10 22:03:19.626802', '2025-01-10 22:03:19.626802', 1, 'tablette', 'disponible'),
(3, '2025-01-10 22:03:39.139966', '2025-01-10 22:03:39.139966', 1, 'projecteur', 'disponible'),
(4, '2025-01-10 22:03:43.304771', '2025-01-10 22:03:43.304771', 1, 'wifi', 'disponible'),
(5, '2025-01-10 22:04:03.617004', '2025-01-10 22:04:03.617066', 1, 'écran intéractif', 'disponible');

-- --------------------------------------------------------

--
-- Structure de la table `rooms_pictureroommodels`
--

DROP TABLE IF EXISTS `rooms_pictureroommodels`;
CREATE TABLE IF NOT EXISTS `rooms_pictureroommodels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` longtext,
  `salle_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rooms_pictureroommodels_salle_id_48927b1f` (`salle_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rooms_roomsmodels`
--

DROP TABLE IF EXISTS `rooms_roomsmodels`;
CREATE TABLE IF NOT EXISTS `rooms_roomsmodels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `name` varchar(180) NOT NULL,
  `capacite` int UNSIGNED NOT NULL,
  `localisation` varchar(200) NOT NULL,
  `direction_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rooms_roomsmodels_direction_id_c8c1e934` (`direction_id`)
) ;

--
-- Déchargement des données de la table `rooms_roomsmodels`
--

INSERT INTO `rooms_roomsmodels` (`id`, `created_at`, `updated_at`, `status`, `name`, `capacite`, `localisation`, `direction_id`) VALUES
(1, '2025-01-10 21:51:33.465564', '2025-01-13 17:56:24.296593', 1, 'Salle de reunion DG', 5, 'Nouvelle Direction 5 ieme etage', 1),
(2, '2025-01-11 19:30:58.651158', '2025-01-11 19:30:58.651158', 1, 'Salle de réunion DG 2', 5, 'Nouvelle direction 6 ieme étage', 1);

-- --------------------------------------------------------

--
-- Structure de la table `rooms_roomsmodels_equipment`
--

DROP TABLE IF EXISTS `rooms_roomsmodels_equipment`;
CREATE TABLE IF NOT EXISTS `rooms_roomsmodels_equipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `roomsmodels_id` bigint NOT NULL,
  `equipementmodels_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rooms_roomsmodels_equipm_roomsmodels_id_equipemen_e3480934_uniq` (`roomsmodels_id`,`equipementmodels_id`),
  KEY `rooms_roomsmodels_equipment_roomsmodels_id_59189c5f` (`roomsmodels_id`),
  KEY `rooms_roomsmodels_equipment_equipementmodels_id_dcc93a18` (`equipementmodels_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `rooms_roomsmodels_equipment`
--

INSERT INTO `rooms_roomsmodels_equipment` (`id`, `roomsmodels_id`, `equipementmodels_id`) VALUES
(15, 1, 5),
(14, 1, 4),
(13, 1, 3),
(12, 1, 2),
(11, 1, 1),
(6, 2, 1),
(7, 2, 2),
(8, 2, 3),
(9, 2, 4),
(10, 2, 5);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
