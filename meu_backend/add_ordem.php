<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'conexao.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || empty($data->nome_consumidor) || empty($data->cpf_consumidor)) {
    echo json_encode(["success" => false, "message" => "Dados incompletos"]);
    exit;
}

$nome = mysqli_real_escape_string($conn, $data->nome_consumidor);
$cpf = mysqli_real_escape_string($conn, $data->cpf_consumidor);
$prod_id = (int)$data->produto_id;

$numero_ordem = "O-" . rand(1000, 9999);
$data_abertura = date('Y-m-d');

$sql = "INSERT INTO ordem_servico (numero_ordem, data_abertura, nome_consumidor, cpf_consumidor, produto_id) 
        VALUES ('$numero_ordem', '$data_abertura', '$nome', '$cpf', $prod_id)";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["success" => true, "message" => "Ordem de Serviço criada!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro no banco: " . mysqli_error($conn)]);
}
?>