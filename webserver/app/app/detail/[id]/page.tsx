//@ts-ignore
import * as mysql from 'promise-mysql';
//@ts-ignore
import "../.././page.module.css";

import { DbConn } from "@/../types/typing/env.d"
import { DetailItem } from "@/../types/typing/item.d"
import { getitem } from "@/../types/utils/queries"

import Detail from "@/components/detail"

async function getItem(id: number) {
    const connection = await mysql.createConnection(DbConn);
    const sql = getitem(id);
    const result: DetailItem = await connection.query(sql);
    connection.end();
    return result[0];
}

export default async function Page({ params }: { params: { id: number } }) {
    const itemdata: DetailItem = await getItem(params.id);
    const plainItemData: DetailItem = {
        id: itemdata.id,
        name: itemdata.name,
        image_path: itemdata.image_path,
        jp_name: itemdata.jp_name,
        description: itemdata.description,
        price: itemdata.price
    };
    return (
        <main>
            <Detail data={plainItemData} />
        </main >
    );
}