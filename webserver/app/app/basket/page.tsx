//@ts-ignore
import { options } from '@/api/auth/[...nextauth]/options'
//@ts-ignore
import { getServerSession } from "next-auth/next"
//@ts-ignore
import * as mysql from 'promise-mysql';

import BasketCard from "@/components/basketcard"

import { sendMessage } from "@/../types/utils/stringdate"

import { IsOrder, getOrderDetails } from "@/../types/utils/queries"
import { DbConn } from "@/../types/utils/env"
import { OrderDetails } from "@/../types/typing/order"

async function db_requst(sql: string) {
    const connection = await mysql.createConnection(DbConn);
    const result = await connection.query(sql);
    connection.end();
    return result;
}

async function getuserid() {
    const session = await getServerSession(options);
    const usrid: number = session?.user?.id;
    return usrid;
}

async function idOrder(userid: number) {
    const sqlQuery = IsOrder(userid)
    const response = await db_requst(sqlQuery)
    return response
}

export default async function Page() {
    await sendMessage("baskets")

    const userid = await getuserid()
    const res = await idOrder(userid)
    const plainItemData: OrderDetails[] = [];
    if (res.length !== 0) {
        const orderid = res[0]["id"]
        const sqlQuery = getOrderDetails(orderid)
        const itemdata: OrderDetails[] = await db_requst(sqlQuery)
        for (const item of itemdata) {
            const plainItem: OrderDetails = {
                order_id: item.order_id,
                user_id: item.user_id,
                total_price: item.total_price,
                order_date: item.order_date,
                status: item.status,
                item_id: item.item_id,
                quantity: item.quantity,
                price: item.price,
                image_path: item.image_path
            }
            plainItemData.push(plainItem);
        }
    }
    return (
        <main>
            <h1 className="text-center mt-2">商品を購入する</h1>
            {(res.length === 0) ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="container text-center">
                        <h1 className="display-4 mb-4">お客様のカートに商品はありません。</h1>
                    </div>
                </div>
            ) : (
                <BasketCard data={plainItemData} />
            )}

        </main >
    );
}
