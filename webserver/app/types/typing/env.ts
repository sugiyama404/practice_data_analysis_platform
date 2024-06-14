import MysqlConnect from "@/../types/typing/env.d"
declare type MysqlConnect = typeof MysqlConnect

export const DbConn: MysqlConnect = {
    //@ts-ignore
    host: process.env.DATABASE_HOST as string,
    port: 3306,
    //@ts-ignore
    user: process.env.DATABASE_USER as string,
    //@ts-ignore
    password: process.env.DATABASE_PASSWORD as string,
    //@ts-ignore
    database: process.env.DATABASE_NAME as string
}

