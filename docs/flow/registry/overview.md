---
sidebar_position: 1
title: Registry Overview
---

# Component Registry

The Obsrvr Flow Component Registry is a catalog of reusable data pipeline components. Similar to Terraform providers, components can be discovered, configured, and composed into powerful data processing pipelines.

## Component Types

Flow pipelines are built from three component types:

| Type | Purpose | Examples |
|------|---------|----------|
| **Sources** | Where data comes from | Stellar RPC, Data Lakes, Storage |
| **Processors** | Transform or extract data | Contract events, TTP extraction, Analytics |
| **Sinks** | Where data goes | PostgreSQL, DuckDB, ZeroMQ, Files |

## Architecture

```
Source → Processor(s) → Sink(s)
```

Components can be chained, forked, and composed into complex data flows:

```
              ┌─> Processor A ─> Sink A
Source ─> Hub ├─> Processor B ─> Sink B
              └─> Processor C ─> Sink C
```

## Deployment Models

### Standalone Components (gRPC Microservices)

Independent services that communicate via gRPC. Best for:
- Distributed deployments
- Language-agnostic pipelines
- Scalable processing
- Team boundaries

**Example:**
```yaml
apiVersion: flowctl.io/v1
kind: Pipeline
metadata:
  name: stellar-analytics
spec:
  sources:
    - id: stellar-source
      type: stellar-live-source-datalake
      image: docker.io/withobsrvr/stellar-live-source-datalake:latest

  processors:
    - id: ducklake-ingester
      type: ducklake-ingestion-obsrvr-v2
      image: docker.io/withobsrvr/ducklake-ingestion-obsrvr-v2:latest
```

### Embedded Components (Go Library)

Components built into the `cdp-pipeline-workflow` binary. Best for:
- Single-machine deployments
- Lower latency
- Simpler operations
- Development/testing

**Example:**
```yaml
pipelines:
  ContractEventPipeline:
    source:
      type: BufferedStorageSourceAdapter

    processors:
      - type: ContractEvent
        config:
          network_passphrase: "Public Global Stellar Network ; September 2015"

    consumers:
      - type: SaveToZeroMQ
        config:
          address: "tcp://127.0.0.1:5555"
```

## Component Manifest Format

Components use a standardized YAML manifest:

```yaml
apiVersion: component.flowctl.io/v1
kind: ComponentSpec
metadata:
  name: stellar-ttp-processor
  version: "1.0.0"
  description: "Extracts TTP events from Stellar ledgers"

spec:
  type: processor

  execution:
    modes: [container, native]
    default: container

  interface:
    input: arrow-flight
    output: arrow-flight

  config:
    properties:
      network:
        type: string
        enum: [mainnet, testnet]
        required: true
```

## Schemas

Flow components use **Stellar's XDR definitions** directly. No custom schemas to maintain - components work with native Stellar data structures.

## Discovering Components

Browse components by type:
- **[Sources](./sources.md)** - Data ingestion from RPC, storage, and streams
- **[Processors](./processors.md)** - Transform and extract Stellar blockchain data
- **[Sinks](./sinks.md)** - Output destinations for processed data

## Using Components

### With flowctl (Orchestration)

```bash
# Browse available components
flowctl components list

# View component details
flowctl components info stellar-live-source-datalake

# Create a pipeline
flowctl run pipeline.yaml
```

### With Docker Compose

```yaml
services:
  source:
    image: withobsrvr/stellar-live-source-datalake:latest
    environment:
      - STORAGE_TYPE=GCS
      - BUCKET_NAME=stellar-ledgers

  processor:
    image: withobsrvr/ducklake-ingestion-obsrvr-v2:latest
    depends_on:
      - source
```

### With cdp-pipeline-workflow

```bash
# Build with embedded components
go build -o pipeline

# Run with YAML config
./pipeline run config.yaml
```

## Building Custom Components

Want to create your own processor or sink? See [Building Custom Components](./building-components.md) for:
- Component development guide
- Interface requirements
- Testing strategies
- Publishing to the registry

## Getting Help

- **Documentation**: Browse component-specific pages
- **Examples**: See [Pipeline Examples](./examples.md)
- **Community**: Join our [Discord](https://discord.gg/stellar) (#obsrvr channel)
- **Issues**: Report problems on [GitHub](https://github.com/withObsrvr/)
