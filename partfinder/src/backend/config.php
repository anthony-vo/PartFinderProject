<?php
require __DIR__ . '/vendor/autoload.php';

// Load .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Set variables
$host = $_ENV['DB_HOST'];
$database = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

$dsn = "mysql:host={$host};dbname={$database};charset=utf8mb4";

// using PDO insteal of mysqlcli
try {
  $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,]);
} catch (PDOEXCEPTION $e) {
  http_response_code(500);
  echo json_encode(['Error' => 'Database connection failed','message' => $e->getMessage()]);
  exit;
}
