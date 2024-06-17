//@ts-ignore
import { NextResponse } from 'next/server'
//@ts-ignore
import { Kafka, KafkaConfig } from 'kafkajs';

// import { currentDate } from "@/../types/utils/stringdate"



export async function GET({ params }: { params: { action: string } }) {
    const action = params.action;
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


    return NextResponse.json("ok");
}
