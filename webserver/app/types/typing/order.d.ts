export interface OrderDetails {
    order_id: number;
    user_id: number;
    total_price: number;
    order_date: string;
    status: string;
    item_id: number;
    quantity: number;
    price: number;
    image_path: string;
}

export interface Order {
    id: number;
    user_id: number;
    total_price: number;
    order_date: string;
    status: string;
}
