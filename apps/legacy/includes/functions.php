<?php
require_once 'config/database.php';

function getProduct($id) {
    global $db;
    
    try {
        $query = "SELECT * FROM sanpham WHERE IDSP = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($product) {
            // Get reviews count
            $review_query = "SELECT COUNT(*) as total_reviews FROM comments WHERE postid = :id";
            $review_stmt = $db->prepare($review_query);
            $review_stmt->bindParam(':id', $id);
            $review_stmt->execute();
            $review_result = $review_stmt->fetch(PDO::FETCH_ASSOC);
            
            $product['total_reviews'] = $review_result['total_reviews'];
            $product['formatted_price'] = number_format($product['GIABAN'] * 23000, 0, ".", ",") . "₫";
            
            if (!empty($product['GIAGOC'])) {
                $product['formatted_original_price'] = number_format($product['GIAGOC'] * 23000, 0, ".", ",") . "₫";
            }
        }
        
        return $product;
    } catch (Exception $e) {
        error_log("Error getting product: " . $e->getMessage());
        return null;
    }
}

function getProducts($filters = []) {
    global $db;
    
    try {
        $query = "SELECT * FROM sanpham WHERE 1=1";
        $params = [];
        
        if (isset($filters['category']) && !empty($filters['category'])) {
            $query .= " AND category = :category";
            $params[':category'] = $filters['category'];
        }
        
        if (isset($filters['gender']) && !empty($filters['gender'])) {
            $query .= " AND GENDER = :gender";
            $params[':gender'] = $filters['gender'];
        }
        
        if (isset($filters['brand']) && !empty($filters['brand'])) {
            $query .= " AND BRAND = :brand";
            $params[':brand'] = $filters['brand'];
        }
        
        $limit = isset($filters['limit']) ? (int)$filters['limit'] : 20;
        $offset = isset($filters['offset']) ? (int)$filters['offset'] : 0;
        
        $query .= " LIMIT :limit OFFSET :offset";
        
        $stmt = $db->prepare($query);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Format prices for each product
        foreach ($products as &$product) {
            $product['formatted_price'] = number_format($product['GIABAN'] * 23000, 0, ".", ",") . "₫";
            
            if (!empty($product['GIAGOC'])) {
                $product['formatted_original_price'] = number_format($product['GIAGOC'] * 23000, 0, ".", ",") . "₫";
            }
        }
        
        return $products;
    } catch (Exception $e) {
        error_log("Error getting products: " . $e->getMessage());
        return [];
    }
}

function getRecentlyViewedProducts($user_id) {
    global $db;
    
    if (!$user_id) {
        return [];
    }
    
    try {
        // This would typically come from a user_activity table
        // For now, we'll return some sample products
        $query = "SELECT * FROM sanpham ORDER BY RAND() LIMIT 12";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($products as &$product) {
            $product['formatted_price'] = number_format($product['GIABAN'] * 23000, 0, ".", ",") . "₫";
            
            if (!empty($product['GIAGOC'])) {
                $product['formatted_original_price'] = number_format($product['GIAGOC'] * 23000, 0, ".", ",") . "₫";
            }
            
            // Get reviews count
            $review_query = "SELECT COUNT(*) as total_reviews FROM comments WHERE postid = :id";
            $review_stmt = $db->prepare($review_query);
            $review_stmt->bindParam(':id', $product['IDSP']);
            $review_stmt->execute();
            $review_result = $review_stmt->fetch(PDO::FETCH_ASSOC);
            
            $product['total_reviews'] = $review_result['total_reviews'];
        }
        
        return $products;
    } catch (Exception $e) {
        error_log("Error getting recently viewed products: " . $e->getMessage());
        return [];
    }
}
?>
