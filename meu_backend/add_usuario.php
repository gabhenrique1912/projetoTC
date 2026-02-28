<?php
// Configurações de cabeçalho para permitir acesso do Angular/Ionic
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Impede que erros do PHP "sujem" o retorno JSON
error_reporting(E_ALL);
ini_set('display_errors', 0);

ob_start();

// Responde ao pre-flight do navegador
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require 'conexao.php';

function cadastrarUsuario($conn) {
    // Captura os dados enviados pelo seu add-usuario.page.ts
    $input = file_get_contents("php://input");
    $dados = json_decode($input);

    // Validação de campos obrigatórios
    if (!$dados || empty($dados->nome) || empty($dados->email) || empty($dados->senha)) {
        return [
            "success" => false,
            "message" => "Todos os campos (Nome, E-mail e Senha) devem ser preenchidos."
        ];
    }

    // Escapa os dados para prevenir SQL Injection
    $nome  = mysqli_real_escape_string($conn, $dados->nome);
    $email = mysqli_real_escape_string($conn, $dados->email);
    $senha = mysqli_real_escape_string($conn, $dados->senha);

    // Verifica se o e-mail já existe na tabela 'usuario'
    $sqlVerificar = "SELECT id FROM usuario WHERE email = '$email'";
    $resultadoVerificar = mysqli_query($conn, $sqlVerificar);
    
    if (mysqli_num_rows($resultadoVerificar) > 0) {
        return [
            "success" => false,
            "message" => "Este e-mail já está em uso por outro usuário."
        ];
    }

    // Realiza o INSERT (o 'id' é AUTO_INCREMENT, então não enviamos)
    $sqlInsert = "INSERT INTO usuario (nome, email, senha) VALUES ('$nome', '$email', '$senha')";
    
    if (mysqli_query($conn, $sqlInsert)) {
        return [
            "success" => true,
            "message" => "Usuário cadastrado com sucesso!"
        ];
    } else {
        return [
            "success" => false,
            "message" => "Erro ao salvar: " . mysqli_error($conn)
        ];
    }
}

// Executa e devolve a resposta
$resposta = cadastrarUsuario($conn);

ob_clean();
echo json_encode($resposta);

mysqli_close($conn);
exit;