-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version 8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (9,'Miami Pic 1','Miami pic 1','public/images/uploads/37bf6fc319c3d70c44f115237de0343a313457def2e8.jpeg','public/images/uploads/thumbnail-37bf6fc319c3d70c44f115237de0343a313457def2e8.jpeg',0,'2020-12-17 19:13:26',55),(10,'Miami pic 2','Miami pic 2','public/images/uploads/644910b4a4a60519a4ff00e6654a56df9c928277a098.jpeg','public/images/uploads/thumbnail-644910b4a4a60519a4ff00e6654a56df9c928277a098.jpeg',0,'2020-12-17 19:13:58',55),(11,'miami pic 3','miami pic 3','public/images/uploads/8a04e49fcb526b87cc35dab10b8eb789e17ced6d4ae0.jpeg','public/images/uploads/thumbnail-8a04e49fcb526b87cc35dab10b8eb789e17ced6d4ae0.jpeg',0,'2020-12-17 19:15:31',55),(12,'miami pic 4','miami pic 4','public/images/uploads/1f2cce09d89b3f133f6a3a41c4a695b3aad563b09be0.jpeg','public/images/uploads/thumbnail-1f2cce09d89b3f133f6a3a41c4a695b3aad563b09be0.jpeg',0,'2020-12-17 19:15:59',55),(13,'miami pic 5','miami pic 5','public/images/uploads/7ba0d19aeed65518fda6229951766d2f06ae321dad0f.jpeg','public/images/uploads/thumbnail-7ba0d19aeed65518fda6229951766d2f06ae321dad0f.jpeg',0,'2020-12-17 19:17:29',55);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('LjCQxt3mdfOpoH8OITE9ExRc5tvY4jUQ',1608440541,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('O8XGrNYW2QwxWg8f-TE9Bptq5geGDLFs',1608595810,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (55,'testuser1','testuser1@gmail.com','$2b$15$iPAfdRynQtblDKNtM5OcweF6YRIWWQqkaeYTiUs2U/BFqkpt392ky',0,0,'2020-12-04 20:41:40'),(56,'testuser2','testuser2@gmail.com','$2b$15$iCvaL.WoThnU279DnmCDMO1DFBLFY598Np9vwZB8ExVU9BROJdYuS',0,0,'2020-12-05 20:25:05'),(57,'testuser4','testuser4@gmail.com','$2b$15$b1.de/7uIWVv8GiVMAtkueknbequbIN9KnJ00oLSVVRhYMVrUAfna',0,0,'2020-12-16 16:51:05'),(61,'testuser3','testuser5@gmail.com','$2b$15$v5vb4yyHTWpauU8zpSAc7ezDyYgtaBMZEmfzPa1tQNHW9dpGgYtcO',0,0,'2020-12-18 14:37:50'),(62,'testuser10','testuser10@gmail.com','$2b$15$GL5itq8jLwWLyaJh0QZ7le6Ty/RNCqtcNaRTf6XkIJlzA0Fo/lB6m',0,0,'2020-12-18 14:53:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-23 19:31:43