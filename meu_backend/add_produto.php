<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'conexao.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || empty($data->nome_produto)) {
    echo json_encode(["success" => false, "message" => "Dados incompletos"]);
    exit;
}

$nome = mysqli_real_escape_string($conn, $data->nome_produto);
$garantia = (int)$data->tempo_garantia;
$status = $data->ativo ? 'ativo' : 'inativo';
$codigo = "P-" . rand(1000, 9999);

$sql = "INSERT INTO produto (codigo, nome_produto, tempo_garantia, ativo) 
        VALUES ('$codigo', '$nome', $garantia, '$status')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["success" => true, "message" => "Produto cadastrado!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro: " . mysqli_error($conn)]);
}
?>