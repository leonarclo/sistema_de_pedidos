<?php
require_once('db.connection.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

class Arquivos
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
            $stmt = $this->conn->prepare('SELECT * FROM co_arquivos WHERE chaveC = :chave');
            $stmt->bindParam(':chave', $_POST['chave']);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode($data);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function inserir()
    {
        $uploadDir = 'uploads/';
        $allowedExtensions = array("pdf", "jpg", "jpeg", "webp", "png", "gif");

        if (isset($_FILES['arquivo'])) {
            $uploadedFiles = $_FILES['arquivo'];

            $response = [];

            foreach ($uploadedFiles['name'] as $key => $fileName) {
                $fileTmpName = $uploadedFiles['tmp_name'][$key];
                $fileError = $uploadedFiles['error'][$key];

                $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

                if (!in_array($fileExtension, $allowedExtensions)) {
                    $response[] = 'A extensão do arquivo ' . $fileName . ' não é permitida.';
                    continue;
                }

                if ($fileError !== UPLOAD_ERR_OK) {
                    $response[] = 'Erro no upload do arquivo ' . $fileName . '.';
                    continue;
                }

                $destination = $uploadDir . $fileName;

                if (move_uploaded_file($fileTmpName, $destination)) {
                    $response[] = 'Arquivo ' . $fileName . ' enviado e salvo com sucesso!';
                } else {
                    $response[] = 'Falha ao mover o arquivo ' . $fileName . ' para o diretório de destino.';
                }
            }

            http_response_code(200);
            echo json_encode($response);
        } else {
            http_response_code(500);
            echo json_encode('Nenhum arquivo enviado.');
        }
    }
}
