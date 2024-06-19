from pyspark.sql import SparkSession

spark_streaming_version = "3.2.4"
spark_sql_kafka_version = "3.2.4"
spark_avro_version = "3.2.4"

libraries = f"org.apache.spark:spark-streaming_2.13:{spark_streaming_version},"
libraries += f"org.apache.spark:spark-sql-kafka-0-10_2.12:{spark_sql_kafka_version},"
libraries += f"org.apache.spark:spark-avro_2.12:{spark_avro_version}"

kafka_server_url = "kafka:9092"  # KafkaサーバーのURL
kafka_topic_name = "useractionlog-topic"  # Kafkaトピックの名前
datalake_directory_path = "/tmp/share_file/datalake/web_actions/"  # データレイクのディレクトリパス

spark = SparkSession.builder \
    .appName("etl") \
    .config("hive.exec.dynamic.partition", "true") \
    .config("hive.exec.dynamic.partition.mode", "nonstrict") \
    .config("spark.sql.session.timeZone", "JST") \
    .config("spark.ui.enabled","true") \
    .config("spark.eventLog.enabled","true") \
    .config("spark.jars.packages", libraries) \
    .enableHiveSupport() \
    .getOrCreate()

df = spark \
  .readStream \
  .format("kafka") \
  .option("kafka.bootstrap.servers", kafka_server_url) \
  .option("subscribe", kafka_topic_name) \
  .option("failOnDataLoss", "false") \
  .load()

file_stream = df \
  .selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)") \
  .writeStream \
  .format("parquet") \
  .option("path", datalake_directory_path) \
  .outputMode("append") \
  .partitionBy("key") \
  .trigger(processingTime="5 seconds") \
  .option("checkpointLocation", "/tmp/kafka/parquet/") \
  .start()

file_stream.awaitTermination()
