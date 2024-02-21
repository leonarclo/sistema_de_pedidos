<?php
require_once(__DIR__ . '/../config/connection.php');
require_once(__DIR__ . '/ssp.class.php');

class Pedidos
{
    protected $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function buscar()
    {
        if ($_SERVER["REQUEST_METHOD"] !== "GET") {
            http_response_code(405);
            echo json_encode(array('message' => 'Method Not Allowed'));
            return;
        }

        try {
            $stmt = $this->conn->prepare('SELECT * FROM co_pedidos');
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);

            $query = '';
            $result = array();
            $table = 'co_pedidos';
            $username = $_SESSION['username'];
            $primaryKey = 'id';

            $columns = array(
                array('db' => 'status', 'dt' => 0),
                array('db' => 'id', 'dt' => 1),
                array('db' => 'cnpj', 'dt' => 2),
                array('db' => 'empresa', 'dt' => 3,),
                array('db' => 'catGrupo', 'dt' => 4,),
                array('db' => 'consultor', 'dt' => 5,),
                array('db' => 'emailLogin', 'dt' => 6,),

                array(
                    'db' => 'id', 'dt' => 7,
                    'formatter' => function ($id, $row) {
                        return '<button type="button" name="editar" id="' . $id . '" class="btn btn-warning btn-xs update">ver</button>';
                    }
                )
            );
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Internal Server Error: " . $e));
        }
    }
}

$conn = DbConnection::getConn();
$pedidos = new Pedidos($conn);
$pedidos->buscar();
