//@ts-ignore
import { Kafka, KafkaConfig } from 'kafkajs';
//@ts-ignore
import { options } from '@/api/auth/[...nextauth]/options'
//@ts-ignore
import { getServerSession } from "next-auth/next"

export function currentDate(): string {
    const today = new Date();

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const dateStr = today.toLocaleDateString('ja-JP', options);

    const [year, month, day] = dateStr.split('/');
    const formattedDateStr = `${year}-${month}-${day}`;

    return formattedDateStr;
}

async function currentJPDate() {
    //2024/06/17
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const dateStr = today.toLocaleDateString('ja-JP', options);
    return dateStr;
}

async function getUserInfo() {
    // {
    //     name: 'alice',
    //     email: 'alice@example.com',
    //     sub: '1',
    //     id: 1,
    //     iat: 1718501701,
    //     exp: 1718588101,
    //     jti: '77df4422-1330-42b3-b267-654d975e8589'
    //   }
    const session = await getServerSession(options);
    const usrinfo: any = session?.user;
    return usrinfo;
}

export async function sendMessage(action: string) {
    const kafkaConfig: KafkaConfig = { brokers: ['kafka:9092'], clientId: 'pyspark' }
    const kafka = new Kafka(kafkaConfig)
    const nowdate = await currentDate()
    const message = {
        key: `${nowdate}`,
        value: `{"name": "yuki" , "action": "${action}", "sendtime": ${Date.now()}}`
    }
    const producer = kafka.producer()
    await producer.connect()
    producer.send({ topic: 'pyspark-topic', messages: [message] })
    await producer.disconnect()
}
