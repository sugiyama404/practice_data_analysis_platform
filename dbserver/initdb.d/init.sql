DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS order_items;

-- ユーザーテーブル
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 商品テーブル
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) DEFAULT NULL,
    jp_name VARCHAR(100) DEFAULT NULL,
    description TEXT,
    image_path VARCHAR(255),
    price INT DEFAULT 0,
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- 注文テーブル
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT 0,
    total_price INT DEFAULT 0,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 注文明細テーブル（各注文に含まれる商品）
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT DEFAULT 0,
    item_id INT DEFAULT 0,
    quantity INT DEFAULT 0,
    price INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ユーザーデータを挿入
INSERT INTO users (username, email, password) VALUES
('alice', 'alice@example.com', 'hashed_password1'),
('bob', 'bob@example.com', 'hashed_password2'),
('charlie', 'charlie@example.com', 'hashed_password3');


-- 商品データを挿入
INSERT INTO items (name, jp_name, description, image_path, price, stock_quantity) VALUES
('ballpen1', 'ボールペン1', 'High quality ballpen1', 'images/ballpen1.png', 500, 100),
('ballpen2', 'ボールペン2', 'High quality ballpen2', 'images/ballpen2.png', 600, 150),
('fountainpen', '万年筆', 'Luxury fountainpen', 'images/fountainpen.png', 1200, 50),
('mechanicalpencil', 'シャープペンシル', 'Durable mechanical pencil', 'images/mechanicalpencil.png', 300, 200),
('glasspen', 'ガラスペン', 'Elegant glass pen', 'images/glasspen.png', 1500, 30),
('pencil', '鉛筆', 'Classic pencil', 'images/pencil.png', 100, 500);

