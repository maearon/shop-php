-- Clear database
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version bigint not null primary key,
  dirty boolean not null
);

-- Initialize database schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    auth0_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    image_url VARCHAR(500),
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id UUID REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(255) PRIMARY KEY,
    order_id UUID REFERENCES orders(id),
    stripe_payment_intent_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments table (for legacy compatibility)
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    postid INTEGER,
    user_id INTEGER,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Legacy products table (sanpham)
CREATE TABLE IF NOT EXISTS sanpham (
    IDSP SERIAL PRIMARY KEY,
    TENSP VARCHAR(255),
    GIABAN DECIMAL(10,2),
    GIAGOC DECIMAL(10,2),
    ANH VARCHAR(255),
    GENDER VARCHAR(50),
    AGE VARCHAR(50),
    BRAND VARCHAR(100),
    SPORTS VARCHAR(100),
    category VARCHAR(100)
);

-- Insert sample data
INSERT INTO products (name, description, price, category, brand, image_url, stock_quantity) VALUES
('Ultraboost 22', 'Premium running shoes with Boost technology', 4200000, 'Running', 'adidas', '/images/ultraboost-22.jpg', 50),
('Stan Smith', 'Classic white leather sneakers', 2500000, 'Originals', 'adidas', '/images/stan-smith.jpg', 100),
('Superstar', 'Iconic shell-toe sneakers', 2800000, 'Originals', 'adidas', '/images/superstar.jpg', 75),
('NMD R1', 'Modern street-style sneakers', 3200000, 'Originals', 'adidas', '/images/nmd-r1.jpg', 60);

INSERT INTO sanpham (TENSP, GIABAN, GIAGOC, ANH, GENDER, BRAND, SPORTS, category) VALUES
('Ultraboost 22', 182.61, 200.00, 'ultraboost-22.jpg', 'unisex', 'adidas', 'running', 'shoes'),
('Stan Smith', 108.70, NULL, 'stan-smith.jpg', 'unisex', 'adidas', 'lifestyle', 'shoes'),
('Superstar', 121.74, NULL, 'superstar.jpg', 'unisex', 'adidas', 'lifestyle', 'shoes'),
('NMD R1', 139.13, 150.00, 'nmd-r1.jpg', 'unisex', 'adidas', 'lifestyle', 'shoes');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
