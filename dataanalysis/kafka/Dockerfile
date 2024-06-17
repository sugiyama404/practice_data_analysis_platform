FROM python:3.11.9-slim-bullseye

ENV KAFKA_VERSION=3.0.2 \
    SCALA_VERSION=2.13

RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless wget gnupg && \
    rm -rf /var/lib/apt/lists/*

RUN wget https://archive.apache.org/dist/kafka/${KAFKA_VERSION}/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz && \
    tar -xzf kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz && \
    mv kafka_${SCALA_VERSION}-${KAFKA_VERSION} /opt/kafka && \
    rm kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz

WORKDIR /opt/kafka

CMD ["sh", "-c", "bin/zookeeper-server-start.sh config/zookeeper.properties & bin/kafka-server-start.sh config/server.properties"]
