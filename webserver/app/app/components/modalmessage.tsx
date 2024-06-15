'use client';

import { modalinfo } from "@/../types/typing/modalinfo.d"

interface ModalMessageProps {
    info: modalinfo;
}

export default function ModalMessage({ info }: ModalMessageProps) {
    return (
        <div className="modal fade" id={info.target_id}>
            <div className="modal-dialog">
                <div className={`modal-content bg-${info.color}`}>
                    <div className="modal-body">
                        <p>{info.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
