<?php
require_once(__DIR__ . '/../config/connection.php');

class Auth
{
    protected $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    public function login()
    {
        if ($_SERVER["REQUEST_METHOD"] !== "POST") {
            http_response_code(405);
            echo json_encode(array('message' => 'Method Not Allowed'));
            return;
        }

        if (empty($_POST['username']) || empty($_POST['password'])) {
            http_response_code(400);
            echo json_encode(array('message' => 'Preencha Usuário e senha!'));
            return;
        }

        $username = $_POST['username'];
        $password = $_POST['password'];

        try {
            $stmt = $this->conn->prepare('SELECT * FROM co_acesso WHERE username = :username AND adm >= 1');
            $stmt->execute(array(':username' => $username));
            $data = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$data && $password != $data['password']) {
                http_response_code(401);
                echo json_encode(array("message" => "Usuário ou senha inválido(s)!"));
            } else {
                if (session_status() != PHP_SESSION_ACTIVE) {
                    session_start();
                }

                $_SESSION['id'] = $data['id'];
                $_SESSION['username'] = $data['username'];
                $_SESSION['fullname'] = $data['fullname'];
                $_SESSION['email'] = $data['secretpin'];
                $_SESSION['adm'] = $data['adm'];
                http_response_code(200);
                echo json_encode(array("message" => $data));
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(array("message" => "Internal Server Error: " . $e));
        }
    }
}

$conn = DbConnection::getConn();

$auth = new Auth($conn);
$auth->login();
