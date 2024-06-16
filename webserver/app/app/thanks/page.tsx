//@ts-ignore
import Link from 'next/link';

export default async function Page() {
    return (
        <main>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="container text-center">
                    <h1 className="display-4 mb-4">決済完了</h1>
                    <p className="lead mb-5">ご注文ありがとうございます。</p>
                    <Link href="/basket">
                        <button type="button" className="btn btn-primary btn-lg">ホームへ</button>
                    </Link>
                </div>
            </div>
        </main >
    );
}
