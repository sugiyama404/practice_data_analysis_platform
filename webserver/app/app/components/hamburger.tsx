'use client';
//@ts-ignore
import { useSession, signIn, signOut } from "next-auth/react";

export default function Hamburger() {
    const { data: session } = useSession();

    return (
        <>
            {session ? (
                <button type="button" className="btn btn-primary btn-outline-light" onClick={() => signOut({ callbackUrl: '/' })} >Log Out</button>
            ) : (
                <button type="button" className="btn btn-primary btn-outline-light" onClick={() => signIn()}>Log In</button>
            )}
        </>
    );
}
