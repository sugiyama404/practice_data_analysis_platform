//@ts-ignore
import { NextResponse, NextRequest } from 'next/server'

//@ts-ignore
import * as mysql from 'promise-mysql';
import { DbConn } from "@/../types/utils/env"

export async function GET(request: NextRequest) {
    const req_data = await request.json();
    const { sql } = req_data;

    const connection = await mysql.createConnection(DbConn);
    const result = await connection.query(sql);
    connection.end();
    return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
    const req_data = await request.json();
    const { sql } = req_data;

    const connection = await mysql.createConnection(DbConn);
    const result = await connection.query(sql);
    connection.end();
    return NextResponse.json(result);
}

export async function PUT(request: NextRequest) {
    const req_data = await request.json();
    const { sql } = req_data;

    const connection = await mysql.createConnection(DbConn);
    const result = await connection.query(sql);
    connection.end();
    return NextResponse.json(result);
}
