'use client';
//@ts-ignore
import Image from "next/image";
import { DetailItem } from "@/../types/typing/item.d"
import ModalMessage from "@/components/modalmessage"

import { modallist } from "@/../types/utils/modal"
import { IsOrder, createOrder, addItemToOrder, updateOrderTotalPrice } from "@/../types/utils/queries"

//@ts-ignore
import { useSession } from "next-auth/react";

function ModalAction(id: string) {
    //@ts-ignore
    const modal = new bootstrap.Modal(`#${id}`);
    modal.show();
    setTimeout(() => {
        setTimeout(() => {
            modal.hide();
        }, 1000);
    }, 2000);
}

async function db_requst(mth: string, sql_s: string) {
    const res = await fetch("/api/db/order", {
        method: mth,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sql: sql_s }),
    });
    return res.json();
}

async function AddOrder(itemid: number, price: number, session: any) {
    if (!session) {
        ModalAction(modallist[1].target_id)
        return
    }
    const userid = session.user.id
    const sql1 = IsOrder(userid)
    const res = await db_requst("POST", sql1)
    if (res.length == 0) {
        //ご新規
        const sql2 = createOrder(userid, price, "pending")
        await db_requst("POST", sql2)
        const sql3 = IsOrder(userid)
        const res = await db_requst("POST", sql3)
        const orderid = res[0].id
        const sql4 = addItemToOrder(orderid, itemid, 1, price)
        await db_requst("POST", sql4)
    } else {
        const sql5 = addItemToOrder(res[0]["id"], itemid, 1, price)
        await db_requst("POST", sql5)
        const sql6 = updateOrderTotalPrice(res[0]["id"])
        await db_requst("PUT", sql6)
    }

    ModalAction(modallist[0].target_id)
}

interface ItemProps {
    data: DetailItem;
}

export default function Detail({ data }: ItemProps) {
    const { data: session } = useSession();
    return (
        <>
            <div className="container mt-5 col-md-6">
                <div className="row">
                    <div className="col-md-6">
                        <Image src={data.image_path} width={300} height={400} alt={data.image_path} />
                    </div>
                    <div className="col-md-6">
                        <div>
                            <h2>{data.jp_name}</h2>
                            <p>{data.description}</p>
                            <p><strong>価格:</strong> {data.price}</p>
                            <button className="btn btn-primary" onClick={() => AddOrder(data.id, data.price, session)}>カートに入れる</button>
                        </div>
                    </div>
                </div>
            </div>
            {modallist.map((modal, index) => (
                <div key={index}>
                    <ModalMessage info={modal} />
                </div>
            ))
            }
        </>
    );
};
