'use client';

//@ts-ignore
import Image from "next/image";

import { OrderDetails } from "@/../types/typing/order.d"

interface OrderDetailsProps {
    data: OrderDetails[];
}

export default function BasketCard({ data }: OrderDetailsProps) {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        {data.map((item: OrderDetails) => (
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <Image src={item.image_path} width={200} height={300} className="img-fluid rounded-start" alt="商品画像" />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h5 className="card-title">商品情報</h5>
                                            <p className="card-text">価格: {item.price} 円</p>
                                            <p className="card-text">数量: {item.quantity} 個</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">購入合計</h5>
                                <p className="card-text">合計価格: 6000円</p>
                                <button types="button" className="btn btn-primary">購入する</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
