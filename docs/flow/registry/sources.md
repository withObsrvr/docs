---
sidebar_position: 2
title: Sources
---

# Data Sources

Sources ingest Stellar blockchain data from various backends and stream it to processors.

## Available Sources

| Name | Type | Description | Repository |
|------|------|-------------|------------|
| stellar-live-source | gRPC Service | Streams ledgers from Stellar RPC endpoints | [ttp-processor-demo](https://github.com/withObsrvr/ttp-processor-demo) |
| stellar-live-source-datalake | gRPC Service | Streams ledgers from cloud storage (GCS/S3/FS) | [ttp-processor-demo](https://github.com/withObsrvr/ttp-processor-demo) |
| BufferedStorageSourceAdapter | Embedded | Reads ledgers from storage with buffering | [cdp-pipeline-workflow](https://github.com/withObsrvr/cdp-pipeline-workflow) |

---

## stellar-live-source

Connects to Stellar RPC endpoints and streams raw ledger data via gRPC.

### Features
- Continuous streaming from Stellar RPC
- Automatic reconnection and retry
- Health monitoring
- Prometheus metrics

### Deployment

**Docker:**
```yaml
type: stellar-live-source
image: docker.io/withobsrvr/stellar-live-source:latest
env:
  RPC_ENDPOINT: "https://soroban-testnet.stellar.org"
  NETWORK_PASSPHRASE: "Test SDF Network ; September 2015"
  GRPC_PORT: "50052"
```

**Configuration:**
```yaml
rpc_endpoint: "https://soroban-testnet.stellar.org"
network_passphrase: "Test SDF Network ; September 2015"
start_ledger: 1465402
port: 50052
health_port: 8088
```

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `RPC_ENDPOINT` | Yes | - | Stellar RPC endpoint URL |
| `NETWORK_PASSPHRASE` | Yes | - | Stellar network passphrase |
| `PORT` | No | 50052 | gRPC service port |
| `HEALTH_PORT` | No | 8088 | Health check HTTP port |
| `START_LEDGER` | No | latest | Starting ledger sequence |

### gRPC Interface

```protobuf
service RawLedgerService {
    rpc StreamRawLedgers(StreamLedgersRequest) returns (stream RawLedger) {}
}

message StreamLedgersRequest {
    uint32 start_ledger = 1;
}

message RawLedger {
    uint32 ledger_sequence = 1;
    bytes ledger_close_meta_xdr = 2;
}
```

### Use Cases
- Real-time blockchain monitoring
- Development and testing
- Live event processing
- Network analytics

---

## stellar-live-source-datalake

Streams Stellar ledger data from cloud storage backends (GCS, S3, or local filesystem).

### Features
- Multiple storage backends (GCS, S3, Backblaze B2, local filesystem)
- Efficient batch reading
- Configurable partitioning
- Flowctl integration
- Same gRPC interface as RPC source

### Deployment

**Docker:**
```yaml
type: stellar-live-source-datalake
image: docker.io/withobsrvr/stellar-live-source-datalake:latest
env:
  STORAGE_TYPE: "GCS"
  BUCKET_NAME: "stellar-ledgers"
  BUCKET_PATH: "landing/ledgers/testnet"
  NETWORK_PASSPHRASE: "Test SDF Network ; September 2015"
  GRPC_PORT: "50053"
```

### Configuration

**Google Cloud Storage:**
```yaml
storage_type: "GCS"
bucket_name: "your-bucket/landing/ledgers/testnet"
google_application_credentials: "/path/to/credentials.json"
network_passphrase: "Test SDF Network ; September 2015"
```

**Amazon S3:**
```yaml
storage_type: "S3"
bucket_name: "stellar-ledgers"
aws_region: "us-east-1"
aws_access_key_id: "${AWS_ACCESS_KEY_ID}"
aws_secret_access_key: "${AWS_SECRET_ACCESS_KEY}"
network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Local Filesystem:**
```yaml
storage_type: "FS"
bucket_name: "/path/to/ledger/data"
network_passphrase: "Test SDF Network ; September 2015"
```

**MinIO / S3-Compatible:**
```yaml
storage_type: "S3"
bucket_name: "stellar-ledgers"
s3_endpoint_url: "http://localhost:9000"
s3_force_path_style: "true"
aws_access_key_id: "minioadmin"
aws_secret_access_key: "minioadmin"
```

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `STORAGE_TYPE` | Yes | - | Storage backend: GCS, S3, or FS |
| `BUCKET_NAME` | Yes | - | Bucket name or filesystem path |
| `NETWORK_PASSPHRASE` | Yes | - | Stellar network passphrase |
| `PORT` | No | 50052 | gRPC service port |
| `HEALTH_PORT` | No | 8088 | Health check HTTP port |
| `AWS_REGION` | If S3 | - | AWS region |
| `S3_ENDPOINT_URL` | No | - | Custom S3 endpoint (e.g., MinIO) |
| `S3_FORCE_PATH_STYLE` | No | false | Use path-style S3 URLs |
| `LEDGERS_PER_FILE` | No | 64 | Ledgers per storage file |
| `FILES_PER_PARTITION` | No | 10 | Files per partition |
| `ENABLE_FLOWCTL` | No | false | Enable flowctl integration |
| `FLOWCTL_ENDPOINT` | If flowctl | - | Control plane endpoint |

### Use Cases
- Historical data processing
- Backfill operations
- Cost-effective analytics
- Multi-cloud deployments
- Archived data analysis

---

## BufferedStorageSourceAdapter

Embedded Go source for reading ledger data from cloud storage with buffering and parallel processing.

### Features
- Built into cdp-pipeline-workflow
- Parallel ledger reading
- Configurable worker pool
- Support for GCS, S3, and local storage
- Range-based processing

### Configuration

```yaml
source:
  type: BufferedStorageSourceAdapter
  config:
    bucket_name: "stellar-ledgers/landing/ledgers/testnet"
    network: "testnet"
    num_workers: 10
    start_ledger: 1465402
    end_ledger: 1465500
    storage_type: "GCS"
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `bucket_name` | string | Yes | - | Bucket name and path |
| `network` | string | Yes | - | Network: testnet, mainnet |
| `num_workers` | int | No | 5 | Number of parallel readers |
| `start_ledger` | uint32 | Yes | - | Starting ledger sequence |
| `end_ledger` | uint32 | No | -1 | Ending ledger (-1 for continuous) |
| `storage_type` | string | No | GCS | Storage backend type |

### Use Cases
- Single-binary deployments
- Development workflows
- Batch processing jobs
- Cost-optimized processing

---

## Choosing a Source

### Use stellar-live-source when:
- ✅ You need real-time data
- ✅ You want the latest ledgers immediately
- ✅ You're building live monitoring tools
- ✅ Network costs are acceptable

### Use stellar-live-source-datalake when:
- ✅ You're processing historical data
- ✅ You need cost-effective high-volume processing
- ✅ Data is already archived in storage
- ✅ You want to avoid RPC rate limits
- ✅ You need multi-cloud flexibility

### Use BufferedStorageSourceAdapter when:
- ✅ You want a single-binary deployment
- ✅ You're doing batch processing
- ✅ You don't need service orchestration
- ✅ You want maximum control and simplicity

---

## Next Steps

- **Processors**: See [available processors](./processors.md) to transform your data
- **Examples**: Check [pipeline examples](./examples.md) for complete configurations
- **Custom Sources**: Learn to build your own in [Building Custom Components](./building-components.md)
