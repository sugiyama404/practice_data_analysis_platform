#!/usr/bin/env bash

set -euo pipefail

function docker_entrypoint() {

  sleep 10

  # Digdagサーバの起動
  digdag server --config /opt/digdag/server.properties &

  # Sparkジョブの起動
  spark-submit --packages org.apache.spark:spark-streaming_2.13:3.2.4,org.apache.spark:spark-sql-kafka-0-10_2.12:3.2.4,org.apache.spark:spark-avro_2.12:3.2.4 /home/pyspark/streaming.py &

  wait
}

function main() {
  docker_entrypoint
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
