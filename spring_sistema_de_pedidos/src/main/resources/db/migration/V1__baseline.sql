-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.34 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para dixiponto
CREATE DATABASE IF NOT EXISTS `dixiponto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dixiponto`;

-- Copiando estrutura para tabela dixiponto.ci_contato
CREATE TABLE IF NOT EXISTS `ci_contato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `razaosocial` varchar(60) NOT NULL,
  `cargo` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `whatsapp` varchar(25) NOT NULL,
  `mensagem` varchar(600) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
  `assunto` varchar(30) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(25) NOT NULL,
  `usuarios` varchar(20) NOT NULL,
  `pagina` varchar(50) NOT NULL,
  `localidade` varchar(25) NOT NULL,
  `hoje` varchar(20) NOT NULL,
  `consultora` varchar(30) NOT NULL,
  `observacao` varchar(200) NOT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26199 DEFAULT CHARSET=utf8mb3;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.ci_sac
CREATE TABLE IF NOT EXISTS `ci_sac` (
  `id` int NOT NULL AUTO_INCREMENT,
  `protocolo` int NOT NULL,
  `nome` varchar(50) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `whatsapp` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cidade` varchar(30) NOT NULL,
  `estado` varchar(30) NOT NULL,
  `assunto` varchar(30) NOT NULL,
  `mensagem` varchar(500) NOT NULL,
  `empresa` varchar(50) NOT NULL,
  `cnp` varchar(20) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `data` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb3;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.ci_suporte
CREATE TABLE IF NOT EXISTS `ci_suporte` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cnpj` varchar(22) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fullname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `secretpin` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `datacadastro` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `vencimento` varchar(25) NOT NULL,
  `adm` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13739 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.ci_suporte_acesso
CREATE TABLE IF NOT EXISTS `ci_suporte_acesso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `inicioSessao` varchar(25) NOT NULL,
  `fimSessao` varchar(25) NOT NULL,
  `tempoSessao` varchar(25) NOT NULL,
  `userID` int NOT NULL,
  `session_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60874 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.ci_suporte_edicao
CREATE TABLE IF NOT EXISTS `ci_suporte_edicao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `editadoPor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `editadoEm` varchar(50) DEFAULT NULL,
  `valorPrevio` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `valorAtual` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.co_acesso
CREATE TABLE IF NOT EXISTS `co_acesso` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fullname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `departamento` varchar(60) NOT NULL,
  `secretpin` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `adm` int NOT NULL,
  `imagem` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `fator` int DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT (now()),
  `editado_em` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.co_arquivos
CREATE TABLE IF NOT EXISTS `co_arquivos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `chaveC` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `arqNome` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56960 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.co_enderecos
CREATE TABLE IF NOT EXISTS `co_enderecos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cidade` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `logradouro` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `numero` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `bairro` varchar(72) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cep` varchar(9) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `tp_logradouro` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `complemento` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.co_itens
CREATE TABLE IF NOT EXISTS `co_itens` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `chaveB` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `categoria` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `produto` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `preco` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `qtde` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `precototal` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nfuncionarios` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `valor_mensal` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `forma_pgto` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `venc_1_boleto` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `pagamentotipo` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `duracao` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `vigenciaIn` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `vigenciaOut` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `pedido_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKh9baqovfdfl30e2f0ah398p05` (`pedido_id`),
  CONSTRAINT `FKh9baqovfdfl30e2f0ah398p05` FOREIGN KEY (`pedido_id`) REFERENCES `co_pedidos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22585 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.co_pedidos
CREATE TABLE IF NOT EXISTS `co_pedidos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `chave` varchar(20) NOT NULL,
  `data` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `empresa` varchar(100) NOT NULL DEFAULT '',
  `consultor` varchar(100) NOT NULL DEFAULT '',
  `lead_origem` varchar(100) NOT NULL DEFAULT '',
  `lead_data` varchar(100) NOT NULL DEFAULT '',
  `contato` varchar(100) NOT NULL DEFAULT '',
  `cnpj` varchar(100) NOT NULL DEFAULT '',
  `razao_social` varchar(100) NOT NULL DEFAULT '',
  `fechado` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL DEFAULT '',
  `status` varchar(50) NOT NULL DEFAULT '''''',
  `fone1` varchar(100) NOT NULL DEFAULT '',
  `fone2` varchar(100) NOT NULL DEFAULT '',
  `rua` varchar(100) NOT NULL DEFAULT '',
  `numero` varchar(9) NOT NULL DEFAULT '',
  `bairro` varchar(60) NOT NULL DEFAULT '',
  `complemento` varchar(100) NOT NULL DEFAULT '',
  `cep` varchar(10) NOT NULL DEFAULT '',
  `cidade` varchar(50) NOT NULL DEFAULT '',
  `uf` varchar(2) NOT NULL DEFAULT '',
  `transportadora` varchar(50) NOT NULL DEFAULT '''''',
  `frete` varchar(25) NOT NULL DEFAULT '''''',
  `responsavel_nome` varchar(50) NOT NULL DEFAULT '''''',
  `responsavel_cpf` varchar(25) NOT NULL DEFAULT '''''',
  `catGrupo` varchar(50) NOT NULL,
  `planilhaVendas` varchar(1) NOT NULL,
  `licencaGerada` int NOT NULL,
  `assinatura` int NOT NULL,
  `chat` int NOT NULL,
  `posVenda` int NOT NULL,
  `notaFiscal` varchar(30) NOT NULL,
  `UnidadeNegocio` varchar(60) NOT NULL,
  `PrevisaoEntrega` varchar(30) NOT NULL,
  `NumeroSerie` varchar(800) NOT NULL,
  `codigoRastreio` varchar(15) NOT NULL,
  `obs` varchar(1200) NOT NULL,
  `emaillogin` varchar(255) DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chave` (`chave`),
  UNIQUE KEY `chave_2` (`chave`),
  KEY `FKl821w6a1eqa8eh6qgonrtdhlx` (`usuario_id`),
  CONSTRAINT `FKl821w6a1eqa8eh6qgonrtdhlx` FOREIGN KEY (`usuario_id`) REFERENCES `co_acesso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20244 DEFAULT CHARSET=utf8mb3;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.co_produtos
CREATE TABLE IF NOT EXISTS `co_produtos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `produto` varchar(100) NOT NULL,
  `categoria` int NOT NULL,
  `nivel` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.cs_hub
CREATE TABLE IF NOT EXISTS `cs_hub` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hobbies` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `age` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `job` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nome` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `sobre_nome` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `imagem` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.flyway_schema_history
CREATE TABLE IF NOT EXISTS `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_commentmeta
CREATE TABLE IF NOT EXISTS `news_commentmeta` (
  `meta_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` bigint unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`meta_id`),
  KEY `comment_id` (`comment_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_comments
CREATE TABLE IF NOT EXISTS `news_comments` (
  `comment_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint unsigned NOT NULL DEFAULT '0',
  `comment_author` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_author_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_karma` int NOT NULL DEFAULT '0',
  `comment_approved` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'comment',
  `comment_parent` bigint unsigned NOT NULL DEFAULT '0',
  `user_id` bigint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_ID`),
  KEY `comment_post_ID` (`comment_post_ID`),
  KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  KEY `comment_date_gmt` (`comment_date_gmt`),
  KEY `comment_parent` (`comment_parent`),
  KEY `comment_author_email` (`comment_author_email`(10))
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_links
CREATE TABLE IF NOT EXISTS `news_links` (
  `link_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `link_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_target` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_visible` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Y',
  `link_owner` bigint unsigned NOT NULL DEFAULT '1',
  `link_rating` int NOT NULL DEFAULT '0',
  `link_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `link_rel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link_notes` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_rss` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`link_id`),
  KEY `link_visible` (`link_visible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_options
CREATE TABLE IF NOT EXISTS `news_options` (
  `option_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `option_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `autoload` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`),
  KEY `autoload` (`autoload`)
) ENGINE=InnoDB AUTO_INCREMENT=48159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_postmeta
CREATE TABLE IF NOT EXISTS `news_postmeta` (
  `meta_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`meta_id`),
  KEY `post_id` (`post_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=3574 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_posts
CREATE TABLE IF NOT EXISTS `news_posts` (
  `ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `post_author` bigint unsigned NOT NULL DEFAULT '0',
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_excerpt` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `post_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `post_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `to_ping` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pinged` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_parent` bigint unsigned NOT NULL DEFAULT '0',
  `guid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `menu_order` int NOT NULL DEFAULT '0',
  `post_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_count` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`(191)),
  KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  KEY `post_parent` (`post_parent`),
  KEY `post_author` (`post_author`)
) ENGINE=InnoDB AUTO_INCREMENT=1042 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_termmeta
CREATE TABLE IF NOT EXISTS `news_termmeta` (
  `meta_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`meta_id`),
  KEY `term_id` (`term_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_terms
CREATE TABLE IF NOT EXISTS `news_terms` (
  `term_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `slug` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `term_group` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`term_id`),
  KEY `slug` (`slug`(191)),
  KEY `name` (`name`(191))
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_term_relationships
CREATE TABLE IF NOT EXISTS `news_term_relationships` (
  `object_id` bigint unsigned NOT NULL DEFAULT '0',
  `term_taxonomy_id` bigint unsigned NOT NULL DEFAULT '0',
  `term_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`object_id`,`term_taxonomy_id`),
  KEY `term_taxonomy_id` (`term_taxonomy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_term_taxonomy
CREATE TABLE IF NOT EXISTS `news_term_taxonomy` (
  `term_taxonomy_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint unsigned NOT NULL DEFAULT '0',
  `taxonomy` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent` bigint unsigned NOT NULL DEFAULT '0',
  `count` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`term_taxonomy_id`),
  UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
  KEY `taxonomy` (`taxonomy`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_usermeta
CREATE TABLE IF NOT EXISTS `news_usermeta` (
  `umeta_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`umeta_id`),
  KEY `user_id` (`user_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_users
CREATE TABLE IF NOT EXISTS `news_users` (
  `ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_nicename` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_status` int NOT NULL DEFAULT '0',
  `display_name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`),
  KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_yoast_indexable
CREATE TABLE IF NOT EXISTS `news_yoast_indexable` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `permalink` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `permalink_hash` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `object_id` bigint DEFAULT NULL,
  `object_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `object_sub_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` bigint DEFAULT NULL,
  `post_parent` bigint DEFAULT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `breadcrumb_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `post_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT NULL,
  `is_protected` tinyint(1) DEFAULT '0',
  `has_public_posts` tinyint(1) DEFAULT NULL,
  `number_of_pages` int unsigned DEFAULT NULL,
  `canonical` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `primary_focus_keyword` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primary_focus_keyword_score` int DEFAULT NULL,
  `readability_score` int DEFAULT NULL,
  `is_cornerstone` tinyint(1) DEFAULT '0',
  `is_robots_noindex` tinyint(1) DEFAULT '0',
  `is_robots_nofollow` tinyint(1) DEFAULT '0',
  `is_robots_noarchive` tinyint(1) DEFAULT '0',
  `is_robots_noimageindex` tinyint(1) DEFAULT '0',
  `is_robots_nosnippet` tinyint(1) DEFAULT '0',
  `twitter_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `twitter_image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `twitter_description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `twitter_image_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_image_source` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `open_graph_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `open_graph_description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `open_graph_image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `open_graph_image_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `open_graph_image_source` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `open_graph_image_meta` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `link_count` int DEFAULT NULL,
  `incoming_link_count` int DEFAULT NULL,
  `prominent_words_version` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `blog_id` bigint NOT NULL DEFAULT '1',
  `language` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schema_page_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schema_article_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `has_ancestors` tinyint(1) DEFAULT '0',
  `estimated_reading_time_minutes` int DEFAULT NULL,
  `version` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `object_type_and_sub_type` (`object_type`,`object_sub_type`),
  KEY `object_id_and_type` (`object_id`,`object_type`),
  KEY `permalink_hash_and_object_type` (`permalink_hash`,`object_type`),
  KEY `subpages` (`post_parent`,`object_type`,`post_status`,`object_id`),
  KEY `prominent_words` (`prominent_words_version`,`object_type`,`object_sub_type`,`post_status`)
) ENGINE=InnoDB AUTO_INCREMENT=401 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_yoast_indexable_hierarchy
CREATE TABLE IF NOT EXISTS `news_yoast_indexable_hierarchy` (
  `indexable_id` int unsigned NOT NULL,
  `ancestor_id` int unsigned NOT NULL,
  `depth` int unsigned DEFAULT NULL,
  `blog_id` bigint NOT NULL DEFAULT '1',
  PRIMARY KEY (`indexable_id`,`ancestor_id`),
  KEY `indexable_id` (`indexable_id`),
  KEY `ancestor_id` (`ancestor_id`),
  KEY `depth` (`depth`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_yoast_migrations
CREATE TABLE IF NOT EXISTS `news_yoast_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `version` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_yoast_migrations_version` (`version`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_yoast_primary_term
CREATE TABLE IF NOT EXISTS `news_yoast_primary_term` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint DEFAULT NULL,
  `term_id` bigint DEFAULT NULL,
  `taxonomy` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `blog_id` bigint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `post_taxonomy` (`post_id`,`taxonomy`),
  KEY `post_term` (`post_id`,`term_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_yoast_seo_links
CREATE TABLE IF NOT EXISTS `news_yoast_seo_links` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` bigint unsigned NOT NULL,
  `target_post_id` bigint unsigned NOT NULL,
  `type` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `indexable_id` int unsigned DEFAULT NULL,
  `target_indexable_id` int unsigned DEFAULT NULL,
  `height` int unsigned DEFAULT NULL,
  `width` int unsigned DEFAULT NULL,
  `size` int unsigned DEFAULT NULL,
  `language` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `link_direction` (`post_id`,`type`),
  KEY `indexable_link_direction` (`indexable_id`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=3462 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_yoast_seo_meta
CREATE TABLE IF NOT EXISTS `news_yoast_seo_meta` (
  `object_id` bigint unsigned NOT NULL,
  `internal_link_count` int unsigned DEFAULT NULL,
  `incoming_link_count` int unsigned DEFAULT NULL,
  UNIQUE KEY `object_id` (`object_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.sac_acesso
CREATE TABLE IF NOT EXISTS `sac_acesso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chaveA` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fullname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `secretpin` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `adm` int NOT NULL,
  `cadastro` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `imagem` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.sac_atendimento
CREATE TABLE IF NOT EXISTS `sac_atendimento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `protocolo` varchar(35) NOT NULL,
  `assunto` varchar(30) NOT NULL,
  `atribuicao` varchar(20) NOT NULL COMMENT 'departamento responsavel',
  `situacao` varchar(80) NOT NULL COMMENT 'recebido, pendente, resolvido, nao cabe',
  `exibir` varchar(5) NOT NULL COMMENT '0 e 1',
  `mensagem` varchar(500) NOT NULL,
  `tags` varchar(60) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `whatsapp` varchar(20) NOT NULL,
  `empresa` varchar(50) NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `cidade` varchar(30) NOT NULL,
  `uf` varchar(30) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `data` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `protocolo` (`protocolo`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb3;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.tre_configvideo
CREATE TABLE IF NOT EXISTS `tre_configvideo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_video` int NOT NULL,
  `imagem_padrao` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=ascii;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.tre_conteudo
CREATE TABLE IF NOT EXISTS `tre_conteudo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(75) NOT NULL,
  `descricao` text NOT NULL,
  `lista_id` varchar(50) NOT NULL,
  `submenu_id` int NOT NULL DEFAULT '0',
  `url` varchar(100) NOT NULL,
  `ordem_menu` int NOT NULL,
  `pagina` varchar(50) NOT NULL,
  `modulo` varchar(50) NOT NULL,
  `imagem` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `slide` varchar(3) NOT NULL DEFAULT 'Nao',
  `listar` varchar(3) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `ordem_slide` int NOT NULL,
  `destacar` varchar(5) NOT NULL DEFAULT 'Nao',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=518 DEFAULT CHARSET=utf8mb3;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.tre_usuarios
CREATE TABLE IF NOT EXISTS `tre_usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(220) NOT NULL,
  `email` varchar(220) NOT NULL,
  `usuario` varchar(220) NOT NULL,
  `senha` varchar(220) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
