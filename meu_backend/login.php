<?php
// Headers para permitir que o Angular (Ionic) acesse o PHP
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

error_reporting(E_ALL);
ini_set('display_errors', 0);

ob_start();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require 'conexao.php';


function fazerLogin($conn) {
    $input = file_get_contents("php://input");
    $dados = json_decode($input);

    // Validação básica de campos vazios
    if (!$dados || empty($dados->email) || empty($dados->senha)) {
        return [
            "success" => false,
            "message" => "E-mail e senha não podem estar vazios."
        ];
    }

    // Sanitização para evitar SQL Injection
    $email = mysqli_real_escape_string($conn, $dados->email);
    $senha = mysqli_real_escape_string($conn, $dados->senha);

    $sql = "SELECT id, nome, email FROM usuario WHERE email = '$email' AND senha = '$senha' LIMIT 1";
    $resultado = mysqli_query($conn, $sql);

    if ($resultado && mysqli_num_rows($resultado) > 0) {
        $dadosUsuario = mysqli_fetch_assoc($resultado);
        return [
            "success" => true,
            "message" => "Login realizado com sucesso!",
            "usuario" => $dadosUsuario
        ];
    } else {
        return [
            "success" => false,
            "message" => "E-mail ou senha inválidos."
        ];
    }
}

$resposta = fazerLogin($conn);

// Limpa qualquer lixo de memória e envia apenas o JSON final
ob_clean();
echo json_encode($resposta);

mysqli_close($conn);
exit;