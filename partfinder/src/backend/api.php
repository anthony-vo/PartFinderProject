<?php
// Allow your React app on localhost:3000 to fetch our JSON
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// Handle CORS preflight request and exit immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
require 'config.php';

$path = $_GET['q'] ?? '';

switch ($path) {
  case 'makes':
    $res = $pdo->query("SELECT DISTINCT make FROM parts ORDER BY make");
    echo json_encode($res->fetchAll(PDO::FETCH_COLUMN));
    break;
  case 'models':
    $make = $_GET['make'] ?? '';
    $res = $pdo->prepare("SELECT DISTINCT model FROM parts WHERE make = ? ORDER BY model");
    $res->execute([$make]);
    echo json_encode($res->fetchAll(PDO::FETCH_COLUMN));
    break;
  case 'types':
    $make = $_GET['make'] ?? '';
    $model = $_GET['model'] ?? '';
    $res = $pdo->prepare("SELECT DISTINCT type FROM parts WHERE make = ? AND model = ? ORDER BY type");
    $res->execute([$make, $model]);
    echo json_encode($res->fetchAll(PDO::FETCH_COLUMN));
    break;
  case 'parts':
    $make = $_GET['make'] ?? '';
    $model = $_GET['model'] ?? '';
    $type = $_GET['type'] ?? '';
    $res = $pdo->prepare("SELECT part_number FROM parts WHERE make = ? AND model = ? AND type = ?");
    $res->execute([$make, $model, $type]);
    echo json_encode($res->fetchAll(PDO::FETCH_COLUMN));
    break;
  default:
    http_response_code(404);
    echo json_encode(['Error' =>'Results not found!']);
}