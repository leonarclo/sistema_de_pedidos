<?php
require_once('config.php');
require_once('db.connection.php');
require_once("Arquivos.php");
require_once("Pedidos.php");
require_once("Itens.php");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    exit;
}

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($request) {
    case API_PATH . '/buscar-pedidos':
        if ($method === 'GET') {
            $pedidos = new Pedidos();
            $pedidos->buscar();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
        break;

    case API_PATH . '/inserir-pedido':
        if ($method === 'POST') {
            $pedidos = new Pedidos();
            $pedidos->inserir();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
        break;

    case API_PATH . '/editar-pedido':
        if ($method === 'POST') {
            $pedidos = new Pedidos();
            $pedidos->inserir();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
        break;

    case API_PATH . '/buscar-arquivos':
        if ($method === 'POST') {
            $arquivos = new Arquivos();
            $arquivos->buscar();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
        break;

    case API_PATH . '/buscar-itens':
        if ($method === 'POST') {
            $itens = new Itens();
            $itens->buscar();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
        break;

    case API_PATH . '/inserir-arquivos':
        if ($method === 'POST') {
            $arquivos = new Arquivos();
            $arquivos->inserir();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Pagina nao encontrada!']);
        break;
}
