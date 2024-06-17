//@ts-ignore
import { Kafka, KafkaConfig } from 'kafkajs';

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

function currentJPDate() {
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

export async function sendMessage(action: string) {
    const kafkaConfig: KafkaConfig = { brokers: ['kafka:9092'], clientId: 'pyspark' }
    const kafka = new Kafka(kafkaConfig)
    const message = {
        key: `2024-6-17`,
        value: `{"name": "yuki"}`,
        action: `${action}`,
    }
    const producer = kafka.producer()
    await producer.connect()
    producer.send({ topic: 'pyspark-topic', messages: [message] })
    await producer.disconnect()
}
