// 全てのアイテムを取得するためのSQLクエリを定義
export const getallitem: string = `
    SELECT id, name, jp_name, image_path, price FROM items;
`;

// 特定のアイテムをIDで取得するための関数を定義
export const getitem = (id: number) => {
    return `
    SELECT id, name, jp_name, description, image_path, price FROM items WHERE id = ${id};
    `
}

// ユーザーが存在するか確認するための関数を定義
export const IsUser = (email: string, password: string) => {
    return `
    SELECT id, username, password, email, age, gender, occupation FROM users WHERE email = '${email}' AND password = '${password}';
    `
}

// 注文が存在するか確認するための関数を定義
export const IsOrder = (user_id: number) => {
    return `
    SELECT id, user_id, total_price, order_date, status FROM orders WHERE user_id = ${user_id} AND status = 'pending';
    `
}

//注文を作成
export const createOrder = (user_id: number, total_price: number, status: string) => {
    return `
    INSERT INTO orders (user_id, total_price, status) VALUES (${user_id}, ${total_price}, '${status}');
    `
}

//注文明細を追加
export const addItemToOrder = (order_id: number, item_id: number, quantity: number, price: number) => {
    return `
    INSERT INTO order_items (order_id, item_id, quantity, price) VALUES (${order_id}, ${item_id}, ${quantity}, ${price});
    `
}

//注文明細を追加
export const addOrUpdateOrderItem = (order_id: number, item_id: number, quantity: number, price: number): string => {
    return `
    INSERT INTO order_items (order_id, item_id, quantity, price)
    VALUES (${order_id}, ${item_id}, ${quantity}, ${price})
    ON DUPLICATE KEY UPDATE
    quantity = quantity + ${quantity},
    price = ${price},
    updated_at = CURRENT_TIMESTAMP;
    `
}


//注文の詳細を取得
export const getOrderDetails = (order_id: number): string => {
    return `
    SELECT o.id AS order_id, o.user_id, o.total_price, o.order_date, o.status,
           oi.item_id, oi.quantity, oi.price, i.image_path
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN items i ON oi.item_id = i.id
    WHERE o.id = ${order_id};
    `
}

//注文の状態を更新
export const updateOrderStatus = (order_id: number, status: string) => {
    return `
    UPDATE orders
    SET status = '${status}'
    WHERE id = ${order_id};
    `
}

//注文の合計金額を更新
export const updateOrderTotalPrice = (order_id: number) => {
    return `
    UPDATE orders o
    JOIN (
        SELECT order_id, SUM(quantity * price) AS total_price
        FROM order_items
        GROUP BY order_id
    ) oi ON o.id = oi.order_id
    SET o.total_price = oi.total_price
    WHERE o.id = ${order_id};
    `
}

