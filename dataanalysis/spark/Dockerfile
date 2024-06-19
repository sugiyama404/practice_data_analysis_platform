FROM openjdk:8

# 環境変数を設定
ENV DEBIAN_FRONTEND=noninteractive
ENV EMBULK_VERSION=0.9.25
ENV DIGDAG_VERSION=0.10.4
ENV PYSPARK_VERSION=3.2.4
ENV SPARK_HOME=/opt/spark
ENV DIGDAG_HOME=/opt/digdag
ENV KAFKA_VERSION=3.0.2 \
    SCALA_VERSION=2.13
ENV KAFKA_HOME=/opt/kafka

# 必要なツールと依存関係をインストール
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    git \
    python3 \
    python3-pip \
    mariadb-server \
    unzip \
    vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Embulkをインストール
RUN curl -o /usr/local/bin/embulk -L "https://dl.embulk.org/embulk-${EMBULK_VERSION}.jar" && \
    chmod +x /usr/local/bin/embulk

# Embulk用の設定ディレクトリとファイルを作成
RUN mkdir -p /root/.embulk/lib/gems && \
    mkdir -p /root/.embulk/lib/m2/repository && \
    echo 'gem_home: /root/.embulk/lib/gems' > /root/.embulk/embulk.properties && \
    echo 'gem_path: ""' >> /root/.embulk/embulk.properties && \
    echo 'm2_repo: /root/.embulk/lib/m2/repository' >> /root/.embulk/embulk.properties

# Digdagをインストール
RUN curl -o /usr/local/bin/digdag --create-dirs -L "https://dl.digdag.io/digdag-${DIGDAG_VERSION}" && \
    chmod +x /usr/local/bin/digdag

RUN mkdir -p ${DIGDAG_HOME}
COPY server.properties ${DIGDAG_HOME}/

# PySparkをインストール
RUN pip3 install --no-cache-dir pyspark==$PYSPARK_VERSION

# Sparkをダウンロードして配置
RUN curl -o /tmp/spark.tgz -L "https://archive.apache.org/dist/spark/spark-${PYSPARK_VERSION}/spark-${PYSPARK_VERSION}-bin-hadoop3.2.tgz" && \
    mkdir -p $SPARK_HOME && \
    tar -xzf /tmp/spark.tgz -C $SPARK_HOME --strip-components=1 && \
    rm /tmp/spark.tgz

# Kafkaをダウンロードして配置
RUN curl -o /tmp/kafka.tgz -L "https://archive.apache.org/dist/kafka/${KAFKA_VERSION}/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz" && \
    mkdir -p $KAFKA_HOME && \
    tar -xzf /tmp/kafka.tgz -C $KAFKA_HOME --strip-components=1 && \
    rm /tmp/kafka.tgz

# 必要な環境変数を設定
ENV PATH $PATH:/usr/local/bin:$SPARK_HOME/bin:$KAFKA_HOME/bin
ENV PYTHONPATH=$SPARK_HOME/python:$PYTHONPATH

# Embulkプラグインをインストール
RUN embulk gem install JRuby-OpenSSL \
    embulk-input-mysql embulk-output-mysql \
    embulk-output-parquet

# spark session用のディレクトリ
RUN mkdir -p /tmp/spark-events \
    chmod 777 /tmp/spark-events

# TimeZone (Asia/Tokyo)の設定
ENV TZ JST-9

# 作業ディレクトリを設定
WORKDIR /home/pyspark

COPY streaming.py docker-entrypoint.sh ./

EXPOSE 65432
