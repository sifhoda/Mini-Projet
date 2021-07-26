-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 26 juil. 2021 à 09:26
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

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id_event`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
