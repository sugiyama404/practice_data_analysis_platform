'use client';
//@ts-ignore
import Image from "next/image";
import { DetailItem } from "@/../types/typing/item.d"
import ModalMessage from "@/components/modalmessage"

import { modallist } from "@/../types/utils/modal"

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

function AddOrder(id: number) {
    ModalAction(modallist[0].target_id)
}

interface ItemProps {
    data: DetailItem;
}

export default function Detail({ data }: ItemProps) {
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
                            <button className="btn btn-primary" onClick={() => AddOrder(data.id)}>カートに入れる</button>
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
