<?php
require_once('db.connection.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

class Itens
{
    protected $conn;

    function __construct()
    {
        $dbConn = new Connection();
        $this->conn = $dbConn->getConnection();
    }

    public function buscar()
    {
        try {
            if (isset($_POST['chave'])) {
                $stmt = $this->conn->prepare('SELECT * FROM co_itens WHERE chaveB = :chave');
                $stmt->bindParam(':chave', $_POST['chave']);
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

                http_response_code(200);
                echo json_encode($data);
            } else {
                http_response_code(400);
                echo json_encode("Chave não está presente na requisição POST.");
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
