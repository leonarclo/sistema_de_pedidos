<?php
require_once('db.connection.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

class Pedidos
{

    protected $id;
    protected $chave;
    protected $data;
    protected $empresa;
    protected $consultor;
    protected $fechado;
    protected $lead_origem;
    protected $lead_data;
    protected $cnpj;
    protected $email;
    protected $status;
    protected $fone1;
    protected $fone2;
    protected $rua;
    protected $numero;
    protected $bairro;
    protected $complemento;
    protected $cep;
    protected $cidade;
    protected $uf;
    protected $transportadora;
    protected $frete;
    protected $responsavel_nome;
    protected $responsavel_cpf;
    protected $catGrupo;
    protected $obs;
    protected $emailLogin;

    protected $conn;

    function __construct()
    {
        $dbConn = new Connection();
        $this->conn = $dbConn->getConnection();
    }

    public function buscar()
    {
        try {
            $stmt = $this->conn->prepare('SELECT * FROM co_pedidos ORDER BY id DESC');
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode($data);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]); // Exibindo mensagem de erro em JSON
        }
    }

    public function inserir()
    {
        try {
            $rest_json = file_get_contents("php://input");
            $_POST = json_decode($rest_json, true);

            $this->chave = $_POST['chave'];
            $this->data = $_POST['data'];
            $this->empresa = $_POST['empresa'];
            $this->consultor = 'leonardo';
            $this->fechado = $_POST['cargoCliente'];
            $this->lead_origem = $_POST['leadOrigem'];
            $this->lead_data = $_POST['leadData'];
            $this->cnpj = $_POST['cnpj'];
            $this->email = $_POST['email'];
            $this->status = $_POST['status'];
            $this->fone1 = $_POST['telefone1'];
            $this->fone2 = $_POST['telefone2'];
            $this->rua = $_POST['logradouro'];
            $this->numero = $_POST['numeroEndereco'];
            $this->bairro = $_POST['bairro'];
            $this->complemento = $_POST['complemento'];
            $this->cep = $_POST['cep'];
            $this->cidade = $_POST['cidade'];
            $this->uf = $_POST['estado'];
            $this->transportadora = $_POST['transportadora'];
            $this->frete = $_POST['fretePreco'];
            $this->responsavel_nome = $_POST['nomeCliente'];
            $this->responsavel_cpf = $_POST['cpfCliente'];
            $cat1 = false;
            $cat2 = false;
            $categoria = $_POST['categoriaGrupo'];
            foreach ($categoria as $value) {
                if ($value == "Venda") {
                    $cat1 =  true;
                }
                if ($value == "Contrato") {
                    $cat2 =  true;
                }
                if ($cat1 == true && $cat2 == true) {
                    $this->catGrupo = "Venda + Contrato";
                } else {
                    $this->catGrupo = $value;
                }
            }
            $this->obs = $_POST['observacoes'];
            $this->emailLogin = $_POST['emailLogin'];

            $stmt = $this->conn->prepare('INSERT INTO co_pedidos (chave, data, empresa, consultor, fechado, lead_origem, lead_data, cnpj, email, status, fone1, fone2, rua, numero, bairro, complemento, cep, cidade, uf, transportadora, frete, responsavel_nome, responsavel_cpf, catGrupo, obs, emailLogin) 
                VALUES (:chave, :data, :empresa, :consultor, :fechado, :lead_origem, :lead_data, :cnpj, :email, :status, :fone1, :fone2, :rua, :numero, :bairro, :complemento, :cep, :cidade, :uf, :transportadora, :frete, :responsavel_nome, :responsavel_cpf, :catGrupo, :obs, :emailLogin)');
            $stmt->bindParam(':chave', $this->chave);
            $stmt->bindParam(':data', $this->data);
            $stmt->bindParam(':empresa', $this->empresa);
            $stmt->bindParam(':consultor', $this->consultor);
            $stmt->bindParam(':fechado', $this->fechado);
            $stmt->bindParam(':lead_origem', $this->lead_origem);
            $stmt->bindParam(':lead_data', $this->lead_data);
            $stmt->bindParam(':cnpj', $this->cnpj);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':status', $this->status);
            $stmt->bindParam(':fone1', $this->fone1);
            $stmt->bindParam(':fone2', $this->fone2);
            $stmt->bindParam(':rua', $this->rua);
            $stmt->bindParam(':numero', $this->numero);
            $stmt->bindParam(':bairro', $this->bairro);
            $stmt->bindParam(':complemento', $this->complemento);
            $stmt->bindParam(':cep', $this->cep);
            $stmt->bindParam(':cidade', $this->cidade);
            $stmt->bindParam(':uf', $this->uf);
            $stmt->bindParam(':transportadora', $this->transportadora);
            $stmt->bindParam(':frete', $this->frete);
            $stmt->bindParam(':responsavel_nome', $this->responsavel_nome);
            $stmt->bindParam(':responsavel_cpf', $this->responsavel_cpf);
            $stmt->bindParam(':catGrupo', $this->catGrupo);
            $stmt->bindParam(':obs', $this->obs);
            $stmt->bindParam(':emailLogin', $this->emailLogin);

            $stmt->execute();

            http_response_code(200);
            echo json_encode(['status' => 'success']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]); // Exibindo mensagem de erro em JSON
        }
    }

    public function editar()
    {
        try {
            $rest_json = file_get_contents("php://input");
            $_POST = json_decode($rest_json, true);

            $this->chave = $_POST['chave'];
            $this->data = date('Y-m-d');
            $this->empresa = $_POST['empresa'];
            $this->consultor = 'leonado';
            $this->fechado = $_POST['cargoCliente'];
            $this->lead_origem = $_POST['leadOrigem'];
            $this->lead_data = $_POST['leadData'];
            $this->cnpj = $_POST['cnpj'];
            $this->email = $_POST['email'];
            $this->status = $_POST['status'];
            $this->fone1 = $_POST['telefone1'];
            $this->fone2 = $_POST['telefone2'];
            $this->rua = $_POST['logradouro'];
            $this->numero = $_POST['numeroEndereco'];
            $this->bairro = $_POST['bairro'];
            $this->complemento = $_POST['complemento'];
            $this->cep = $_POST['cep'];
            $this->cidade = $_POST['cidade'];
            $this->uf = $_POST['estado'];
            $this->transportadora = $_POST['transportadora'];
            $this->frete = $_POST['fretePreco'];
            $this->responsavel_nome = $_POST['nomeCliente'];
            $this->responsavel_cpf = $_POST['cpfCliente'];
            $cat1 = false;
            $cat2 = false;
            $categoria = $_POST['categoriaGrupo'];
            foreach ($categoria as $value) {
                if ($value == "Venda") {
                    $cat1 =  true;
                }
                if ($value == "Contrato") {
                    $cat2 =  true;
                }
                if ($cat1 == true && $cat2 == true) {
                    $this->catGrupo = "Venda + Contrato";
                } else {
                    $this->catGrupo = $value;
                }
            }
            $novasObs = $_POST['novasObservacoes'];
            $this->obs = $_POST['observacoes'];
            $observacoes = $this->obs . '<br /><br />' . $novasObs;
            $this->emailLogin = $_POST['emailLogin'];

            $stmt = $this->conn->prepare('UPDATE co_pedidos SET (chave, data, empresa, consultor, fechado, lead_origem, lead_data, cnpj, email, status, fone1, fone2, rua, numero, bairro, complemento, cep, cidade, uf, transportadora, frete, responsavel_nome, responsavel_cpf, catGrupo, obs, emailLogin) WHERE id = :id');
            $stmt->bindParam(':id', $this->id);
            $stmt->bindParam(':chave', $this->chave);
            $stmt->bindParam(':data', $this->data);
            $stmt->bindParam(':empresa', $this->empresa);
            $stmt->bindParam(':consultor', $this->consultor);
            $stmt->bindParam(':fechado', $this->fechado);
            $stmt->bindParam(':lead_origem', $this->lead_origem);
            $stmt->bindParam(':lead_data', $this->lead_data);
            $stmt->bindParam(':cnpj', $this->cnpj);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':status', $this->status);
            $stmt->bindParam(':fone1', $this->fone1);
            $stmt->bindParam(':fone2', $this->fone2);
            $stmt->bindParam(':rua', $this->rua);
            $stmt->bindParam(':numero', $this->numero);
            $stmt->bindParam(':bairro', $this->bairro);
            $stmt->bindParam(':complemento', $this->complemento);
            $stmt->bindParam(':cep', $this->cep);
            $stmt->bindParam(':cidade', $this->cidade);
            $stmt->bindParam(':uf', $this->uf);
            $stmt->bindParam(':transportadora', $this->transportadora);
            $stmt->bindParam(':frete', $this->frete);
            $stmt->bindParam(':responsavel_nome', $this->responsavel_nome);
            $stmt->bindParam(':responsavel_cpf', $this->responsavel_cpf);
            $stmt->bindParam(':catGrupo', $this->catGrupo);
            $stmt->bindParam(':obs', $observacoes);
            $stmt->bindParam(':emailLogin', $this->emailLogin);

            $stmt->execute();

            http_response_code(200);
            echo json_encode(['status' => 'success']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
