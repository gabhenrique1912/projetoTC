<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");


error_reporting(0);
ini_set('display_errors', 0);

require 'conexao.php';

//logica de só aparecer produtos ativos
$sql = "SELECT id, codigo, nome_produto, tempo_garantia, ativo 
        FROM produto 
        WHERE ativo = 'ativo' 
        ORDER BY id DESC";
$resultado = mysqli_query($conn, $sql);

$produtos = [];

if ($resultado) {
    while ($linha = mysqli_fetch_assoc($resultado)) {
        $linha['id'] = (int)$linha['id'];
        $produtos[] = $linha;
    }
}

echo json_encode($produtos);

mysqli_close($conn);
exit;