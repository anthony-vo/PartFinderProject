<?php
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
  case 'types':
    $make = $_GET['make'] ?? '';
    $model = $_GET['model'] ?? '';
    $res = $pdo->prepare("SELECT DISTINCT type FROM parts WHERE make = ? AND model = ? ORDER BY type");
    $res->execute([$make, $model]);
    echo json_encode($res->fetchAll(PDO::FETCH_COLUMN));
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