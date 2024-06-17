//@ts-ignore
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
//@ts-ignore
import { NextResponse, NextFetchEvent } from "next/server"

export default withAuth(
    function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
        const nextUrl = req.nextUrl

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
