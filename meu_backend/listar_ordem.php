<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

error_reporting(0);
ini_set('display_errors', 0);

require 'conexao.php';

$sql = "SELECT id, numero_ordem, data_abertura, nome_consumidor, cpf_consumidor, produto_id FROM ordem_servico ORDER BY id DESC";
$resultado = mysqli_query($conn, $sql);

$ordens = [];

if ($resultado) {
    while ($linha = mysqli_fetch_assoc($resultado)) {
        $linha['id'] = (int)$linha['id'];
        $linha['produto_id'] = (int)$linha['produto_id'];
        
        $ordens[] = $linha;
    }
}

echo json_encode($ordens);

mysqli_close($conn);
exit;