---
sidebar_position: 1
title: Overview
---

# Flow

Flow runs custom Stellar data pipelines on Obsrvr-managed infrastructure. Use it when Lake's standard bronze, silver, and gold tables are not the shape you need, or when you need to deliver a continuous stream into your own sink.

Most teams should start with [Obsrvr Lake](/docs/lake/overview). Use Flow when you need your own processors, filters, and destinations.

## What a pipeline does

A Flow pipeline reads Stellar ledger data, applies one or more processors, and writes the result to a consumer.

```text
Stellar ledger stream
  → processor: payments_with_memo
  → consumer: PostgreSQL
```

Processors transform records. Consumers deliver records.

## Example pipeline shape

```yaml
apiVersion: flow.obsrvr.com/v1
kind: Pipeline
metadata:
  name: ContractEventsToPostgres
spec:
  network: testnet
  startLedger: "2434280"
  endLedger: "2434281"
  processors:
    - type: contract_event
      config:
        network_passphrase: Test SDF Network ; September 2015
  consumers:
    - type: contract_events_postgres
      config:
        host: postgres.example.com
        port: 5432
        connect_timeout: 30
        database: defaultdb
        username: postgres
        password: ${POSTGRES_PASSWORD}
        sslmode: require
        schema: public
        table_prefix: stellar_
```

Deploy with the Flow Pipeline API:

```bash
curl -X POST \
  -H "Authorization: Api-Key $API_KEY" \
  -H "Content-Type: text/yaml" \
  --data-binary @contract-events-to-postgres.yaml \
  "$CONSOLE/api/v1/flow/pipelines/apply/?auto_start=true"
```

## When to use Flow

Use Flow when you need to:

- push filtered Stellar activity into your own PostgreSQL database
- deliver contract events to a webhook
- run a processor that Lake does not provide yet
- keep a custom table updated continuously
- build a data product that requires your own transformation logic

Do not use Flow just to query standard Stellar analytics. Lake already provides token transfers, account snapshots, contract events, decoded transactions, and gold metrics.

## Processors

Processors are the transformation step. Examples include:

| Processor | Use it for |
|-----------|------------|
| Payments with Memo | invoice reconciliation, exchange deposit tracking, memo-based workflows |
| Contract Events | Soroban protocol monitoring, dapp event delivery |
| Raw Transactions | custom transaction indexing |
| Account Balance | account or treasury monitoring |

[See processors](/docs/flow/processors/).

## Consumers

Consumers write processed data to a destination.

| Consumer | Use it for |
|----------|------------|
| PostgreSQL | application tables, dashboards, reporting |
| Webhook | event-driven app integration |
| Kafka | internal streams and downstream processors |
| S3 | archives and batch analytics |
| Redis | low-latency cache or queue patterns |

[See consumers](/docs/flow/consumers/).

## Pricing

Flow is metered by pipeline runtime.

- `$0.003 per minute` of pipeline runtime
- first `100 pipeline-minutes` free for new users
- billing starts when a pipeline is running
- billing stops when a pipeline is stopped, completed, or failed

[See Flow pricing](/docs/flow/pricing).

## API access

Flow pipelines can be managed from Console or through the Pipeline API. The API supports validation, create, idempotent apply, update, start, stop, YAML export, registry discovery, and secrets management.

Use the API when pipeline configuration should live in source control or deploy from CI.

## Next steps

- [Create your first pipeline](/docs/flow/getting-started/quickstart)
- [Pipeline API reference](/docs/flow/api)
- [Understand pipeline concepts](/docs/flow/concepts/pipelines)
- [Query standard data with Lake instead](/docs/lake/overview)
