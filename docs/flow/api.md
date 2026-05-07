---
sidebar_position: 4
title: Pipeline API
---

# Flow Pipeline API

The Flow Pipeline API creates and manages Flow pipelines from YAML. Use it for CI/CD and infrastructure-as-code workflows when pipeline definitions should live outside the Console UI.

:::warning Rotate exposed credentials
The example pipeline file shared during this docs update contained live PostgreSQL credentials. Rotate that database password before committing or sharing any derived examples. The examples below are sanitized.
:::

## Base URL

```bash
export CONSOLE="https://console.withobsrvr.com"
export API_KEY="your-team-api-key"
```

All requests use a Team API key from Console.

```bash
Authorization: Api-Key $API_KEY
```

Do not pass API keys in URL parameters.

## Pipeline YAML format

The Pipeline API accepts Kubernetes-style Flow resources with `apiVersion`, `kind`, `metadata`, and `spec`. Use registry component IDs, such as `contract_event` and `contract_events_postgres`, rather than runtime adapter class names.

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

Use placeholders or secret injection for credentials. Do not commit live passwords.

## Quick start: validate and apply

Create `contract-events-to-postgres.yaml` using the shape above.

Validate it:

```bash
curl -X POST \
  -H "Authorization: Api-Key $API_KEY" \
  -H "Content-Type: text/yaml" \
  --data-binary @contract-events-to-postgres.yaml \
  "$CONSOLE/api/v1/flow/pipelines/validate/"
```

Apply it and start processing:

```bash
curl -X POST \
  -H "Authorization: Api-Key $API_KEY" \
  -H "Content-Type: text/yaml" \
  --data-binary @contract-events-to-postgres.yaml \
  "$CONSOLE/api/v1/flow/pipelines/apply/?auto_start=true"
```

`apply` is idempotent by pipeline name. It creates the pipeline if it does not exist and updates it if it does.

## Endpoints

### Pipelines

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/flow/pipelines/` | List team pipelines |
| POST | `/api/v1/flow/pipelines/` | Create a new pipeline |
| GET | `/api/v1/flow/pipelines/{uuid}/` | Get pipeline details |
| PUT | `/api/v1/flow/pipelines/{uuid}/` | Update a stopped pipeline |
| DELETE | `/api/v1/flow/pipelines/{uuid}/` | Delete a pipeline |
| POST | `/api/v1/flow/pipelines/{uuid}/start/` | Start a pipeline |
| POST | `/api/v1/flow/pipelines/{uuid}/stop/` | Stop a pipeline |
| GET | `/api/v1/flow/pipelines/{uuid}/config/` | Export pipeline YAML |
| POST | `/api/v1/flow/pipelines/apply/` | Idempotent create/update by name |
| POST | `/api/v1/flow/pipelines/validate/` | Validate config without creating |

### Registry

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/flow/registry/processors/` | List available processors and config schemas |
| GET | `/api/v1/flow/registry/consumers/` | List available consumers and config schemas |

### Secrets

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/secrets/` | Create or update a secret |
| GET | `/api/v1/secrets/` | List secret paths, never values |
| GET | `/api/v1/secrets/{path}/` | Check whether a secret exists |
| DELETE | `/api/v1/secrets/{path}/` | Delete a secret |

## Spec configuration

The API derives the ledger source adapter from the selected network and ledger range.

| Field | Description |
|-------|-------------|
| `metadata.name` | Pipeline name. `apply` matches existing pipelines by name. |
| `spec.network` | `testnet` or `mainnet`. |
| `spec.startLedger` | First ledger to process, or `latest` / `genesis`. |
| `spec.endLedger` | Optional final ledger. Omit for continuous processing. Must be greater than `startLedger` when both are numeric. |
| `spec.processors` | Processor list using registry IDs. |
| `spec.consumers` | Consumer list using registry IDs. |

## Processor configuration

Processors transform source records into the shape consumers expect.

```yaml
processors:
  - type: contract_event
    config:
      network_passphrase: Test SDF Network ; September 2015
```

Use the processor registry endpoint to discover available processor types.

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/registry/processors/"
```

## Consumer configuration

Consumers write processed records to a destination.

```yaml
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

Use the consumer registry endpoint to discover available consumer types.

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/registry/consumers/"
```

## Historical backfill

Set both `startLedger` and `endLedger` to process a bounded range. The pipeline completes after the final ledger.

```yaml
apiVersion: flow.obsrvr.com/v1
kind: Pipeline
metadata:
  name: ContractEventBackfill
spec:
  network: testnet
  startLedger: "2434280"
  endLedger: "2435000"
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

## Start, stop, and export

```bash
# Start
curl -X POST -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/pipelines/$PIPELINE_UUID/start/"

# Stop
curl -X POST -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/pipelines/$PIPELINE_UUID/stop/"

# Export YAML
curl -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/pipelines/$PIPELINE_UUID/config/"
```

## Responses

Create/apply success:

```json
{
  "pipeline_id": "47d6e2c8-8fb8-46a5-9222-932f2f9d7ac9",
  "action": "created",
  "status": "running",
  "warnings": [],
  "errors": []
}
```

Validation success:

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

## Error codes

| Code | Meaning |
|------|---------|
| 400 | Invalid YAML or invalid pipeline config |
| 402 | Active subscription required to create a pipeline |
| 403 | API key is invalid or team does not match authenticated team |
| 404 | Pipeline or secret does not exist |
| 409 | Duplicate name, running pipeline update, or ambiguous apply target |
| 500 | Server error |

## CI/CD example

```yaml
name: Deploy Flow pipeline
on:
  push:
    paths:
      - pipelines/**

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate pipeline
        run: |
          curl -X POST \
            -H "Authorization: Api-Key ${{ secrets.OBSRVR_API_KEY }}" \
            -H "Content-Type: text/yaml" \
            --data-binary @pipelines/contract-events-to-postgres.yaml \
            "https://console.withobsrvr.com/api/v1/flow/pipelines/validate/"

      - name: Apply pipeline
        run: |
          curl -X POST \
            -H "Authorization: Api-Key ${{ secrets.OBSRVR_API_KEY }}" \
            -H "Content-Type: text/yaml" \
            --data-binary @pipelines/contract-events-to-postgres.yaml \
            "https://console.withobsrvr.com/api/v1/flow/pipelines/apply/?auto_start=true"
```
