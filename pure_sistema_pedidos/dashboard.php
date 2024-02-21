<?php
require_once(__DIR__ . '/config/connection.php');
session_start();
if (empty($_SESSION['username'])) {
    header('Location: login.php');
}

$name_consultor = $_SESSION['username'];
$id_consultor =  $_SESSION['id'];
$adm = $_SESSION['adm'];
$chave =  date('ymdHis') . $id_consultor;

$permissao;
if ($adm == 9) {
    $permissao = "Master";
} else if ($adm == 7) {
    $permissao = "Adm";
} else if ($adm == 5) {
    $permissao = "Editor(a)";
} else if ($adm == 1) {
    $permissao = "Consultor(a)";
} else if ($adm == 0) {
    $permissao = "Inativo(a)";
} else {
    header('Location: login.php');
}

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DIXI Pedidos</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css">
    <script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
    <script src="assets/js/mask.js"></script>
    <script src="assets/js/script.js"></script>
    <script src="helpers/mascaras.js"></script>
</head>

<body>
    <div class="container mt-5">
        <div class="row align-items-center">
            <div class="col-md-1">
                <img src="assets/img/dixi-logo.png" class="img-fluid">
            </div>
            <div class="col-md-4">
                <h3 class="text-center text-capitalize"><?php echo $name_consultor ?><sup class="fs-6 text-danger"><?php echo $permissao ?></sup></h3>
            </div>
            <div class="col-md-4">
                <h3 class="text-center">Cadastro de Pedidos</h3>
            </div>
            <div class="col-md-3">
                <div class="d-flex align-items-center justify-content-end gap-3">
                    <?php include(__DIR__ . "/novo_pedido_modal.php") ?>
                    <a href="logout.php" class="btn btn-danger" role="button">Sair</a>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <br />
            <table id="pedidos-table" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th width="">Status</th>
                        <th width="">Nº </th>
                        <th width="">CNPJ</th>
                        <th width="">Empresa</th>
                        <th width="">Categoria</th>
                        <th width="">Consultor</th>
                        <th width="">Login Ponto</th>
                        <th width="">Ver</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</body>

</html>