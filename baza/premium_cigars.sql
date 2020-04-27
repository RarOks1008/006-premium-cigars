-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2019 at 09:16 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `premium_cigars`
--

-- --------------------------------------------------------

--
-- Table structure for table `cigars`
--

CREATE TABLE `cigars` (
  `ID` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cigars`
--

INSERT INTO `cigars` (`ID`, `title`, `image`, `price`) VALUES
(1, 'Bolivar Limited Edition 2018 Soberanos Cigar - 1s', '../assets/images/cigars/cigar_1.jpg', 33.66),
(2, 'Montecristo Double Edmundo Cigar - 1s', '../assets/images/cigars/cigar_2.jpg', 29.57),
(3, 'La Flor De Cano Gran Cano Cigar (Regional Edition - 2013) - 1s', '../assets/images/cigars/cigar_3.jpg', 21.1),
(4, 'COHIBA BEHIKE 56', '../assets/images/cigars/cigar_4.jpg', 140),
(5, 'Trinidad Fundadores - 1s', '../assets/images/cigars/cigar_5.jpg', 32.54),
(6, 'San Cristobal El Morro - 1s', '../assets/images/cigars/cigar_6.jpg', 26.04),
(7, 'Sancho Panza Sanchos - 1s', '../assets/images/cigars/cigar_7.jpg', 37.91),
(8, 'Romeo y Julieta Belicosos - 1s', '../assets/images/cigars/cigar_8.jpg', 23.19),
(9, 'Quintero Favoritas - 1s', '../assets/images/cigars/cigar_9.jpg', 13.5),
(10, 'Quintero Petit Quintero Cigar - 1s', '../assets/images/cigars/cigar_10.jpg', 7.29),
(11, 'Por Larranaga Picadores Cigar - 1s', '../assets/images/cigars/cigar_11.jpg', 19.47),
(12, 'Partagas Presidentes Cigar - 1s', '../assets/images/cigars/cigar_12.jpg', 21.27),
(13, 'Partagas Serie D No.4 - 1s', '../assets/images/cigars/cigar_13.jpg', 21.07),
(14, 'Montecristo Dantes Cigar (Limited Edition 2016) - 1s', '../assets/images/cigars/cigar_14.jpg', 30.6),
(15, 'Montecristo Linea 1935 Dumas Cigar - 1s', '../assets/images/cigars/cigar_15.jpg', 24.79),
(16, 'Cuaba Divinos - 1s', '../assets/images/cigars/cigar_16.jpg', 11.44),
(17, 'Cuaba Exclusivos - 1s', '../assets/images/cigars/cigar_17.jpg', 19.96),
(18, 'Cuaba Tradicionales - 1s', '../assets/images/cigars/cigar_18.jpg', 13.83),
(19, 'Cohiba Esplendidos - Single', '../assets/images/cigars/cigar_19.jpg', 47.98),
(20, 'Cohiba Maduro 5 Genios - Single', '../assets/images/cigars/cigar_20.jpg', 42.4),
(21, 'Cohiba Maduro 5 Magicos - Single NEW', '../assets/images/cigars/cigar_21.gif', 36.32);

-- --------------------------------------------------------

--
-- Table structure for table `facts`
--

CREATE TABLE `facts` (
  `ID` int(11) NOT NULL,
  `fact_text` varchar(400) COLLATE utf8_unicode_ci NOT NULL,
  `title` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `facts`
--

INSERT INTO `facts` (`ID`, `fact_text`, `title`) VALUES
(1, 'Former President Ulysses S. Grant was known for his cigar habit. He smoked 7 to 10 cigars every day. While some of these cigars were chewed on instead of smoked, Grant was a true cigar aficionado. When a reporter wrote about his love of cigars, the American people sent him over 20,000 cigars as a gift. This may be part of the reason why he ended up developing throat cancer later in life.', 'Ulysses S. Grant Loved Cigars'),
(2, 'With trade opening up with Cuba, Americans can now bring back up to $100 of tobacco or alcohol from the communist nation. Unfortunately, $100 does not buy very many good cigars. A high-quality Uppman or Cohibas cigar will set you back at least $25 each, so you would only be able to bring back four of them at most.', 'You Can Get Cigars from Cuba, But Not That Many'),
(3, 'While Cuban cigars have been known as the best cigar for years, this is not the case anymore. In a recent survey by the University of Miami, Latin American smokers listed Honduras, Nicaragua and the Dominican Republic as the best cigar to smoke. Cuban cigars are still excellent, but these other nations have made great strides to produce a better quality of product.', 'Honduras, Nicaragua and the Dominican Republic Have the Best'),
(4, 'Churchill knew that smoking a cigar could project a powerful image. While he often smoked Cuban cigars, he was a fan of cheaper American cigars like Longfellow and Royal Derby. In 1940, the President of Cuba gave Churchill a gift of 2,400 cigars. With the state of diplomacy at the time, each cigar had to be tested for poison before Churchill was allowed to smoke it.', 'Winston Churchill Loved Cigars'),
(5, 'While Groucho Marx was known for carrying a Cuban cigar in his mouth while acting, it was normally unlit. Marx did not want to smoke all day while making the film. Plus, the director would have to try to match the cigars length in future takes if it had been smoked. For Marx and his directors, it was just easier to use an unlit cigar.', 'Groucho Marx Rarely Lit His Cigars'),
(6, 'In the 1960s, researchers and public health officials once said that cigars were less likely to cause cancer than cigarettes. Because of this, many cigarette smokers switched over to cigars. Unfortunately, the studies conducted to show this were deeply flawed. In reality, regular cigar smoking increases the chance of getting cancers of the oral cavity, lung, larynx and esophagus.', 'Cigars Still Cause Cancer'),
(7, 'According to Pine Cigars, Cuban cigar factories were known for having readers who read aloud for the workers in the factory. Today, this tradition continues. While many readers focus on the official press, popular fiction and radio-novelas are also used.', 'Cigar Companies Still Have Readers'),
(8, 'If you are worried about getting a fake Cuban cigar, all you need to do is check the packaging. Handmade Cuban cigars are marked with the phrase, <Totalmente a Mano>. The package should always say <Habanos S.A., Hecho En Cuba>. Below this, there should be a code for the cigars factory and the date when the cigars were packed. If the product is counterfeit, it will be missing one of these phrases ', 'You Can Easily Check for Fakes'),
(9, 'It seems odd for an island that is known for cigars to have a leader who abstains. Fidel Castro used to love Cohibas cigars, and he handed them out to foreign visitors. Originally, these cigars were made by a soldier of Castros who once worked as a cigarmaker. Castro loved the flavor and reserved them for personal use. Before long, he was sharing the Cohibas cigars with friends, foreign visitors..', 'Fidel Castro Quit Smoking');

-- --------------------------------------------------------

--
-- Table structure for table `navigation`
--

CREATE TABLE `navigation` (
  `ID` int(11) NOT NULL,
  `link` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(15) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `navigation`
--

INSERT INTO `navigation` (`ID`, `link`, `title`) VALUES
(1, 'main.php', 'Main'),
(2, 'collection.php', 'Collection'),
(3, 'about.php', 'About'),
(4, 'admin.php', 'Admin Panel'),
(5, 'contact.php', 'Contact');

-- --------------------------------------------------------

--
-- Table structure for table `socials`
--

CREATE TABLE `socials` (
  `ID` int(11) NOT NULL,
  `link` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `socials`
--

INSERT INTO `socials` (`ID`, `link`, `class`) VALUES
(2, 'https://www.facebook.com/groups/133217443853219/permalink/144719669369663/', 'fab fa-facebook'),
(4, 'https://twitter.com/raroks1008en', 'fab fa-twitter-square'),
(5, 'https://www.linkedin.com/in/raroks-entertainment-698399143/', 'fab fa-linkedin'),
(6, 'https://plus.google.com/u/0/112765633989100563682', 'fab fa-google-plus-square'),
(7, '../documentation/documentation.pdf', 'far fa-file-pdf');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `DateOfBirth` date NOT NULL,
  `Rights_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Username`, `Password`, `Email`, `DateOfBirth`, `Rights_ID`) VALUES
(1, 'raroks', 'nikolasifre96', 'nikola.nini@gmail.com', '1996-05-06', 1),
(2, 'korisnik', 'user123', 'korisnik123@gmail.com', '1980-05-27', 2),
(3, 'dete', 'minor123', 'dete123@gmail.com', '2005-10-25', 3),
(4, 'jelenap', 'malaplava', 'jeca.pocandi@gmail.com', '1996-09-09', 2),
(5, 'admin', 'nikola123', 'nekimail@gmail.com', '1997-02-28', 2),
(6, 'blyat', 'jjgoigfsa', 'gsaio@gis.gs', '1987-07-17', 2),
(7, 'neko', 'niko', 'niko@gmailc.om', '2019-03-05', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_rights`
--

CREATE TABLE `user_rights` (
  `ID` int(11) NOT NULL,
  `DoRights` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_rights`
--

INSERT INTO `user_rights` (`ID`, `DoRights`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'minor');

-- --------------------------------------------------------

--
-- Table structure for table `voting`
--

CREATE TABLE `voting` (
  `ID` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cigar` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `reccomend` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `voting`
--

INSERT INTO `voting` (`ID`, `user_id`, `cigar`, `reccomend`) VALUES
(6, 1, 'Cohiba Esplendidos - Single', 1),
(7, 2, 'Cohiba Esplendidos - Single', 0),
(8, 5, 'Cuaba Divinos - 1s', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cigars`
--
ALTER TABLE `cigars`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `facts`
--
ALTER TABLE `facts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `navigation`
--
ALTER TABLE `navigation`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `socials`
--
ALTER TABLE `socials`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `user_rights`
--
ALTER TABLE `user_rights`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `voting`
--
ALTER TABLE `voting`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cigars`
--
ALTER TABLE `cigars`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `facts`
--
ALTER TABLE `facts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `navigation`
--
ALTER TABLE `navigation`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `socials`
--
ALTER TABLE `socials`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_rights`
--
ALTER TABLE `user_rights`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `voting`
--
ALTER TABLE `voting`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
