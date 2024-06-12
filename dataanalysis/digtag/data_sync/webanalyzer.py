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

    df=spark.read.parquet("/tmp/share_file/datalake/web_actions")
    df.createOrReplaceTempView("web_actions")
    result_df=spark.sql("select key,name,action,sendtime from web_actions LATERAL VIEW json_tuple(value,'name','action','sendtime') user as name, action,sendtime ")
    result_df.coalesce(1).write.mode('overwrite').csv("/tmp/share_file/datamart/web_actions/")

    spark.stop()

if __name__ == '__main__':
    main()
