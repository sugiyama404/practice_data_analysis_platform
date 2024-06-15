//@ts-ignore
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
//@ts-ignore
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // if (request.nextUrl.pathname.startsWith("/detail")
        //     && request.nextauth.token == null) {
        //     return NextResponse.rewrite(
        //         new URL("/", request.url)
        //     )
        // }
        console.log('in middleware: ', request.nextauth.token)
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)
