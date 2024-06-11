DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    product_id INT NULL,
    subtotal INT NULL,
    tax INT NULL,
    total INT NULL,
    discount INT DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quality INT NULL
);

INSERT INTO orders (user_id, product_id, subtotal, tax, total, discount, quality) VALUES
(1, 101, 1000, 80, 1080, 0.00, 5),
(2, 102, 1500, 120, 1620, 0.00, 4),
(3, 103, 2000, 160, 2160, 50.00, 3),
(4, 104, 2500, 200, 2700, 100.00, 5),
(5, 105, 3000, 240, 3240, 0.00, 2),
(6, 106, 3500, 280, 3780, 20.00, 4),
(7, 107, 4000, 320, 4320, 0.00, 5),
(8, 108, 4500, 360, 4860, 30.00, 3),
(9, 109, 5000, 400, 5400, 0.00, 4),
(10, 110, 5500, 440, 5940, 0.00, 5),
(11, 111, 6000, 480, 6480, 60.00, 2),
(12, 112, 6500, 520, 7020, 0.00, 3),
(13, 113, 7000, 560, 7560, 70.00, 4),
(14, 114, 7500, 600, 8100, 0.00, 5),
(15, 115, 8000, 640, 8640, 80.00, 2),
(16, 116, 8500, 680, 9180, 0.00, 4),
(17, 117, 9000, 720, 9720, 90.00, 3),
(18, 118, 9500, 760, 10260, 0.00, 5),
(19, 119, 10000, 800, 10800, 100.00, 4),
(20, 120, 10500, 840, 11340, 0.00, 5);
