//@ts-ignore
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
//@ts-ignore
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        const nextUrl = req.nextUrl
        console.log(nextUrl.pathname)
        if (nextUrl.pathname === '/basket' || nextUrl.pathname === '/thanks') {
            if (!req.nextauth.token) {
                return NextResponse.rewrite(new URL('/', req.url))
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)
