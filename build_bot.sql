-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: build_bot
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_ru` varchar(255) NOT NULL,
  `name_uz` varchar(255) NOT NULL,
  `description_uz` text NOT NULL,
  `description_ru` text NOT NULL,
  `active_from` datetime NOT NULL,
  `active_to` datetime NOT NULL,
  `photoUrl` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Активен',
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_ru` (`name_ru`),
  UNIQUE KEY `name_uz` (`name_uz`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,'Edisson','Edisson','Edisson — это просто!\nБренд Edisson базируется на идее создания простого, понятного, удобного и долговечного оборудования для решения ежедневных бытовых задач, будь то нагрев воды или создание приятной атмосферы в комнате. Поэтому оборудование Edisson актуально в любом помещении и будет отлично работать в квартире, на даче, в доме, офисе или на складе, а каждая серия техники наделяется лаконичным дизайном, интуитивно-понятной системой управления, оптимальным количеством настроек и опций.\n\nВопреки современным тенденциям делать оборудование все более сложным и многофункциональным, бренд годами следует своим принципам. И сотни тысяч пользователей уже более 15 лет выбирают технику Edisson, чтобы создавать уют в своем доме.','Edisson — это просто!\nБренд Edisson базируется на идее создания простого, понятного, удобного и долговечного оборудования для решения ежедневных бытовых задач, будь то нагрев воды или создание приятной атмосферы в комнате. Поэтому оборудование Edisson актуально в любом помещении и будет отлично работать в квартире, на даче, в доме, офисе или на складе, а каждая серия техники наделяется лаконичным дизайном, интуитивно-понятной системой управления, оптимальным количеством настроек и опций.\n\nВопреки современным тенденциям делать оборудование все более сложным и многофункциональным, бренд годами следует своим принципам. И сотни тысяч пользователей уже более 15 лет выбирают технику Edisson, чтобы создавать уют в своем доме.','2021-01-15 21:45:46','2021-01-22 21:45:51','https://telegra.ph/file/c91ee253d26e5c023fd16.png','Активен','2021-01-15 21:46:58.001','2021-01-16 14:57:20.348'),(2,'Edisson 1','Edisson 1','Edisson — это просто!\nБренд Edisson базируется на идее создания простого, понятного, удобного и долговечного оборудования для решения ежедневных бытовых задач, будь то нагрев воды или создание приятной атмосферы в комнате. Поэтому оборудование Edisson актуально в любом помещении и будет отлично работать в квартире, на даче, в доме, офисе или на складе, а каждая серия техники наделяется лаконичным дизайном, интуитивно-понятной системой управления, оптимальным количеством настроек и опций.\n\nВопреки современным тенденциям делать оборудование все более сложным и многофункциональным, бренд годами следует своим принципам. И сотни тысяч пользователей уже более 15 лет выбирают технику Edisson, чтобы создавать уют в своем доме.','Edisson — это просто!\nБренд Edisson базируется на идее создания простого, понятного, удобного и долговечного оборудования для решения ежедневных бытовых задач, будь то нагрев воды или создание приятной атмосферы в комнате. Поэтому оборудование Edisson актуально в любом помещении и будет отлично работать в квартире, на даче, в доме, офисе или на складе, а каждая серия техники наделяется лаконичным дизайном, интуитивно-понятной системой управления, оптимальным количеством настроек и опций.\n\nВопреки современным тенденциям делать оборудование все более сложным и многофункциональным, бренд годами следует своим принципам. И сотни тысяч пользователей уже более 15 лет выбирают технику Edisson, чтобы создавать уют в своем доме.','2021-01-15 21:49:08','2021-01-31 21:49:09','https://telegra.ph/file/d1965321187e9279d3cdd.png','Активен','2021-01-15 21:49:14.193','2021-01-15 21:50:05.570');
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_ru` varchar(255) NOT NULL,
  `name_uz` varchar(255) NOT NULL,
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_ru` (`name_ru`),
  UNIQUE KEY `name_uz` (`name_uz`),
  KEY `idx_category_parent` (`parentId`) USING BTREE,
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (6,'сантехника','santexnika',NULL),(7,'канцелярия','kontselyariya',NULL),(8,'посуда','idish',NULL),(9,'цветные карандаши','rangli qalamlar',7),(10,'ножницы','qaychilar',7),(11,'сковородки','tovonlar',8),(12,'чайники','choyniklar',8),(15,'ванна','vanna',6),(16,'гусак','gusak',6);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactData`
--

DROP TABLE IF EXISTS `contactData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactData` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phoneNumbers` text NOT NULL,
  `socials` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactData`
--

LOCK TABLES `contactData` WRITE;
/*!40000 ALTER TABLE `contactData` DISABLE KEYS */;
INSERT INTO `contactData` VALUES (2,'+998123456789\n+998987654321','twitter.com\nfacebook.com');
/*!40000 ALTER TABLE `contactData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_ru` varchar(100) NOT NULL,
  `name_uz` varchar(100) NOT NULL,
  `description_ru` text,
  `description_uz` text,
  `location` varchar(100) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Метро Беруний','Beruniy Metrosi','Около метро Бетруний','Beruniy metrosi yonida','Tashkent, Almazar, Beruniy metro, 11-22A',41.346,69.206);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderItems`
--

DROP TABLE IF EXISTS `orderItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` float DEFAULT NULL,
  `productId` int NOT NULL,
  `orderId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_order_item_product` (`productId`) USING BTREE,
  KEY `idx_order_item_order` (`orderId`) USING BTREE,
  CONSTRAINT `orderItems_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderItems_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderItems`
--

LOCK TABLES `orderItems` WRITE;
/*!40000 ALTER TABLE `orderItems` DISABLE KEYS */;
INSERT INTO `orderItems` VALUES (20,3,3,15),(21,6,4,15);
/*!40000 ALTER TABLE `orderItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `subtotal` float NOT NULL,
  `discount` float DEFAULT NULL,
  `total` float NOT NULL,
  `FIO` varchar(255) NOT NULL,
  `geoLocation` varchar(255) NOT NULL,
  `receiveDate` varchar(100) DEFAULT NULL,
  `paymentType` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_order_user` (`userId`) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (15,14,140910,NULL,140910,'Даниэл','latitude: 41.367766, longitude: 69.286292','28/1/2021','Наличными','Ожидает','2021-01-16 13:10:15.460','2021-01-16 13:10:15.460');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `productId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`productId`,`categoryId`),
  UNIQUE KEY `product_category_productId_categoryId_unique` (`productId`,`categoryId`),
  KEY `idx_pc_category` (`categoryId`) USING BTREE,
  KEY `idx_pc_product` (`productId`) USING BTREE,
  CONSTRAINT `product_category_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_category_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (4,9),(3,10),(7,11),(8,12),(11,15),(12,16);
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_ru` varchar(255) NOT NULL,
  `name_uz` varchar(255) NOT NULL,
  `description_uz` text,
  `description_ru` text,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `photoUrl` varchar(255) DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_ru` (`name_ru`),
  UNIQUE KEY `name_uz` (`name_uz`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,'Ножницы deli 210mm','Ножницы deli 210mm','Ножницы deli 210mm','Ножницы deli 210mm',16990,100,'https://telegra.ph/file/07e48ee35087e9a875b89.jpg',NULL,'2021-01-16 17:40:16.367','2021-01-16 17:45:11.849'),(4,'Цветные карандаши deli 12 цветов','Цветные карандаши deli 12 цветов','Цветные карандаши deli 12 цветов','Цветные карандаши deli 12 цветов',14990,100,'https://telegra.ph/file/9ed07e0eabe73687dcd89.jpg',NULL,'2021-01-16 17:40:16.381','2021-01-16 17:45:11.904'),(7,'Сковородка berlinger haus BH-1192','Сковородка berlinger haus BH-1192','Сковородка berlinger haus BH-1192','Сковородка berlinger haus BH-1192',214990,50,'https://telegra.ph/file/183d35a577a079eb79c1b.jpg',NULL,'2021-01-16 17:41:21.937','2021-01-16 17:45:11.912'),(8,'Tea/coffee maker tescoma  1.7 литров','Tea/coffee maker tescoma  1.7 литров','Tea/coffee maker tescoma  1.7 литров','Tea/coffee maker tescoma  1.7 литров',365990,50,'https://telegra.ph/file/190d7f716cb6c963d8faf.jpg',NULL,'2021-01-16 17:41:21.954','2021-01-16 17:45:11.879'),(9,'Шпатель эластичный 16,5см','Шпатель эластичный 16,5см','Шпатель эластичный 16,5см','Шпатель эластичный 16,5см',3950,200,'https://telegra.ph/file/a4a04ac4c05d35318848b.jpg',NULL,'2021-01-16 17:42:52.216','2021-01-16 17:45:11.896'),(10,'Hayat Грунтовка акриловая 1кг','Hayat Грунтовка акриловая 1кг','Hayat Грунтовка акриловая 1кг','Hayat Грунтовка акриловая 1кг',17650,200,'https://telegra.ph/file/1555fc537bc689f21618d.jpg',NULL,'2021-01-16 17:42:52.233','2021-01-16 17:45:11.864'),(11,'Пробка для ванны с цепочкой','Пробка для ванны с цепочкой','Пробка для ванны с цепочкой','Пробка для ванны с цепочкой',5650,500,'https://telegra.ph/file/79e6e260c3379ec7641a2.jpg',NULL,'2021-01-16 17:43:56.286','2021-01-16 17:45:11.887'),(12,'Гусак плоский 17-20см','Гусак плоский 17-20см','Гусак плоский 17-20см','Гусак плоский 17-20см',32640,200,'https://telegra.ph/file/2a3682405f61d786207cc.jpg',NULL,'2021-01-16 17:43:56.304','2021-01-16 17:45:11.871');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `message_id` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  `message_status` varchar(255) DEFAULT NULL,
  `question` text,
  `answer` text,
  PRIMARY KEY (`id`),
  KEY `idx_qstn_user` (`userId`) USING BTREE,
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(100) NOT NULL,
  `session` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('15103371:15103371','%7B%22__language_code%22%3A%22ru%22%2C%22registered%22%3A%7B%7D%2C%22cart%22%3A%7B%7D%2C%22__scenes%22%3A%7B%22current%22%3A%22language%22%2C%22state%22%3A%7B%7D%7D%2C%22userDetails%22%3A%7B%7D%7D'),('48828613:48828613','%7B%22__language_code%22%3A%22ru%22%2C%22message_filter%22%3A%5B10307%5D%2C%22registered%22%3A%7B%22id%22%3A15%2C%22userId%22%3A48828613%2C%22username%22%3A%22JumaniyozovIslom%22%2C%22lastName%22%3Anull%2C%22firstName%22%3Anull%2C%22language%22%3A%22ru%22%2C%22phone%22%3A%22+998909731347%22%2C%22registered%22%3Atrue%2C%22created_at%22%3A%222021-01-16T13%3A19%3A53.121Z%22%2C%22updated_at%22%3A%222021-01-16T13%3A19%3A53.121Z%22%7D%2C%22cart%22%3A%7B%7D%2C%22userDetails%22%3A%7B%22language%22%3A%22ru%22%2C%22phoneNumber%22%3A%22+998909731347%22%7D%2C%22actionIndex%22%3A0%2C%22currentLocationIndex%22%3A0%2C%22currentCategoryLocationIndex%22%3A0%2C%22order%22%3A%7B%7D%2C%22currentLocation%22%3A%7B%22id%22%3A1%2C%22name_ru%22%3A%22%u041C%u0435%u0442%u0440%u043E%20%u0411%u0435%u0440%u0443%u043D%u0438%u0439%22%2C%22name_uz%22%3A%22Beruniy%20Metrosi%22%2C%22description_ru%22%3A%22%u041E%u043A%u043E%u043B%u043E%20%u043C%u0435%u0442%u0440%u043E%20%u0411%u0435%u0442%u0440%u0443%u043D%u0438%u0439%22%2C%22description_uz%22%3A%22Beruniy%20metrosi%20yonida%22%2C%22location%22%3A%22Tashkent%2C%20Almazar%2C%20Beruniy%20metro%2C%2011-22A%22%2C%22latitude%22%3A41.346%2C%22longitude%22%3A69.206%7D%2C%22curtSubCatLocId%22%3A0%2C%22__scenes%22%3A%7B%22current%22%3A%22mainMenu%22%2C%22state%22%3A%7B%22start%22%3A%22%uD83D%uDCC7%20%u0413%u043B%u0430%u0432%u043D%u043E%u0435%20%u043C%u0435%u043D%u044E%22%7D%7D%7D'),('646488802:646488802','%7B%22__language_code%22%3A%22ru%22%2C%22message_filter%22%3A%5B10261%5D%2C%22registered%22%3A%7B%22id%22%3A14%2C%22username%22%3A%22born2l0se%22%2C%22userId%22%3A646488802%2C%22phone%22%3A%22+996709432375%22%2C%22language%22%3A%22ru%22%2C%22registered%22%3Atrue%7D%2C%22cart%22%3A%7B%7D%2C%22userDetails%22%3A%7B%22language%22%3A%22ru%22%2C%22phoneNumber%22%3A%22+996709432375%22%7D%2C%22actionIndex%22%3A0%2C%22currentLocationIndex%22%3A0%2C%22currentCategoryLocationIndex%22%3A0%2C%22order%22%3A%7B%7D%2C%22curtSubCatLocId%22%3A0%2C%22subCategoryParentId%22%3A%228%22%2C%22productLocationIndex%22%3A0%2C%22categoryId%22%3A%2211%22%2C%22productId%22%3A%224%22%2C%22cartItemIndex%22%3A0%2C%22cartTotal%22%3A140910%2C%22currentMonth%22%3A0%2C%22storeMonth%22%3A0%2C%22endDate%22%3Afalse%2C%22FIO%22%3A%22%u0414%u0430%u043D%u0438%u044D%u043B%22%2C%22searchProduct%22%3Afalse%2C%22currentLocation%22%3A%7B%22id%22%3A1%2C%22name_ru%22%3A%22%u041C%u0435%u0442%u0440%u043E%20%u0411%u0435%u0440%u0443%u043D%u0438%u0439%22%2C%22name_uz%22%3A%22Beruniy%20Metrosi%22%2C%22description_ru%22%3A%22%u041E%u043A%u043E%u043B%u043E%20%u043C%u0435%u0442%u0440%u043E%20%u0411%u0435%u0442%u0440%u0443%u043D%u0438%u0439%22%2C%22description_uz%22%3A%22Beruniy%20metrosi%20yonida%22%2C%22location%22%3A%22Tashkent%2C%20Almazar%2C%20Beruniy%20metro%2C%2011-22A%22%2C%22latitude%22%3A41.346%2C%22longitude%22%3A69.206%7D%2C%22__scenes%22%3A%7B%22current%22%3A%22mainMenu%22%2C%22state%22%3A%7B%22start%22%3A%22%uD83D%uDCC7%20%u0413%u043B%u0430%u0432%u043D%u043E%u0435%20%u043C%u0435%u043D%u044E%22%7D%7D%7D');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `orderId` int NOT NULL,
  `status` float DEFAULT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_transaction_user` (`userId`) USING BTREE,
  KEY `idx_transaction_order` (`orderId`) USING BTREE,
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `language` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `registered` tinyint(1) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `uq_userId` (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (14,646488802,'born2l0se',NULL,NULL,'ru','+996709432375',1,'2021-01-16 13:06:31.302','2021-01-16 13:06:31.302'),(15,48828613,'JumaniyozovIslom',NULL,NULL,'ru','+998909731347',1,'2021-01-16 13:19:53.121','2021-01-16 13:19:53.121');
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

-- Dump completed on 2021-01-28 15:17:14
