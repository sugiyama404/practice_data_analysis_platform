export interface MysqlConnect {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
}

export const DbConn: MysqlConnect = {
    host: process.env.DATABASE_HOST as string,
    port: 3306,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string
}
