<?php
require_once('config.php');
class Connection
{
    public static function getConnection()
    {
        try {
            $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Erro de conexão: " . $e->getMessage();
            return null;
        }
    }
}
