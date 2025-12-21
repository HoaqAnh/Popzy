-- MySQL dump 10.13  Distrib 9.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: Bds
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user1_id` bigint NOT NULL,
  `user2_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_conversation_pair` (`user1_id`,`user2_id`),
  KEY `idx_conversations_user1` (`user1_id`),
  KEY `idx_conversations_user2` (`user2_id`),
  KEY `idx_conversations_updated` (`updated_at` DESC),
  CONSTRAINT `FK8wv0rmd8jb3cqcbyng15ubrmk` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKe7w0k1xem21pp85wxh5moodnk` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,'2025-12-21 19:13:22.262246','2025-12-21 19:13:22.327625',1,2);
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_posts`
--

DROP TABLE IF EXISTS `favorite_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_posts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `post_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKnot67n51kjxvp7jvyx69bea22` (`user_id`,`post_id`),
  KEY `FKfddrih7swf6wmgmjy3b6vgxx3` (`post_id`),
  CONSTRAINT `FK1ogjfhp88l2t9g1836bjixaq7` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKfddrih7swf6wmgmjy3b6vgxx3` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_posts`
--

LOCK TABLES `favorite_posts` WRITE;
/*!40000 ALTER TABLE `favorite_posts` DISABLE KEYS */;
INSERT INTO `favorite_posts` VALUES (1,'2025-12-21 19:12:53.121078',16,2);
/*!40000 ALTER TABLE `favorite_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKalwaag9bmtnbjaiv4wlp99fhg` (`post_id`),
  CONSTRAINT `FKalwaag9bmtnbjaiv4wlp99fhg` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (34,'Popzy/tfb8pngecmls7wbmsibc',8),(35,'Popzy/cxdwy85n00nijexawnnc',8),(36,'Popzy/wrihha9p1lxfduxfdfr3',8),(37,'Popzy/wr56zqdiqpajhb9ftxnc',8),(38,'Popzy/iuxkt7w0rp3otqc6u5cn',8),(39,'Popzy/pquteqmva5fkvdgg9rmc',8),(40,'Popzy/ejxogsc312do7mirpsgx',8),(47,'Popzy/kjwrurgoghwb5r0vj19a',10),(48,'Popzy/bhdl5tgqt7uzdmz6gtvv',10),(49,'Popzy/ol5h1ihqr7b9kxxiioek',10),(50,'Popzy/wwzjateqdq853blydsjg',10),(51,'Popzy/l9onap1076b6yqziskbs',10),(52,'Popzy/i4ojxgie8vj83elye05y',11),(53,'Popzy/utuiltv42ejipa2vfr2u',11),(54,'Popzy/yxgyzf8eypv08yilxj24',11),(55,'Popzy/opz2dkhosu1mtebwc7u8',11),(56,'Popzy/l2szywytlegoepzthokv',11),(57,'Popzy/tzghy7wpoit4k2owlqxj',12),(58,'Popzy/zocgkh7i0nkuxgg0cg7x',12),(59,'Popzy/fcmxzzxuxat0piekrdsp',12),(60,'Popzy/uiiuqan0rvhfaezuzyxz',12),(61,'Popzy/izzdh5vvmqvuqbw6yrea',12),(78,'Popzy/gupchra5cyxqcmkgk3fe',16),(79,'Popzy/xulgmmxrytfshjcxiuhj',16),(80,'Popzy/qac5ywfb3r3n04avbdcg',16),(81,'Popzy/h9qmtcbpgftwqpm0lxfz',16),(82,'Popzy/unhavkkbu74wwsx1zuap',16);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` datetime(6) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_read` bit(1) NOT NULL,
  `conversation_id` bigint NOT NULL,
  `sender_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_messages_conversation` (`conversation_id`,`created_at`),
  KEY `idx_messages_sender` (`sender_id`),
  CONSTRAINT `FK4ui4nnwntodh6wjvck53dbk9m` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKt492th6wsovh1nush5yl5jj8e` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'Xin chào! Tôi quan tâm đến bài đăng: http://localhost:5173/buy/11','2025-12-21 19:13:22.322238',NULL,_binary '\0',1,2);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `description` text,
  `name` varchar(100) NOT NULL,
  `price` float DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7ky67sgi7k0ayf22652f7763r` (`user_id`),
  CONSTRAINT `FK7ky67sgi7k0ayf22652f7763r` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (8,'2025-12-06 23:03:15.623391','1. Căn 54m² - 2N1VS - Tầng Trung ban công hướng Bắc view đẹp, tặng nội thất, sẵn sổ đỏ giá 7.x tỷ thu về.\n\n2. Căn 77.5m² - 2N2VS tầng cao ban công hướng Tây view thoáng, cần bán nhanh giá 10.5 tỷ\n\n2. Căn 77m hướng Đông view thoáng vĩnh viễn, sổ đỏ lâu dài, nội thất cơ bản, giá 10.3 tỷ bao toàn bộ thuế phí - Rẻ nhất toà\n\n4. Căn 85m² - 2N2vs tầng cao ban công chính Nam mát view đẹp, nội thất CĐT, sổ đỏ lâu dài giá 11.9 tỷ.\n\n5. Căn 110.5m - 3N2vs view nội khu sân chơi hướng Nam, nội thất full đẹp để lại đồ liền tường, có thể vào ở ngay, sổ đỏ lâu dài, giao dịch trong ngày giá 14.3 tỷ.\n\n6. Căn 109.8m² - 3N2vs view nội khu sân chơi hướng Tây, nội thất cơ bản CĐT, sổ đỏ lâu dài giá 14.275 tỷ thuế phí bên nào bên đó chịu.\n\n7. Căn 109.8m² - 3N2vs view mặt ngoài thoáng vĩnh viễn nhìn về ĐH Quốc Gia hướng Tây, nội thất liền tường, sổ đỏ lâu dài giá 14.5 tỷ.','Cập nhật quỹ căn bán 2-3PN mới nhất giá tốt nhất chung cư Mipec Rubik360 Xuân Thuỷ tháng 12',10300000000,'2025-12-06 23:03:15.623391',1),(10,'2025-12-06 23:13:03.264687','Vị trí đắc điạ, tiềm năng vượt trội\nLiền kề vành đai 3, nút giao Tân Vạn, xa lộ Hà Nội.\nĐối diện ga Metro S2.1 đi trung tâm TP HCM, Thủ Dầu Môt, Sân bay Long Thành.\n\nTiện ích cao cấp: Hồ bơi vô cực trên tầng 40, gym, yoga, karaoke, phòng chiếu phim, trường mần non, thư viện, siêu thị, trường học liên cấp 1,2, BBQ, bóng rổ, pickleball...','Giỏ hàng độc quyền căn hộ view trực diện sông The Gió Riverside. Tổng chiết khấu đến 25.5%.',22000000000,'2025-12-06 23:13:03.264687',3),(11,'2025-12-06 23:15:35.816182','Tiềm năng tăng giá vượt trội.\nGa Metro 3B ngay trước dự án.\nQL13 & Đại Lộ Bình Dương mở rộng tăng giá mạnh.\nSố lượng căn giới hạn, nằm trong khu độ thị chuẩn quốc tế, chỉ 865 căn tạo nên cộng đồng tinh hoa, riêng tư hiếm có.\nChỉ 3 phút đến Lotte Mart, BV quốc tế, khu thương mại, trường họ.','Chiết khấu 10%- mở bán căn hộ Setia Edenia ngay siêu thị Lotte, Ga Metro 3B',34900000000,'2025-12-06 23:15:35.816182',1),(12,'2025-12-06 23:18:44.858105','Dự án cao cấp đến từ Gamuda Land (Malaysia) với thiết kế xanh, thông minh Biophilic.\nPháp lý rõ ràng, tiến độ nhanh chóng, đã cất nóc 2 Block A và C.\nKí HDMB thanh toán chỉ 5%, thanh toán 50% nhận nhà!','Dự án Elysian, đơn giá tốt nhất với giỏ hàng sỉ độc quyền, tầng cao, view đẹp',5230200000,'2025-12-06 23:18:44.858105',2),(16,'2025-12-21 17:00:08.922764','Kích cầu làn sóng BĐS cuối năm 2025, Vinhomes chính thức tung ra giỏ hàng The Origami CHIẾT KHẤU TỪ 12.5 ĐẾN 14.5 CÂY VÀNG/CĂN chưa từng có trước đó.\nThanh toán giãn nhẹ từ 180 đến 480 ngày, bàn giao FULL nội thất (tùy căn).\nGiá tốt hiếm có đón đầu Sóng cơ sở hạ tầng Vành Đai 3 vận hành 2026.\n* Liên hệ Phòng KD Vinhomes: 0906 929 *** (hỗ trợ 24/7)\n\nThông tin loại căn hộ:\n- Căn 2PN+ | DT: 69,5m² | Giá 3.499 tỷ\n- Căn 3PN | DT: 81.5m² | Giá 3.699 tỷ\n(Giá niêm yết từ CĐT, Giá bán trên chưa gồm VAT và KPBT).\n- Đặc biệt thanh toán giãn: 3 tháng thanh toán chỉ 5%\n- Thanh toán siêu giãn tới tháng 8/2026.\n- Thanh toán sớm nhận nhà tháng 03/2026 hoặc tháng 06/2026\n- Liên hệ: 0906 929 *** Giám đốc F1 dự án The Origami để được hỗ trợ tư vấn chi tiết.\nNgoài ra, đơn vị chúng tôi còn quản lý giỏ hàng hơn 2000 căn hộ bán lại giá tốt tại các phân khu Rainbow, Origami, The Beverly, Solari, Opus One...','Bán 3PN 81m2 Origami tặng KH 14.5 cây vàng, Thanh toán giãn 480 ngày, Cơ hội chốt lãi BĐS cuối năm',3700000000,'2025-12-21 17:00:08.922764',2);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `access_road` int DEFAULT NULL,
  `area` int DEFAULT NULL,
  `balcony_direction` varchar(30) DEFAULT NULL,
  `bathroom` int DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `district` varchar(30) DEFAULT NULL,
  `floors` int DEFAULT NULL,
  `frontage` int DEFAULT NULL,
  `furniture` varchar(30) DEFAULT NULL,
  `house_direction` varchar(30) DEFAULT NULL,
  `legal_status` varchar(30) DEFAULT NULL,
  `post_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKh9vye2ujqhsn9dvwumdj7vd6l` (`post_id`),
  CONSTRAINT `FKopyqchm4rurh0cd3ewgk53jv9` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (8,25,77,'Nam',2,2,'Hà Nội','Cầu Giấy',1,2,'Nội thất cơ bản','Đông Bắc','Sổ đỏ / Sổ hồng',8),(10,30,65,'Đông',5,4,'Bình Dương','Dĩ An',2,1,'Nội thất cao cấp','Tây Nam','Sổ đỏ / Sổ hồng',10),(11,45,73,'Đông Bắc',6,5,'Bình Dương','Thuận An',2,1,'Nội thất cao cấp','Nam','Sổ đỏ / Sổ hồng',11),(12,25,68,'Nam',3,2,'Hồ Chí Minh','Phường Trường Thạnh',1,1,'Nội thất cao cấp','Tây','Sổ đỏ / Sổ hồng',12),(16,20,81,'Đông Bắc',2,3,'TP. Hồ Chí Minh','Phường Long Bình, Quận 9',1,1,'Nội thất đầy đủ','Đông Nam','Sổ đỏ / Sổ hồng',16);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `device_info` varchar(255) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `ip` varchar(64) DEFAULT NULL,
  `refresh_token` text NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_sessions_user_id` (`user_id`),
  KEY `idx_sessions_expires_at` (`expires_at`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'2025-12-02 18:00:34.485366','PostmanRuntime/7.49.1','2025-12-03 19:00:34.485366','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjQ3ODg0MzQsImlhdCI6MTc2NDY5ODQzNCwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.8ttrnobi5C_xXiYg5TGMGM-9K10sfaKTnERM9ym-fpY',1),(2,'2025-12-02 18:09:34.574753','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','2025-12-03 19:09:34.574753','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHBvcHp5LmNvbSIsImV4cCI6MTc2NDc4ODk3NCwiaWF0IjoxNzY0Njk4OTc0LCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InRlc3RAcG9wenkuY29tIiwibmFtZSI6IlRy4bqnbiBQaOG6oW0gSG_DoG5nIEFuaCJ9fQ.r6wWcO555bEZzyKv-9c0D7yD_dvA_YMuuO5wED9ZYo0',3),(3,'2025-12-02 18:12:50.466276','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','2025-12-03 19:12:50.466276','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjQ3ODkxNzAsImlhdCI6MTc2NDY5OTE3MCwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.ZRmQbx6Ua4CCUotW7Gbfz84T2Oft_YsIvjOUO-qA3Yg',1),(4,'2025-12-02 18:26:16.526650','PostmanRuntime/7.49.1','2025-12-03 19:26:16.526650','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjQ3ODk5NzYsImlhdCI6MTc2NDY5OTk3NiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.S0EAR5T8LkMniVSmp8oRBqdCTR5wuWA1eu0A2wOXPZw',1),(5,'2025-12-04 11:57:27.695292','PostmanRuntime/7.49.1','2025-12-05 12:57:27.695292','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjQ5Mzk0NDcsImlhdCI6MTc2NDg0OTQ0NywidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.zIYSIPa_1bb7mxQMhSaSsYNhKtIsxMWVMI6va6Cmf9k',1),(6,'2025-12-04 11:59:03.669297','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-05 12:59:03.669297','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjQ5Mzk1NDMsImlhdCI6MTc2NDg0OTU0MywidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.JUAsDxSBvCfpuKvSFAQWCefvTX_MvtqlW__g9XkTshc',1),(7,'2025-12-04 13:02:29.684087','PostmanRuntime/7.49.1','2025-12-05 14:02:29.684087','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjQ5NDMzNDksImlhdCI6MTc2NDg1MzM0OSwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.ItTxAGtvAzpS5wu1RLlLnyyz-qFjLzaIVue9kqojNA8',1),(8,'2025-12-04 13:02:45.917420','PostmanRuntime/7.49.1','2025-12-05 14:02:45.917420','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjQ5NDMzNjUsImlhdCI6MTc2NDg1MzM2NSwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.H4iVZnmL73DuQVNIbH3f86K174zxeU1EM-mlMS8z7IE',1),(9,'2025-12-04 13:40:25.740432','PostmanRuntime/7.49.1','2025-12-05 14:40:25.740432','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjQ5NDU2MjUsImlhdCI6MTc2NDg1NTYyNSwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.jxbB_rKAEJFcIS1l0IGZ38V5YDdzOWB3UmTEuT295zI',1),(10,'2025-12-04 15:50:03.397242','PostmanRuntime/7.49.1','2025-12-05 16:50:03.397242','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjQ5NTM0MDMsImlhdCI6MTc2NDg2MzQwMywidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.UGX7_4f3MOXJzR5OE-nAW174Z65vEDJroINfg0Pi95M',1),(11,'2025-12-04 16:58:55.055680','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-05 17:58:55.055680','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjQ5NTc1MzUsImlhdCI6MTc2NDg2NzUzNSwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.qv0q6BDHP_Yu-kAJiA23ecfU5fqjIrYf8TmNVSbvz_k',1),(12,'2025-12-06 13:03:07.125321','PostmanRuntime/7.49.1','2025-12-07 14:03:07.125321','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjUxMTYxODcsImlhdCI6MTc2NTAyNjE4NywidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.2WxaVOn3Ao0yUAEbaBoqEGVEZzYpIC7mjKzGquf6IwQ',1),(13,'2025-12-06 13:03:42.438081','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-07 14:03:42.438081','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjUxMTYyMjIsImlhdCI6MTc2NTAyNjIyMiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.pdf86Nh-mHP0xDcrlECfQx7d4hThuKmyiDcKe0z5xIo',1),(14,'2025-12-06 13:54:29.761441','PostmanRuntime/7.49.1','2025-12-07 14:54:29.761441','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjUxMTkyNjksImlhdCI6MTc2NTAyOTI2OSwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.sOfedwgilLDa2MLCQDlOMrWDAmbTT5gddFNnXYpqh1k',1),(15,'2025-12-06 14:12:26.495872','PostmanRuntime/7.49.1','2025-12-07 15:12:26.495872','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjUxMjAzNDYsImlhdCI6MTc2NTAzMDM0NiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVMO0aSBsw6AgUG9wenkifX0.-DFC-Z20rNpFtqJx75wJqMVh7jjK_tVKAoMWYnHzeJo',1),(16,'2025-12-06 15:01:31.871765','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-07 16:01:31.871765','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjUxMjMyOTEsImlhdCI6MTc2NTAzMzI5MSwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVMO0aSBsw6AgUG9wenkifX0.IUHs0mZU9T6TlRtemtaidTl7916K6kBWQCX-Ez2fL4U',1),(17,'2025-12-06 15:51:42.134978','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-07 16:51:42.134978','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjUxMjYzMDIsImlhdCI6MTc2NTAzNjMwMiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVMO0aSBsw6AgUG9wenkifX0.ykkdnrCxlR5y8L5YnfQHrcWGtRHIEw8GUe5ozx--Ry8',1),(18,'2025-12-06 15:54:23.556024','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-07 16:54:23.556024','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjUxMjY0NjMsImlhdCI6MTc2NTAzNjQ2MywidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVMO0aSBsw6AgUG9wenkifX0.-0tq7Ww9KII12njdGhZy5DZ9Nq1zvoq6dnQYzHrwKxI',1),(19,'2025-12-06 16:04:21.123412','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-07 17:04:21.123412','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MkBnbWFpbC5jb20iLCJleHAiOjE3NjUxMjcwNjEsImlhdCI6MTc2NTAzNzA2MSwidXNlciI6eyJpZCI6MiwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCAxIn19.iW76-4wGROFmfCxT9L7dXbnC4JXNrvWyeFKVu2YtH_Y',2),(20,'2025-12-06 16:09:07.049333','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-07 17:09:07.049333','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MkBnbWFpbC5jb20iLCJleHAiOjE3NjUxMjczNDcsImlhdCI6MTc2NTAzNzM0NywidXNlciI6eyJpZCI6MiwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJuYW1lIjoiSG_DoG5nIEFuaCJ9fQ.fN89P-TggyiP0oWQq0c97X64nqgE8yn0B73g3Qhu-j4',2),(21,'2025-12-06 16:10:06.258434','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-07 17:10:06.258434','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHBvcHp5LmNvbSIsImV4cCI6MTc2NTEyNzQwNiwiaWF0IjoxNzY1MDM3NDA2LCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InRlc3RAcG9wenkuY29tIiwibmFtZSI6IlRy4bqnbiBQaOG6oW0gSG_DoG5nIEFuaCJ9fQ.f7VZhCCpkbidqqdBWPdyWcj8cjg4aLqrvENjSwMs0lg',3),(22,'2025-12-06 16:13:41.444460','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-07 17:13:41.444460','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjUxMjc2MjEsImlhdCI6MTc2NTAzNzYyMSwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVMO0aSBsw6AgUG9wenkifX0.36cYr9ACikh8cYyPEX99vyFdKnMZk2K90lMqbiAEnBk',1),(23,'2025-12-06 16:16:23.733473','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','2025-12-07 17:16:23.733473','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MkBnbWFpbC5jb20iLCJleHAiOjE3NjUxMjc3ODMsImlhdCI6MTc2NTAzNzc4MywidXNlciI6eyJpZCI6MiwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJuYW1lIjoiSG_DoG5nIEFuaCJ9fQ.QEqFBjuOsEe7sdBMpLCMupaovsY9wArWSBG799y7omo',2),(24,'2025-12-12 07:23:00.364653','Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36','2025-12-13 08:23:00.364653','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjU2MTQxODAsImlhdCI6MTc2NTUyNDE4MCwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVG_DoG4gVGjhuq9uZyJ9fQ.WCf24yyyYGrceM-TvVu7wITby2le9xT4x8JrR5ay3ug',1),(25,'2025-12-12 07:26:42.543394','PostmanRuntime/7.49.1','2025-12-13 08:26:42.543394','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjU2MTQ0MDIsImlhdCI6MTc2NTUyNDQwMiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVG_DoG4gVGjhuq9uZyJ9fQ.UjjpJuRewdFxhmco8y0WeLtWRn5xepiBFyHZa0NY-ug',1),(26,'2025-12-12 07:43:39.793555','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2025-12-13 08:43:39.793555','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBwb3B6eS5jb20iLCJleHAiOjE3NjU2MTU0MTksImlhdCI6MTc2NTUyNTQxOSwidXNlciI6eyJpZCI6NCwiZW1haWwiOiJ0ZXN0MUBwb3B6eS5jb20iLCJuYW1lIjoiVMO0aSBsw6AgUG9wenkifX0.hPd8uW96XRL2HVSvLDT6Qd6zT5JyExaCpClOk-msqTs',4),(27,'2025-12-12 08:04:19.537109','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2025-12-13 09:04:19.537109','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHBvcHp5LmNvbSIsImV4cCI6MTc2NTYxNjY1OSwiaWF0IjoxNzY1NTI2NjU5LCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InRlc3RAcG9wenkuY29tIiwibmFtZSI6IsSQ4bupYyBUaGnhu4duIn19.9f3YsAR3XokWv1Y3dOhL39kMUwVDfXCvpazz0Wiu0xo',3),(28,'2025-12-12 15:58:36.827572','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2025-12-13 16:58:36.827572','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHBvcHp5LmNvbSIsImV4cCI6MTc2NTY0NTExNiwiaWF0IjoxNzY1NTU1MTE2LCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InRlc3RAcG9wenkuY29tIiwibmFtZSI6IsSQ4bupYyBUaGnhu4duIn19.JrREBFv4QqL-ERJG0xPugOs7hKFEZhNkXUAht76B-Ho',3),(29,'2025-12-12 15:58:47.907691','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2025-12-13 16:58:47.907691','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjU2NDUxMjcsImlhdCI6MTc2NTU1NTEyNywidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVG_DoG4gVGjhuq9uZyJ9fQ.2kbpab3cYNSyKW66If4MZhmxKqDM1xbzYwWR1Nt9HpY',1),(30,'2025-12-13 11:00:48.693342','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2025-12-14 12:00:48.693342','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHBvcHp5LmNvbSIsImV4cCI6MTc2NTcxMzY0OCwiaWF0IjoxNzY1NjIzNjQ4LCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InRlc3RAcG9wenkuY29tIiwibmFtZSI6IsSQ4bupYyBUaGnhu4duIn19.vTpRupcSZxrNZmy0a7ewfPaxcLsttwhJe8yKQwaaL08',3),(31,'2025-12-20 14:36:06.402481','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2025-12-21 15:36:06.402481','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHBvcHp5LmNvbSIsImV4cCI6MTc2NjMzMTM2NiwiaWF0IjoxNzY2MjQxMzY2LCJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InRlc3RAcG9wenkuY29tIiwibmFtZSI6IsSQ4bupYyBUaGnhu4duIn19.okJqwFSwv9_bK_L-QM-Cet8tIQIHeVNsHR_gl0MADYM',3),(32,'2025-12-21 05:07:35.092386','PostmanRuntime/7.49.1','2025-12-22 06:07:35.092386','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjYzODM2NTUsImlhdCI6MTc2NjI5MzY1NSwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVG_DoG4gVGjhuq9uZyJ9fQ.n8TyYaa9KHodJ68t6kkTcFaLxzud4_F2fsYen912PaQ',1),(33,'2025-12-21 06:59:35.307509','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2025-12-22 07:59:35.307509','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBnbWFpbC5jb20iLCJleHAiOjE3NjYzOTAzNzUsImlhdCI6MTc2NjMwMDM3NSwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJuYW1lIjoiVG_DoG4gVGjhuq9uZyJ9fQ.hUq6rolrcMyeFin6N_eJeXKrfEJwEJbqRsRXhXSTLhs',1),(34,'2025-12-21 08:11:10.426561','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','2025-12-22 09:11:10.426561','0:0:0:0:0:0:0:1','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MkBnbWFpbC5jb20iLCJleHAiOjE3NjYzOTQ2NzAsImlhdCI6MTc2NjMwNDY3MCwidXNlciI6eyJpZCI6MiwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJuYW1lIjoiSG_DoG5nIEFuaCJ9fQ.fOeRzxPFjkCgiiCCgyFhySJbHJDog0-Tov8h7SfRDhs',2);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `age` varchar(3) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `email` varchar(190) NOT NULL,
  `fullname` varchar(120) DEFAULT NULL,
  `image_url` text,
  `password` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'2025-12-02 16:11:27.745888','anonymousUser','test1@gmail.com','Toàn Thắng','Popzy/ssq10snn3csja7jzmget','$2a$10$Y/u4fFiS/WUq74FKxwlhQey2HfqK1PldtgSLR.w71ezM0w..Ij3iW','0364505478','2025-12-06 16:15:52.512126','test1@gmail.com'),(2,NULL,'2025-12-02 17:23:28.996557','anonymousUser','test2@gmail.com','Hoàng Anh','Popzy/sivrw3rugqcd1a36fba8','$2a$10$dj.lXO.s9K3rxRpTLIkcWeKNSejDbarF/2wCaI8isOJ4SXlBChkwC','0364505478','2025-12-06 16:16:32.407670','test2@gmail.com'),(3,NULL,'2025-12-02 17:58:36.210082','anonymousUser','test@popzy.com','Đức Thiện','Popzy/fzla3v5ktwki9nnzojdd','$2a$10$AcDT.LZfoK6LG1c24bNl3eIn7xE5WTCvOBjBaSB8uhQ7Rbh1yF3B.','0364505478','2025-12-06 16:10:34.722515','test@popzy.com'),(4,NULL,'2025-12-12 07:43:30.473453','anonymousUser','test1@popzy.com','Tôi là Popzy',NULL,'$2a$10$iNtU326wrIWxQhY2hLZo1ubUjWDmlGX1KOFsKeiMT7fNBt94fWonS','0364505478',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7qhi6205kydb9sjalg0x59ydj` (`post_id`),
  CONSTRAINT `FK7qhi6205kydb9sjalg0x59ydj` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-21 19:17:53
