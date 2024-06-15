//@ts-ignore
import type { NextAuthOptions } from 'next-auth'
//@ts-ignore
import CredentialsProvider from 'next-auth/providers/credentials'
//@ts-ignore
import * as mysql from 'promise-mysql';

import { DbConn } from "@/../../types/utils/env"
import { IsUser } from "@/../../types/utils/queries"
import { Userinfo } from "@/../../types/typing/user.d"


export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "your-email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-password"
                }
            },
            async authorize(credentials) {
                const res: Userinfo = await userauth(credentials?.email, credentials?.password)
                if (!res) {
                    return null
                } else {
                    const userinfo = res;
                    const user = { id: userinfo.id, name: userinfo.username, email: userinfo.email }
                    return user
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id
            }
            return session
        },
    }
}

async function userauth(email: string, password: string) {
    const connection = await mysql.createConnection(DbConn);
    const sql = IsUser(email, password);
    const res: Userinfo = await connection.query(sql);
    connection.end();
    return res[0];
}
