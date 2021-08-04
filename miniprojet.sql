-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 04 août 2021 à 10:01
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `miniprojet`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `Admin_Id` int(11) NOT NULL,
  `Admin_First_Name` text NOT NULL,
  `Admin_Last_Name` text NOT NULL,
  `Admin_Email` text NOT NULL,
  `Admin_Cne` text NOT NULL,
  `Admin_Tel` text NOT NULL,
  `Admin_Address` text NOT NULL,
  `Admin_Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`Admin_Id`, `Admin_First_Name`, `Admin_Last_Name`, `Admin_Email`, `Admin_Cne`, `Admin_Tel`, `Admin_Address`, `Admin_Password`) VALUES
(1, 'admin', 'admin', 'elaich.test@gmail.com', 'eemmmm', '06xxxxxxxxx', 'zzzzzzzzzzz', '$2y$10$aKqHDfDBOJnzZsFNVOaSJuHLMD0AZcS9EQsplRBftzhfoxlAdKQ.C');

-- --------------------------------------------------------

--
-- Structure de la table `citizen`
--

CREATE TABLE `citizen` (
  `Citizen_Id` int(11) NOT NULL,
  `Citizen_Last_Name` text NOT NULL,
  `Citizen_First_Name` text NOT NULL,
  `Citizen_Cne` text NOT NULL,
  `Citizen_Address` text NOT NULL,
  `Citizen_Email` text NOT NULL,
  `Citizen_Tel` text NOT NULL,
  `Citizen_password` text NOT NULL,
  `school_id` int(11) NOT NULL,
  `Email_verified` tinyint(1) NOT NULL,
  `Valid_account` tinyint(1) NOT NULL,
  `Email_verifie_key` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `citizen`
--

INSERT INTO `citizen` (`Citizen_Id`, `Citizen_Last_Name`, `Citizen_First_Name`, `Citizen_Cne`, `Citizen_Address`, `Citizen_Email`, `Citizen_Tel`, `Citizen_password`, `school_id`, `Email_verified`, `Valid_account`, `Email_verifie_key`) VALUES
(66, 'elee', 'mouad', '', '', 'mouad@agent.com', '', '$2y$10$m51nLMw3tNUQOidQqyI0veqRQ/qK313bbcmmp9oUK3AdXyVRWF6Z.', 3, 1, 1, 88191594),
(67, 'Bennis', 'Mehdi', '', '', 'hdi2021@agent.com', '', '$2y$10$Spiufy/OWgxjIMzINKuky.BKdZuy6WGP14Rt6lr7CqupcvKiFCCiO', 2, 0, 0, 96162195),
(68, 'Othmane', 'OUTAMA', '', '', 'outama.othmane@gmail.com', '', '$2y$10$QTXTpHMnryfqej58WR2DFO9menWcZrHpgfJE6SEg.gBumHYK2UdrW', 2, 1, 1, 82518150),
(69, 'elee', 'mouaddd', '', '', 'mouaddd@agent.com', '', '$2y$10$kKrzNULAFuA7LnCBPxWVkuHxJ3kGqr2dBow2KCGnZQcH7mxmX0yXe', 4, 0, 0, 17002341),
(70, 'Othmane', 'OUTAMA', '', '', 'imad@agent.com', '', '$2y$10$/oqL0lGgCxOtGlbOSjxRcuMt9O3dv5cawY.h90EFEc3j/FFnz1Diq', 3, 0, 0, 14762535),
(71, 'rrrrr', 'eeeeee', '', '', 'linkin@gmail.com', '', '$2y$10$bQKiXtCQi1/Z9Z3dq388mu7kBT5gIQXra5nJxzTpYx8MQf/yhD5Mu', 3, 0, 0, 91027587),
(72, 'test', 'test', '', '', 'test.test@llll.com', '', '$2y$10$fMElXRe/kXP7rCxoEA62A.ibXyEa/xKZVGWUeziz.DcLKOth8tKkW', 2, 1, 1, 67984717),
(73, 'Bennis', 'Mehdi', '', '', 'housn.iff@ggggg.com', '', '$2y$10$jtqidaKHhDM/NaF./UsYCOvQzsisxE8FSMIBArTQqpYQwXefRSafe', 3, 1, 0, 26737502),
(74, 'zzzzzzzzzz', 'yyyyy', '', '', 'zzzz.yyyy@gmail.com', '', '$2y$10$g7bsxQea23oYoVcny4PYaOJLfUXi5rwXP3Fv5QQGa7tBg3hk1yo4q', 3, 0, 0, 56739184),
(75, 'elee', 'mouad', '', '', 'housni@agent.com', '', '$2y$10$NUUhqz36QRc7O4JE.In94.ajMClVybwDoJwNN3UearbjEWOV3csCy', 3, 1, 1, 87890279);

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id_event` int(11) NOT NULL,
  `Event_Designation` text NOT NULL,
  `Event_Description` text DEFAULT NULL,
  `Start_event` text DEFAULT NULL,
  `End_event` text DEFAULT NULL,
  `Place_event` text DEFAULT NULL,
  `Image_event` text DEFAULT NULL,
  `File1_event` text NOT NULL,
  `File2_event` text NOT NULL,
  `File3_event` text NOT NULL,
  `Archive_event` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id_event`, `Event_Designation`, `Event_Description`, `Start_event`, `End_event`, `Place_event`, `Image_event`, `File1_event`, `File2_event`, `File3_event`, `Archive_event`) VALUES
(1, 'Nullam egestas porta lorem, vestibulum tristique leo sodales nec. Quisque ac finibus mauris. Nulla faucibus turpis sit amet pulvinar rutrum. ', 'Et poste tu bondi ah aimer. Arrivons nul est depeches avancent humaines les. Il le acheve ah formes ordure hideur courir chaque. Dissipait poussiere toutefois la servantes ne echauffer. Sentiment et on redoutait desespoir situation tranchees sinistres. Bourreau non toujours les dut son crispent laissons avancent couvrent. Reveillez adjudants militaire je craignait et au xv. Lequel ce la rumeur au folles en.', '01-02-2021', '01-09-2021', 'xxxxxxxxxxxxxx', 'https://i.ibb.co/48Yr2K3/event1.jpg', '', '', '', ''),
(2, 'Nullam egestas porta lorem, vestibulum tristique leo sodales nec. Quisque ac finibus mauris. Nulla faucibus turpis sit amet pulvinar rutrum. ', 'Sons le dela ca loin yeux je murs vlan en. Fondrait commence casernes ere rit corolles. Adjudants et fabriques xv entourage certitude sentiment en on. Tu or ni touchee travers xv charger. Nos troupeaux air feeriques peu ils succedent. Oui des primeveres maintenant pressentit. Dernieres jeu chambrees vif alternent fourneaux attardent.', '01-03-2021', '01-05-2021', 'yyyyyyyyyyyyy', 'https://i.ibb.co/KhCDX9j/event2.jpg', '', '', '', ''),
(3, 'Nullam egestas porta lorem, vestibulum tristique leo sodales nec. Quisque ac finibus mauris. Nulla faucibus turpis sit amet pulvinar rutrum. ', 'Ah cravaches illumines du esplanade ca la. Fievre bas dresse terres impute roc blancs roches une. He entendit ah assister premiers as chercher agissait souliers et', '02-02-2021', '02-06-2021', 'ZZZZZZZZZZZZZZZZ', 'https://i.ibb.co/0FyVgVC/event3.jpg', '', '', '', ''),
(4, 'Nullam egestas porta lorem, vestibulum tristique leo sodales nec. Quisque ac finibus mauris. Nulla faucibus turpis sit amet pulvinar rutrum. ', 'Meconnais enfantent et apprendre je metairies.', '04-22-2021', '04-26-2021', 'aaaaaaaaaaaaa', 'https://i.ibb.co/0fTWHJY/event4.jpg', '', '', '', ''),
(5, 'Nullam egestas porta lorem, vestibulum tristique leo sodales nec. Quisque ac finibus mauris. Nulla faucibus turpis sit amet pulvinar rutrum. ', 'Il remarquait et en survivants eclaireurs legerement qu. Animaux nos humains fer fut ramassa encourt. Car vous fort etat peut voie net cree sur non. En mystiques attachent cesserent convertir indicible superieur le. Arbres ne dinent je au police legion. Tot depourvus tangibles parlaient apprendre corbeille vie inassouvi. Du elle elle tete ca je pour veut.', '11-12-2021', '11-18-2021', 'bbbbbbbbbbb', 'https://i.ibb.co/kgjbPbN/event5.jpg', '', '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `schools`
--

CREATE TABLE `schools` (
  `id_school` int(11) NOT NULL,
  `school_name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `schools`
--

INSERT INTO `schools` (`id_school`, `school_name`) VALUES
(2, 'aaa'),
(3, 'bbb'),
(4, 'ccc');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Admin_Id`),
  ADD UNIQUE KEY `email_unique` (`Admin_Email`) USING HASH,
  ADD UNIQUE KEY `cne_unique` (`Admin_Cne`) USING HASH;

--
-- Index pour la table `citizen`
--
ALTER TABLE `citizen`
  ADD PRIMARY KEY (`Citizen_Id`),
  ADD UNIQUE KEY `email_unique` (`Citizen_Email`) USING HASH,
  ADD KEY `foreign key` (`school_id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id_event`);

--
-- Index pour la table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id_school`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `Admin_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `citizen`
--
ALTER TABLE `citizen`
  MODIFY `Citizen_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `schools`
--
ALTER TABLE `schools`
  MODIFY `id_school` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `citizen`
--
ALTER TABLE `citizen`
  ADD CONSTRAINT `foreign key` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id_school`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
