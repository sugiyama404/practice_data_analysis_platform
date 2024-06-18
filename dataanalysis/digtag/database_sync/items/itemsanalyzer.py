#!/usr/bin/env python
# coding: utf-8
from pyspark.sql import SparkSession

datalake_name = "datalake"
datamart_name = "datamart"
table_name = "items"
datalake_path = f"/tmp/share_file/{datalake_name}/{table_name}"
datamart_path = f"/tmp/share_file/{datamart_name}/{table_name}"

sqlQuery = f"select id, CAST(name AS string) AS name, CAST(jp_name AS string) AS jp_name, price, stock_quantity from {table_name}"

def main():
    spark = SparkSession.builder \
    .appName("etl") \
    .config("hive.exec.dynamic.partition", "true") \
    .config("hive.exec.dynamic.partition.mode", "nonstrict") \
    .config("spark.sql.session.timeZone", "JST") \
    .config("spark.ui.enabled","true") \
    .config("spark.eventLog.enabled","false") \
    .enableHiveSupport() \
    .getOrCreate()

    df=spark.read.parquet(datalake_path)
    df.createOrReplaceTempView(table_name)
    result = spark.sql(sqlQuery)
    result.coalesce(1).write.mode('overwrite').csv(datamart_path)

    spark.stop()

if __name__ == '__main__':
    main()
