<?php

header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db   = "teste_telecontrol";
$user = "root";
$pass = "";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    echo json_encode([
        "success" => false,
        "message" => "Erro na conexão",
        "erro" => mysqli_connect_error()
    ]);
    exit;
}