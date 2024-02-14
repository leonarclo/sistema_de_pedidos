<?php
define('ENV', 'dev');
define("VERSION", "v1");

if (ENV === 'prod') {
    define('BASE_URL', 'http://pedidos.dixiponto.com.br/');
    define('URL', 'http://pedidos.dixiponto.com.br/');
    define('API_PATH', URL . '/api' . '/' . VERSION);
    // DB CONFIG
    define('DB_HOST', 'dixiponto-site.ccvvruwdysqn.us-east-1.rds.amazonaws.com');
    define('DB_USERNAME', 'oGAocCiDvkx8UABs');
    define('DB_PASSWORD', 'gzdVgmreUaBzyCkMtEPtK9Bwfj');
    define('DB_NAME', 'dixiponto');
} else if (ENV === 'dev') {
    define('BASE_URL', 'sistema_de_pedidos_backend.localhost');
    define('URL', '/sistema_de_pedidos_backend.localhost');
    define('API_PATH', URL . '/api' . '/' . VERSION);
    // DB CONFIG
    define('DB_HOST', 'localhost');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', '');
    define('DB_NAME', 'pedidos');
}
