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
    age INT DEFAULT NULL,
    gender VARCHAR(10) DEFAULT NULL,
    occupation VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 注文明細テーブル（各注文に含まれる商品）
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT DEFAULT 0,
    item_id INT DEFAULT 0,
    quantity INT DEFAULT 0,
    price INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_order_item (order_id, item_id)
);

-- ユーザーデータを挿入
INSERT INTO users (username, email, password, age, gender, occupation) VALUES
('alice', 'alice@example.com', 'hashed_password1', 25, 'F', 'Engineer'),
('bob', 'bob@example.com', 'hashed_password2', 30, 'M', 'Designer'),
('charlie', 'charlie@example.com', 'hashed_password3', 28, 'M', 'Teacher');


-- 商品データを挿入
INSERT INTO items (name, jp_name, description, image_path, price, stock_quantity) VALUES
('Ballpoint Pen 1', 'ボールペン1', '日々の書き心地をワンランクアップさせるボールペン1。スムーズなインクフローと洗練されたデザインで、ビジネスシーンやプライベートでも大活躍間違いなし！', '/image/ballpen1.png', 1000, 50),
('Ballpoint Pen 2', 'ボールペン2', 'スタイリッシュかつ実用性を兼ね備えたボールペン2。握りやすいグリップと耐久性に優れたボディで、長時間の使用でも快適に書き続けられます。', '/image/ballpen2.png', 1200, 40),
('Fountain Pen', '万年筆', '高級感あふれる筆記体験を提供する万年筆。優雅なデザインとスムーズなインクフローが、手紙やサインを格別なものにしてくれます。', '/image/fountainpen.png', 5000, 20),
('Mechanical Pencil', 'シャープペンシル', '精密な筆記が可能なシャープペンシル。細かい作業やスケッチにも最適で、書きやすさと耐久性を両立した一本です。', '/image/mechanicalpencil.png', 800, 100),
('Glass Pen', 'ガラスペン', '繊細で美しい筆記が楽しめるガラスペン。手作りの温かみと透明感あるデザインが、書く楽しさを一層引き立てます。', '/image/glasspen.png', 3000, 30),
('Pencil', '鉛筆', 'シンプルで使いやすい鉛筆。なめらかな書き心地と自然なグリップ感で、日常のメモ書きからスケッチまで幅広く活躍します。', '/image/pencil.png', 100, 500);

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `order_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 5000, '2024-06-18 18:35:08', 'done', '2024-06-18 18:35:08', '2024-06-18 18:35:29'),
(2, 1, 2200, '2024-06-18 18:41:17', 'pending', '2024-06-18 18:41:17', '2024-06-18 18:41:23');

INSERT INTO `order_items` (`id`, `order_id`, `item_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 1, 5000, '2024-06-18 18:35:08', '2024-06-18 18:35:08'),
(2, 2, 2, 1, 1200, '2024-06-18 18:41:17', '2024-06-18 18:41:17'),
(3, 2, 1, 1, 1000, '2024-06-18 18:41:23', '2024-06-18 18:41:23');













































