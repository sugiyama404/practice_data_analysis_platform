from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("etl") \
    .config("hive.exec.dynamic.partition", "true") \
    .config("hive.exec.dynamic.partition.mode", "nonstrict") \
    .config("spark.sql.session.timeZone", "JST") \
    .config("spark.ui.enabled","true") \
    .config("spark.eventLog.enabled","true") \
    .config("spark.jars.packages", "org.apache.spark:spark-streaming_2.13:3.2.4,org.apache.spark:spark-sql-kafka-0-10_2.12:3.2.4,org.apache.spark:spark-avro_2.12:3.2.4") \
    .enableHiveSupport() \
    .getOrCreate()

df = spark \
  .readStream \
  .format("kafka") \
  .option("kafka.bootstrap.servers", "kafka:9092") \
  .option("subscribe", "pyspark-topic") \
  .load()

file_stream = df \
  .selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)") \
  .writeStream \
  .format("parquet") \
  .option("path", "/tmp/share_file/datalake/web_actions/") \
  .outputMode("append") \
  .partitionBy("key") \
  .trigger(processingTime="5 seconds") \
  .option("checkpointLocation", "/tmp/kafka/parquet/") \
  .start()

file_stream.awaitTermination()
