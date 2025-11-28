---
sidebar_position: 5
title: Building Custom Components
---

# Building Custom Components

This guide shows you how to build custom sources, processors, and sinks for Obsrvr Flow pipelines.

## Architecture Overview

Components can be built in two ways:

### 1. Standalone Components (gRPC Microservices)

Independent services that communicate via gRPC. Best for:
- Multi-language support
- Distributed deployments
- Team autonomy
- Independent scaling

### 2. Embedded Components (Go Library)

Built into the `cdp-pipeline-workflow` binary. Best for:
- Single-machine deployments
- Lower latency
- Simpler operations
- Rapid development

---

## Building a Standalone Component

### Prerequisites

- Go 1.21+
- Protocol Buffers compiler (`protoc`)
- Docker (optional, for containerization)

### Step 1: Define Your Component Manifest

Create a `component.yaml` file:

```yaml
apiVersion: component.flowctl.io/v1
kind: ComponentSpec

metadata:
  name: my-custom-processor
  version: "1.0.0"
  namespace: myorg
  description: "Custom processor for my use case"
  author: "Your Name"
  license: "Apache-2.0"
  tags:
    - processor
    - custom

spec:
  type: processor  # or source, sink

  execution:
    modes: [container, native]
    default: container

  languages:
    go:
      version: "1.23"
      native_build:
        enabled: true
        build_command: "go build -o my-processor ./src"
        binary_path: "./my-processor"

  interface:
    upstream:
      type: grpc
      port: 8815
      protocol: stellar-ledger

    downstream:
      type: grpc
      port: 8816
      protocol: processed-events

  config:
    properties:
      network:
        type: string
        enum: ["testnet", "mainnet"]
        required: true
      batch_size:
        type: integer
        default: 100
        minimum: 1
        maximum: 1000

  resources:
    requests:
      cpu: "500m"
      memory: "512Mi"
    limits:
      cpu: "2000m"
      memory: "2Gi"

  health:
    readiness:
      http:
        path: /health/ready
        port: 8088
    liveness:
      http:
        path: /health/live
        port: 8088
```

### Step 2: Define Your Protobuf Interface

Create `protos/my_service.proto`:

```protobuf
syntax = "proto3";

package myservice;

option go_package = "github.com/myorg/my-component/gen/myservice";

// Input from upstream source
message RawLedger {
    uint32 ledger_sequence = 1;
    bytes ledger_close_meta_xdr = 2;
}

// Output to downstream consumers
message ProcessedEvent {
    uint32 ledger_sequence = 1;
    string transaction_hash = 2;
    string event_type = 3;
    bytes event_data = 4;
    int64 timestamp = 5;
}

service MyProcessorService {
    // Receive ledgers from source
    rpc StreamLedgers(stream RawLedger) returns (stream ProcessedEvent) {}
}
```

### Step 3: Implement Your Processor

Create `src/processor.go`:

```go
package main

import (
    "context"
    "fmt"
    "io"
    "log"
    "net"

    "google.golang.org/grpc"
    pb "github.com/myorg/my-component/gen/myservice"
    "github.com/stellar/go/xdr"
)

type ProcessorServer struct {
    pb.UnimplementedMyProcessorServiceServer
    config Config
}

type Config struct {
    Network   string
    BatchSize int
}

func (s *ProcessorServer) StreamLedgers(stream pb.MyProcessorService_StreamLedgersServer) error {
    for {
        // Receive raw ledger from upstream
        rawLedger, err := stream.Recv()
        if err == io.EOF {
            return nil
        }
        if err != nil {
            return err
        }

        // Process the ledger
        events, err := s.processLedger(rawLedger)
        if err != nil {
            log.Printf("Error processing ledger %d: %v", rawLedger.LedgerSequence, err)
            continue
        }

        // Send processed events downstream
        for _, event := range events {
            if err := stream.Send(event); err != nil {
                return err
            }
        }
    }
}

func (s *ProcessorServer) processLedger(rawLedger *pb.RawLedger) ([]*pb.ProcessedEvent, error) {
    // Unmarshal XDR
    var ledgerCloseMeta xdr.LedgerCloseMeta
    if err := ledgerCloseMeta.UnmarshalBinary(rawLedger.LedgerCloseMetaXdr); err != nil {
        return nil, fmt.Errorf("failed to unmarshal XDR: %w", err)
    }

    var events []*pb.ProcessedEvent

    // Extract events from transactions
    if ledgerCloseMeta.V == 1 {
        for _, txResult := range ledgerCloseMeta.V1.TxProcessing {
            // Your custom processing logic here
            event := &pb.ProcessedEvent{
                LedgerSequence:  rawLedger.LedgerSequence,
                TransactionHash: fmt.Sprintf("%x", txResult.TransactionHash),
                EventType:       "my_custom_event",
                EventData:       []byte("processed data"),
                Timestamp:       ledgerCloseMeta.V1.LedgerHeader.Header.ScpValue.CloseTime,
            }
            events = append(events, event)
        }
    }

    return events, nil
}

func main() {
    // Load configuration
    config := Config{
        Network:   getEnv("NETWORK", "testnet"),
        BatchSize: getEnvInt("BATCH_SIZE", 100),
    }

    // Create gRPC server
    lis, err := net.Listen("tcp", ":8816")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }

    grpcServer := grpc.NewServer()
    processorServer := &ProcessorServer{config: config}
    pb.RegisterMyProcessorServiceServer(grpcServer, processorServer)

    log.Printf("Processor listening on :8816")
    if err := grpcServer.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}

func getEnv(key, defaultVal string) string {
    if val := os.Getenv(key); val != "" {
        return val
    }
    return defaultVal
}

func getEnvInt(key string, defaultVal int) int {
    if val := os.Getenv(key); val != "" {
        if i, err := strconv.Atoi(val); err == nil {
            return i
        }
    }
    return defaultVal
}
```

### Step 4: Add Health Checks

Create `src/health.go`:

```go
package main

import (
    "encoding/json"
    "net/http"
)

type HealthStatus struct {
    Status  string `json:"status"`
    Version string `json:"version"`
}

func startHealthServer() {
    http.HandleFunc("/health/ready", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(HealthStatus{
            Status:  "ready",
            Version: "1.0.0",
        })
    })

    http.HandleFunc("/health/live", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(HealthStatus{
            Status:  "alive",
            Version: "1.0.0",
        })
    })

    go http.ListenAndServe(":8088", nil)
}
```

### Step 5: Create Dockerfile

Create `Dockerfile`:

```dockerfile
FROM golang:1.23-alpine AS builder

# Install dependencies
RUN apk add --no-cache git gcc musl-dev protobuf-dev

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN go build -o /my-processor ./src

# Final stage
FROM alpine:latest

RUN apk add --no-cache ca-certificates

COPY --from=builder /my-processor /usr/local/bin/

EXPOSE 8816 8088

ENTRYPOINT ["my-processor"]
```

### Step 6: Build and Test

```bash
# Generate protobuf code
protoc --go_out=. --go-grpc_out=. protos/my_service.proto

# Build binary
go build -o my-processor ./src

# Build Docker image
docker build -t myorg/my-processor:1.0.0 .

# Test locally
docker run -p 8816:8816 -p 8088:8088 \
  -e NETWORK=testnet \
  -e BATCH_SIZE=100 \
  myorg/my-processor:1.0.0
```

### Step 7: Use in Pipeline

Create `pipeline.yaml`:

```yaml
apiVersion: flowctl.io/v1
kind: Pipeline
metadata:
  name: custom-processor-pipeline

spec:
  sources:
    - id: stellar-source
      type: stellar-live-source-datalake
      image: docker.io/withobsrvr/stellar-live-source-datalake:latest
      env:
        STORAGE_TYPE: "GCS"
        BUCKET_NAME: "stellar-ledgers"

  processors:
    - id: my-processor
      type: my-custom-processor
      image: docker.io/myorg/my-processor:1.0.0
      inputs: ["stellar-source"]
      env:
        NETWORK: "testnet"
        BATCH_SIZE: "100"

  sinks:
    - id: postgres-sink
      type: postgres
      inputs: ["my-processor"]
      config:
        connection_string: "postgresql://localhost:5432/mydb"
```

---

## Building an Embedded Component

### Step 1: Add to cdp-pipeline-workflow

Clone the repository:

```bash
git clone https://github.com/withObsrvr/cdp-pipeline-workflow.git
cd cdp-pipeline-workflow
```

### Step 2: Create Your Processor

Create `processor/processor_my_custom.go`:

```go
package processor

import (
    "context"
    "fmt"

    "github.com/stellar/go/xdr"
)

type MyCustomProcessor struct {
    config MyCustomConfig
}

type MyCustomConfig struct {
    Network   string
    BatchSize int
}

func NewMyCustomProcessor(config map[string]interface{}) (*MyCustomProcessor, error) {
    network, _ := config["network"].(string)
    batchSize, _ := config["batch_size"].(int)

    return &MyCustomProcessor{
        config: MyCustomConfig{
            Network:   network,
            BatchSize: batchSize,
        },
    }, nil
}

func (p *MyCustomProcessor) Process(ctx context.Context, msg interface{}) ([]interface{}, error) {
    // Type assert to LedgerCloseMeta
    ledgerMeta, ok := msg.(*xdr.LedgerCloseMeta)
    if !ok {
        return nil, fmt.Errorf("expected *xdr.LedgerCloseMeta, got %T", msg)
    }

    var results []interface{}

    // Your processing logic here
    if ledgerMeta.V == 1 {
        for _, txResult := range ledgerMeta.V1.TxProcessing {
            // Extract and process data
            result := map[string]interface{}{
                "ledger":      ledgerMeta.V1.LedgerHeader.Header.LedgerSeq,
                "tx_hash":     fmt.Sprintf("%x", txResult.TransactionHash),
                "event_type":  "my_custom_event",
                "timestamp":   ledgerMeta.V1.LedgerHeader.Header.ScpValue.CloseTime,
            }
            results = append(results, result)
        }
    }

    return results, nil
}

func (p *MyCustomProcessor) Subscribe(ch chan interface{}) {
    // Subscribe logic if needed
}
```

### Step 3: Register Your Processor

Add to `factory.go`:

```go
func CreateProcessor(processorType string, config map[string]interface{}) (Processor, error) {
    switch processorType {
    // ... existing cases ...
    case "MyCustomProcessor":
        return processor.NewMyCustomProcessor(config)
    // ... rest of cases ...
    }
}
```

### Step 4: Add Configuration Types

Add to `processor/processor_types.go`:

```go
const (
    // ... existing types ...
    ProcessorTypeMyCustom ProcessorType = "MyCustomProcessor"
)
```

### Step 5: Use in Configuration

Create `config.yaml`:

```yaml
pipelines:
  MyCustomPipeline:
    source:
      type: BufferedStorageSourceAdapter
      config:
        bucket_name: "stellar-ledgers/testnet"
        network: "testnet"
        start_ledger: 1465402

    processors:
      - type: MyCustomProcessor
        config:
          network: "testnet"
          batch_size: 100

    consumers:
      - type: SaveToPostgreSQL
        config:
          host: "localhost"
          database: "mydb"
```

### Step 6: Build and Run

```bash
# Build
go build -o pipeline

# Run
./pipeline run config.yaml
```

---

## Best Practices

### Error Handling

```go
func (p *MyProcessor) Process(ctx context.Context, msg interface{}) ([]interface{}, error) {
    // Always check context cancellation
    select {
    case <-ctx.Done():
        return nil, ctx.Err()
    default:
    }

    // Type assertions with checks
    ledgerMeta, ok := msg.(*xdr.LedgerCloseMeta)
    if !ok {
        return nil, fmt.Errorf("unexpected message type: %T", msg)
    }

    // Wrap errors with context
    results, err := p.processLedger(ledgerMeta)
    if err != nil {
        return nil, fmt.Errorf("failed to process ledger %d: %w",
            ledgerMeta.LedgerSeq(), err)
    }

    return results, nil
}
```

### Logging

```go
import "go.uber.org/zap"

type MyProcessor struct {
    logger *zap.Logger
}

func (p *MyProcessor) Process(ctx context.Context, msg interface{}) ([]interface{}, error) {
    p.logger.Info("processing ledger",
        zap.Uint32("ledger", ledgerMeta.LedgerSeq()),
        zap.Int("tx_count", len(transactions)),
    )
}
```

### Metrics

```go
import "github.com/prometheus/client_golang/prometheus"

var (
    ledgersProcessed = prometheus.NewCounter(
        prometheus.CounterOpts{
            Name: "ledgers_processed_total",
            Help: "Total number of ledgers processed",
        },
    )
    processingDuration = prometheus.NewHistogram(
        prometheus.HistogramOpts{
            Name: "ledger_processing_duration_seconds",
            Help: "Duration of ledger processing",
        },
    )
)

func (p *MyProcessor) Process(ctx context.Context, msg interface{}) ([]interface{}, error) {
    start := time.Now()
    defer func() {
        processingDuration.Observe(time.Since(start).Seconds())
        ledgersProcessed.Inc()
    }()

    // Processing logic...
}
```

### Configuration Validation

```go
func NewMyProcessor(config map[string]interface{}) (*MyProcessor, error) {
    network, ok := config["network"].(string)
    if !ok || network == "" {
        return nil, fmt.Errorf("network is required")
    }

    if network != "testnet" && network != "mainnet" {
        return nil, fmt.Errorf("invalid network: %s", network)
    }

    return &MyProcessor{network: network}, nil
}
```

---

## Testing Your Component

### Unit Tests

Create `processor_test.go`:

```go
package processor

import (
    "context"
    "testing"

    "github.com/stretchr/testify/assert"
    "github.com/stellar/go/xdr"
)

func TestMyProcessor(t *testing.T) {
    config := map[string]interface{}{
        "network": "testnet",
        "batch_size": 100,
    }

    processor, err := NewMyCustomProcessor(config)
    assert.NoError(t, err)

    // Create test ledger
    ledgerMeta := &xdr.LedgerCloseMeta{
        V: 1,
        // ... populate test data
    }

    results, err := processor.Process(context.Background(), ledgerMeta)
    assert.NoError(t, err)
    assert.Greater(t, len(results), 0)
}
```

### Integration Tests

```go
func TestProcessorIntegration(t *testing.T) {
    // Start test gRPC server
    // Connect processor
    // Send test ledgers
    // Verify outputs
}
```

---

## Publishing Your Component

### To Docker Hub

```bash
# Tag your image
docker tag myorg/my-processor:1.0.0 docker.io/myorg/my-processor:1.0.0

# Push to Docker Hub
docker push docker.io/myorg/my-processor:1.0.0
```

### To GitHub Container Registry

```bash
# Tag for GHCR
docker tag myorg/my-processor:1.0.0 ghcr.io/myorg/my-processor:1.0.0

# Login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u myusername --password-stdin

# Push
docker push ghcr.io/myorg/my-processor:1.0.0
```

---

## Next Steps

- **Examples**: See [complete pipeline examples](./examples.md)
- **Existing Components**: Browse [sources](./sources.md), [processors](./processors.md), [sinks](./sinks.md)
- **Reference**: Check existing components in [ttp-processor-demo](https://github.com/withObsrvr/ttp-processor-demo) and [cdp-pipeline-workflow](https://github.com/withObsrvr/cdp-pipeline-workflow)
