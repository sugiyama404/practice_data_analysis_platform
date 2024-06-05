FROM openjdk:23-ea-25-jdk-slim-bullseye

# 環境変数を設定
ENV DEBIAN_FRONTEND=noninteractive
ENV PYSPARK_VERSION=3.2.4
ENV SPARK_HOME=/opt/spark
ENV KAFKA_VERSION=2.13
ENV KAFKA_HOME=/opt/kafka

# 必要なツールと依存関係をインストール
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    git \
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Digdagをインストール
RUN curl -o /usr/local/bin/digdag --create-dirs -L "https://dl.digdag.io/digdag-latest" && \
    chmod +x /usr/local/bin/digdag

# PySparkをインストール
RUN pip3 install pyspark==$PYSPARK_VERSION

# Sparkをダウンロードして配置
RUN curl -o /tmp/spark.tgz -L "https://archive.apache.org/dist/spark/spark-${PYSPARK_VERSION}/spark-${PYSPARK_VERSION}-bin-hadoop3.tgz" && \
    mkdir -p $SPARK_HOME && \
    tar -xzf /tmp/spark.tgz -C $SPARK_HOME --strip-components=1 && \
    rm /tmp/spark.tgz

# Kafkaをダウンロードして配置
RUN curl -o /tmp/kafka.tgz -L "https://archive.apache.org/dist/kafka/${KAFKA_VERSION}/kafka_${KAFKA_VERSION}.tgz" && \
    mkdir -p $KAFKA_HOME && \
    tar -xzf /tmp/kafka.tgz -C $KAFKA_HOME --strip-components=1 && \
    rm /tmp/kafka.tgz

# 環境変数を設定
ENV PATH=$SPARK_HOME/bin:$KAFKA_HOME/bin:$PATH
ENV PYTHONPATH=$SPARK_HOME/python:$PYTHONPATH

# TimeZone (Asia/Tokyo)の設定
ENV TZ JST-9

# 作業ディレクトリを設定
WORKDIR /home/pyspark
