#!/usr/bin/env python
# coding: utf-8
from pyspark.sql import SparkSession

datalake_name = "datalake"
datamart_name = "datamart"
table_name = "web_actions"
datalake_path = f"/tmp/share_file/{datalake_name}/{table_name}"
datamart_path = f"/tmp/share_file/{datamart_name}/{table_name}"

value_column = ['userid', 'userage', 'usergender', 'useroccupation', 'useraction', 'Actiontimestamp']

sqlQuery = f"""
SELECT key, {', '.join(value_column)}
FROM web_actions
LATERAL VIEW json_tuple(value, {', '.join([f"'{col}'" for col in value_column])}) jt AS {', '.join(value_column)}
"""

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
    result_df=spark.sql(sqlQuery)
    result_df.coalesce(1).write.mode('overwrite').csv(datamart_path)

    spark.stop()

if __name__ == '__main__':
    main()
