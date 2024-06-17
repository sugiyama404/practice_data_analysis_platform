//@ts-ignore
import Image from "next/image";
//@ts-ignore
import "./page.module.css";
//@ts-ignore
import * as mysql from 'promise-mysql';
//@ts-ignore
import Link from 'next/link';

import { DbConn } from "@/../types/utils/env"
import { HomeItem } from "../types/typing/item.d"
import { getallitem } from "../types/utils/queries"

import { sendMessage } from "@/../types/utils/stringdate"

// async function sendMessage() {
//   const res = await fetch('http://localhost:3000/api/kafka/action', {
//     method: 'GET'
//   });
//   console.log(res)
// }

async function getAllItems() {
  const connection = await mysql.createConnection(DbConn);
  const sql = getallitem;
  const result: HomeItem[] = await connection.query(sql);
  connection.end();
  return result;
}

export default async function Home() {
  await sendMessage("index")
  const data: HomeItem[] = await getAllItems();
  return (
    <main>
      <div className="container mt-5">
        <div className="row  row-gap-3">
          {data.map((item: HomeItem) => (

            <div className="col-md-4" key={item.id}>
              <Link href={`/detail/${item.id}`} key={item.id}>
                <div className="card">
                  <Image src={item.image_path} width={218} height={256} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.jp_name}</h5>
                    <p className="card-text"><strong>価格:</strong> ¥{item.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main >
  );
}
