-- --------------------------------------------------------
-- Servidor:                     localhost
-- Versão do servidor:           10.4.27-MariaDB - mariadb.org binary distribution
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
CREATE DATABASE IF NOT EXISTS `dixiponto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `dixiponto`;

-- Copiando estrutura para tabela dixiponto.co_acesso
CREATE TABLE IF NOT EXISTS `co_acesso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chaveA` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fullname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `departamento` varchar(60) NOT NULL,
  `nivelVenda` float NOT NULL,
  `nivelServico` float NOT NULL,
  `secretpin` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `adm` int(11) NOT NULL,
  `cadastro` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imagem` varchar(150) NOT NULL,
  `fator` int(11) NOT NULL,
  `data_insercao` varchar(20) NOT NULL,
  `resp_insercao` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.co_arquivos
CREATE TABLE IF NOT EXISTS `co_arquivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chaveC` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `arqNome` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71289 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.co_itens
CREATE TABLE IF NOT EXISTS `co_itens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chaveB` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `categoria` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `produto` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `preco` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `qtde` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `precototal` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nfuncionarios` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `valor_mensal` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `forma_pgto` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `venc_1_boleto` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pagamentotipo` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `duracao` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `vigenciaIn` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `vigenciaOut` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `obs` varchar(600) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26471 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.co_pedidos
CREATE TABLE IF NOT EXISTS `co_pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chave` varchar(20) NOT NULL,
  `data` varchar(20) NOT NULL DEFAULT '',
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
  `categoria` varchar(50) NOT NULL DEFAULT '',
  `produto` varchar(50) NOT NULL DEFAULT '',
  `preco` varchar(10) NOT NULL DEFAULT '''''',
  `qtde` varchar(15) NOT NULL DEFAULT '',
  `precototal` varchar(25) NOT NULL,
  `nfuncionarios` varchar(25) NOT NULL DEFAULT '''''',
  `valor_mensal` varchar(20) NOT NULL DEFAULT '''''',
  `forma_pgto` varchar(60) NOT NULL DEFAULT '',
  `venc_1_boleto` varchar(20) NOT NULL DEFAULT '',
  `pagamentotipo` varchar(50) NOT NULL,
  `duracao` varchar(20) NOT NULL,
  `vigenciaIn` varchar(20) NOT NULL,
  `vigenciaOut` varchar(20) NOT NULL,
  `planilhaVendas` varchar(1) NOT NULL,
  `licencaGerada` int(11) NOT NULL,
  `assinatura` int(11) NOT NULL,
  `chat` int(11) NOT NULL,
  `posVenda` int(11) NOT NULL,
  `notaFiscal` varchar(30) NOT NULL,
  `UnidadeNegocio` varchar(60) NOT NULL,
  `PrevisaoEntrega` varchar(30) NOT NULL,
  `NumeroSerie` varchar(800) NOT NULL,
  `codigoRastreio` varchar(15) NOT NULL,
  `obs` varchar(1200) NOT NULL,
  `emailLogin` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chave` (`chave`),
  UNIQUE KEY `chave_2` (`chave`)
) ENGINE=InnoDB AUTO_INCREMENT=23753 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.co_produtos
CREATE TABLE IF NOT EXISTS `co_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `produto` varchar(100) NOT NULL,
  `categoria` int(11) NOT NULL,
  `nivel` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_comments
CREATE TABLE IF NOT EXISTS `news_comments` (
  `comment_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint(20) unsigned NOT NULL DEFAULT 0,
  `comment_author` tinytext NOT NULL,
  `comment_author_email` varchar(100) NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT 0,
  `comment_approved` varchar(20) NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) NOT NULL DEFAULT '',
  `comment_type` varchar(20) NOT NULL DEFAULT 'comment',
  `comment_parent` bigint(20) unsigned NOT NULL DEFAULT 0,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`comment_ID`),
  KEY `comment_post_ID` (`comment_post_ID`),
  KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  KEY `comment_date_gmt` (`comment_date_gmt`),
  KEY `comment_parent` (`comment_parent`),
  KEY `comment_author_email` (`comment_author_email`(10))
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.news_posts
CREATE TABLE IF NOT EXISTS `news_posts` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_author` bigint(20) unsigned NOT NULL DEFAULT 0,
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) NOT NULL DEFAULT 'open',
  `post_password` varchar(255) NOT NULL DEFAULT '',
  `post_name` varchar(200) NOT NULL DEFAULT '',
  `to_ping` text NOT NULL,
  `pinged` text NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext NOT NULL,
  `post_parent` bigint(20) unsigned NOT NULL DEFAULT 0,
  `guid` varchar(255) NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT 0,
  `post_type` varchar(20) NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`(191)),
  KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  KEY `post_parent` (`post_parent`),
  KEY `post_author` (`post_author`)
) ENGINE=InnoDB AUTO_INCREMENT=1042 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.tre_configvideo
CREATE TABLE IF NOT EXISTS `tre_configvideo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_video` int(11) NOT NULL,
  `imagem_padrao` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.tre_conteudo
CREATE TABLE IF NOT EXISTS `tre_conteudo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(75) NOT NULL,
  `descricao` text NOT NULL,
  `lista_id` varchar(50) NOT NULL,
  `submenu_id` int(11) NOT NULL DEFAULT 0,
  `url` varchar(100) NOT NULL,
  `ordem_menu` int(11) NOT NULL,
  `pagina` varchar(50) NOT NULL,
  `modulo` varchar(50) NOT NULL,
  `imagem` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `slide` varchar(3) NOT NULL DEFAULT 'Nao',
  `listar` varchar(3) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `ordem_slide` int(11) NOT NULL,
  `destacar` varchar(5) NOT NULL DEFAULT 'Nao',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=518 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela dixiponto.tre_usuarios
CREATE TABLE IF NOT EXISTS `tre_usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(220) NOT NULL,
  `email` varchar(220) NOT NULL,
  `usuario` varchar(220) NOT NULL,
  `senha` varchar(220) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
