#!/usr/bin/env python
# coding: utf-8
from pyspark.sql import SparkSession

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

    df=spark.read.parquet("/tmp/share_file/datalake/orders/")
    df.coalesce(1).write.mode('overwrite').csv("/tmp/share_file/datamart/orders/")

    spark.stop()

if __name__ == '__main__':
    main()
