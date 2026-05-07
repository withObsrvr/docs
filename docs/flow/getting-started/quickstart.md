---
sidebar_position: 2
title: Quickstart Guide
---

# Flow quickstart

Create a Flow pipeline from YAML and deploy it with the API. This example reads Stellar testnet ledger files, extracts Soroban contract events, and writes them to PostgreSQL.

If you only need to query decoded Stellar data, start with [Obsrvr Lake](/docs/lake/overview). Use Flow when you need a custom processor and destination.

:::warning Do not commit credentials
Pipeline files often contain database credentials. Store them in your deployment secret manager or inject them at deploy time. The examples below use placeholders.
:::

## Prerequisites

- An Obsrvr account in [Console](https://console.withobsrvr.com)
- A Team API key
- An active Flow subscription, unless your team has unbilled pipeline access
- A PostgreSQL database reachable from the Flow runtime
- `curl`

Set your environment:

```bash
export CONSOLE="https://console.withobsrvr.com"
export API_KEY="your-team-api-key"
```

All Flow API requests use:

```bash
Authorization: Api-Key $API_KEY
```

## 1. Create a pipeline file

Create `contract-events-to-postgres.yaml`:

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

This pipeline processes ledgers `2434280` through `2434281` on testnet and writes contract events to PostgreSQL tables with the `stellar_` prefix.

## 2. Validate the config

```bash
curl -X POST \
  -H "Authorization: Api-Key $API_KEY" \
  -H "Content-Type: text/yaml" \
  --data-binary @contract-events-to-postgres.yaml \
  "$CONSOLE/api/v1/flow/pipelines/validate/"
```

A valid config returns:

```json
{
  "valid": true,
  "errors": [],
  "warnings": [],
  "effective_config": {
    "apiVersion": "flow.obsrvr.com/v1",
    "kind": "Pipeline",
    "metadata": {"name": "ContractEventsToPostgres"},
    "spec": {"...": "..."}
  }
}
```

## 3. Apply and start the pipeline

```bash
curl -X POST \
  -H "Authorization: Api-Key $API_KEY" \
  -H "Content-Type: text/yaml" \
  --data-binary @contract-events-to-postgres.yaml \
  "$CONSOLE/api/v1/flow/pipelines/apply/?auto_start=true"
```

`apply` is idempotent. If `ContractEventsToPostgres` does not exist, Flow creates it. If it exists and is stopped, Flow updates it.

Response:

```json
{
  "pipeline_id": "47d6e2c8-8fb8-46a5-9222-932f2f9d7ac9",
  "action": "created",
  "status": "running",
  "warnings": [],
  "errors": []
}
```

Save the `pipeline_id` as `PIPELINE_UUID` for later commands.

```bash
export PIPELINE_UUID="47d6e2c8-8fb8-46a5-9222-932f2f9d7ac9"
```

## 4. List and inspect pipelines

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/pipelines/"
```

Get one pipeline:

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/pipelines/$PIPELINE_UUID/"
```

## 5. Stop or start the pipeline

```bash
curl -X POST -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/pipelines/$PIPELINE_UUID/stop/"

curl -X POST -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/pipelines/$PIPELINE_UUID/start/"
```

You must stop a running pipeline before updating its config.

## 6. Export the current config

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/pipelines/$PIPELINE_UUID/config/"
```

Use export to bring a Console-created pipeline into source control. Review and remove secrets before committing.

## Continuous processing

For a continuous pipeline, omit `endLedger`:

```yaml
spec:
  network: testnet
  startLedger: "2434280"
  processors:
    - type: contract_event
      config:
        network_passphrase: Test SDF Network ; September 2015
  consumers:
    - type: contract_events_postgres
      config:
        host: postgres.example.com
        port: 5432
        database: defaultdb
        username: postgres
        password: ${POSTGRES_PASSWORD}
        sslmode: require
```

## Mainnet

For mainnet, set `spec.network` and the network passphrase:

```yaml
network: mainnet
```

```yaml
network_passphrase: Public Global Stellar Network ; September 2015
```

## Next steps

- [Pipeline API reference](/docs/flow/api)
- [Pipeline concepts](/docs/flow/concepts/pipelines)
- [Processors](/docs/flow/processors/)
- [Consumers](/docs/flow/consumers/)
- [Flow pricing](/docs/flow/pricing)
