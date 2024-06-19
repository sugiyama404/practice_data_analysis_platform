'use client';
//@ts-ignore
import { useSession, signIn, signOut } from "next-auth/react";
//@ts-ignore
import Link from 'next/link';

export default function Hamburger() {
    const { data: session } = useSession();

    return (
        <>
            {session ? (
                <div>
                    <Link href="/basket">
                        <button type="button" className="btn btn-primary btn-outline-light">カート</button>
                    </Link>
                    <button type="button" className="btn btn-primary btn-outline-light" onClick={() => signOut({ callbackUrl: '/' })} >Log Out</button>
                </div>
            ) : (
                <button type="button" className="btn btn-primary btn-outline-light" onClick={() => signIn()}>Log In</button>
            )}
        </>
    );
}
