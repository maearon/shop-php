<?php
// Legacy PHP service - modernized version of the original
require_once 'config/database.php';
require_once 'includes/functions.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($path_parts[0]) {
        case 'health':
            echo json_encode(['status' => 'healthy', 'service' => 'legacy']);
            break;
            
        case 'products':
            if ($method === 'GET') {
                if (isset($path_parts[1])) {
                    // Get single product
                    $product = getProduct($path_parts[1]);
                    if ($product) {
                        echo json_encode($product);
                    } else {
                        http_response_code(404);
                        echo json_encode(['error' => 'Product not found']);
                    }
                } else {
                    // Get all products with filters
                    $filters = $_GET;
                    $products = getProducts($filters);
                    echo json_encode($products);
                }
            }
            break;
            
        case 'recently-viewed':
            if ($method === 'GET') {
                $user_id = $_GET['user_id'] ?? null;
                $recently_viewed = getRecentlyViewedProducts($user_id);
                echo json_encode($recently_viewed);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}
?>
