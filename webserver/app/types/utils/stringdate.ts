//@ts-ignore
import { Kafka, KafkaConfig } from 'kafkajs';
//@ts-ignore
import { options } from '@/api/auth/[...nextauth]/options'
//@ts-ignore
import { getServerSession } from "next-auth/next"
import { Userinfo } from "@/../../types/typing/user.d"

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

async function currentJPTime() {
    //20:08:59
    //2006-06-03 16:07:43
    const today = new Date();
    const options1: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    const options2: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const dateStr = today.toLocaleDateString('ja-JP', options1);
    const timeStr = today.toLocaleTimeString('ja-JP', options2);

    const [year, month, day] = dateStr.split('/');
    const formattedDateStr = `${year}-${month}-${day}`;
    return `${formattedDateStr} ${timeStr}`;
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
    const usrinfo: Userinfo = session?.user;
    return usrinfo;
}

export async function sendMessage(action: string) {
    const kafkaConfig: KafkaConfig = { brokers: ['kafka:9092'], clientId: 'pyspark' }
    const kafka = new Kafka(kafkaConfig)
    const usrinfo = await getUserInfo()
    const nowdate = await currentDate()
    const nowtime = await currentJPTime()
    const userInfoExists = usrinfo.id ? true : false;

    const message = {
        key: `${nowdate}`,
        value: JSON.stringify({
            userid: userInfoExists ? usrinfo.id.toString() : "999",
            userage: userInfoExists ? usrinfo.age.toString() : "999",
            usergender: userInfoExists ? usrinfo.gender : "none",
            useroccupation: userInfoExists ? usrinfo.occupation : "none",
            useraction: action,
            Actiontimestamp: nowtime
        })
    };

    const producer = kafka.producer();
    await producer.connect();
    await producer.send({ topic: 'useractionlog-topic', messages: [message] });
    await producer.disconnect();
}
