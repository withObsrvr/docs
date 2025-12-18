---
sidebar_position: 5
title: Building Custom Components
---

# Building Custom Components

Build custom sources, processors, and sinks for Flow pipelines using the flowctl-sdk. This guide shows you how to create production-ready components that work with both Obsrvr Flow (managed) and self-hosted flowctl deployments.

## Prerequisites

- **Go 1.21+** - For building components
- **Git** - For cloning the SDK
- **Docker** (optional) - For containerized deployments

## Getting Started

### Install flowctl-sdk

```bash
# Clone the SDK
git clone https://github.com/withObsrvr/flowctl-sdk.git
cd flowctl-sdk

# Explore examples
ls -la examples/
```

The SDK provides packages for building all component types:
- `pkg/source` - Data producers
- `pkg/processor` - Data transformers
- `pkg/consumer` - Data consumers (legacy)
- `pkg/sink` - Data consumers (new)

## Architecture Overview

Components are **separate programs** that implement the flowctl component interface:

```
┌──────────────────────────────────────────────┐
│              Your Component                   │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────┐    │
│  │   Business Logic                   │    │
│  │   (Your code)                      │    │
│  └────────────────┬───────────────────┘    │
│                   │                         │
│                   ▼                         │
│  ┌────────────────────────────────────┐    │
│  │   flowctl-sdk                      │    │
│  │   • gRPC server setup              │    │
│  │   • Registration & heartbeats      │    │
│  │   • Health checks                  │    │
│  │   • Graceful shutdown              │    │
│  └────────────────────────────────────┘    │
│                                              │
└──────────────────────────────────────────────┘
```

**You focus on:** The business logic of processing data

**SDK handles:** Infrastructure, networking, health monitoring, registration

## Building a Source

Sources produce data for the pipeline (e.g., API polling, database streaming).

### Basic Source Example

```go
package main

import (
    "context"
    "log"
    "time"

    "github.com/withObsrvr/flowctl-sdk/pkg/source"
    flowpb "github.com/withObsrvr/flow-proto/gen/go/flow/v1"
)

func main() {
    // Create source with configuration
    src := source.New(source.Config{
        Name:        "my-api-source",
        Description: "Polls external API for events",
        Version:     "1.0.0",
        OutputType:  "myorg.api.event.v1",
    })

    // Set the data production function
    src.SetProduceFunc(produceData)

    // Run the source (blocks until shutdown)
    if err := src.Run(); err != nil {
        log.Fatalf("Source failed: %v", err)
    }
}

// produceData is called to generate events
func produceData(ctx context.Context) ([]*flowpb.Event, error) {
    // TODO: Fetch data from your source
    // This could be: API call, database query, message queue, etc.

    events := make([]*flowpb.Event, 0)

    // Example: Create an event
    event := &flowpb.Event{
        Id:        "event-" + time.Now().Format("20060102150405"),
        Type:      "myorg.api.event.v1",
        Timestamp: time.Now().Unix(),
        Data:      []byte(`{"key": "value"}`),
    }

    events = append(events, event)
    return events, nil
}
```

### Real-World Source Example: API Poller

```go
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "io"
    "log"
    "net/http"
    "os"
    "time"

    "github.com/withObsrvr/flowctl-sdk/pkg/source"
    flowpb "github.com/withObsrvr/flow-proto/gen/go/flow/v1"
)

type APIResponse struct {
    ID        string    `json:"id"`
    Timestamp time.Time `json:"timestamp"`
    Data      string    `json:"data"`
}

func main() {
    apiEndpoint := os.Getenv("API_ENDPOINT")
    pollInterval := getEnvDuration("POLL_INTERVAL", 5*time.Second)

    src := source.New(source.Config{
        Name:        "api-poller-source",
        Description: "Polls external API for events",
        Version:     "1.0.0",
        OutputType:  "myorg.api.event.v1",
    })

    src.SetProduceFunc(func(ctx context.Context) ([]*flowpb.Event, error) {
        // Wait for poll interval
        time.Sleep(pollInterval)

        // Call API
        resp, err := http.Get(apiEndpoint)
        if err != nil {
            return nil, fmt.Errorf("API call failed: %w", err)
        }
        defer resp.Body.Close()

        body, err := io.ReadAll(resp.Body)
        if err != nil {
            return nil, fmt.Errorf("reading response failed: %w", err)
        }

        var apiResp APIResponse
        if err := json.Unmarshal(body, &apiResp); err != nil {
            return nil, fmt.Errorf("parsing response failed: %w", err)
        }

        // Convert to flowctl event
        event := &flowpb.Event{
            Id:        apiResp.ID,
            Type:      "myorg.api.event.v1",
            Timestamp: apiResp.Timestamp.Unix(),
            Data:      body,
        }

        log.Printf("Produced event: %s", event.Id)
        return []*flowpb.Event{event}, nil
    })

    if err := src.Run(); err != nil {
        log.Fatalf("Source failed: %v", err)
    }
}

func getEnvDuration(key string, defaultVal time.Duration) time.Duration {
    val := os.Getenv(key)
    if val == "" {
        return defaultVal
    }
    duration, err := time.ParseDuration(val)
    if err != nil {
        log.Printf("Invalid duration for %s: %v, using default", key, err)
        return defaultVal
    }
    return duration
}
```

### Configuration

```yaml
sources:
  - id: api-poller
    command: ["/path/to/bin/api-poller"]
    env:
      # flowctl integration
      ENABLE_FLOWCTL: "true"
      FLOWCTL_ENDPOINT: "127.0.0.1:8080"
      PORT: ":50051"
      HEALTH_PORT: "8088"

      # Source-specific config
      API_ENDPOINT: "https://api.example.com/events"
      POLL_INTERVAL: "5s"
```

## Building a Processor

Processors transform data as it flows through the pipeline.

### Basic Processor Example

```go
package main

import (
    "context"
    "log"

    "github.com/withObsrvr/flowctl-sdk/pkg/processor"
    flowpb "github.com/withObsrvr/flow-proto/gen/go/flow/v1"
)

func main() {
    proc := processor.New(processor.Config{
        Name:        "my-processor",
        Description: "Transforms events",
        Version:     "1.0.0",
        InputType:   "myorg.data.v1",
        OutputType:  "myorg.processed.v1",
    })

    // Set the processing function
    proc.SetProcessFunc(processEvent)

    // Run the processor
    if err := proc.Run(); err != nil {
        log.Fatalf("Processor failed: %v", err)
    }
}

// processEvent transforms a single event
func processEvent(ctx context.Context, event *flowpb.Event) ([]*flowpb.Event, error) {
    // Transform the event
    transformedEvent := &flowpb.Event{
        Id:        event.Id + "-processed",
        Type:      "myorg.processed.v1",
        Timestamp: event.Timestamp,
        Data:      event.Data, // Add your transformation logic
    }

    return []*flowpb.Event{transformedEvent}, nil
}
```

### Real-World Processor Example: Event Filter

```go
package main

import (
    "context"
    "encoding/json"
    "log"
    "os"
    "strings"

    "github.com/withObsrvr/flowctl-sdk/pkg/processor"
    flowpb "github.com/withObsrvr/flow-proto/gen/go/flow/v1"
)

type EventData struct {
    Type   string `json:"type"`
    Value  string `json:"value"`
    Status string `json:"status"`
}

func main() {
    filterType := os.Getenv("FILTER_TYPE")
    filterStatus := os.Getenv("FILTER_STATUS")

    proc := processor.New(processor.Config{
        Name:        "event-filter",
        Description: "Filters events by type and status",
        Version:     "1.0.0",
        InputType:   "myorg.event.v1",
        OutputType:  "myorg.event.v1",
    })

    proc.SetProcessFunc(func(ctx context.Context, event *flowpb.Event) ([]*flowpb.Event, error) {
        // Parse event data
        var data EventData
        if err := json.Unmarshal(event.Data, &data); err != nil {
            log.Printf("Failed to parse event %s: %v", event.Id, err)
            return nil, nil // Skip invalid events
        }

        // Apply filters
        if filterType != "" && !strings.EqualFold(data.Type, filterType) {
            return nil, nil // Filter out
        }

        if filterStatus != "" && !strings.EqualFold(data.Status, filterStatus) {
            return nil, nil // Filter out
        }

        log.Printf("Event %s passed filter", event.Id)
        return []*flowpb.Event{event}, nil // Pass through
    })

    if err := proc.Run(); err != nil {
        log.Fatalf("Processor failed: %v", err)
    }
}
```

### Configuration

```yaml
processors:
  - id: event-filter
    command: ["/path/to/bin/event-filter"]
    inputs: ["source-id"]
    env:
      ENABLE_FLOWCTL: "true"
      FLOWCTL_ENDPOINT: "127.0.0.1:8080"
      PORT: ":50052"
      HEALTH_PORT: "8089"

      # Processor-specific config
      FILTER_TYPE: "transfer"
      FILTER_STATUS: "success"
```

## Building a Sink

Sinks consume data and write to storage or external systems.

### Basic Sink Example

```go
package main

import (
    "context"
    "log"

    "github.com/withObsrvr/flowctl-sdk/pkg/consumer"
    flowpb "github.com/withObsrvr/flow-proto/gen/go/flow/v1"
)

func main() {
    sink := consumer.New(consumer.Config{
        Name:        "my-sink",
        Description: "Writes events to storage",
        Version:     "1.0.0",
        InputType:   "myorg.processed.v1",
    })

    // Set the consumption function
    sink.SetConsumeFunc(consumeEvent)

    // Run the sink
    if err := sink.Run(); err != nil {
        log.Fatalf("Sink failed: %v", err)
    }
}

// consumeEvent writes a single event
func consumeEvent(ctx context.Context, event *flowpb.Event) error {
    // Write event to storage
    log.Printf("Consumed event: %s", event.Id)
    return nil
}
```

### Real-World Sink Example: PostgreSQL

```go
package main

import (
    "context"
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "os"

    _ "github.com/lib/pq"
    "github.com/withObsrvr/flowctl-sdk/pkg/consumer"
    flowpb "github.com/withObsrvr/flow-proto/gen/go/flow/v1"
)

type EventData struct {
    Type      string `json:"type"`
    Value     string `json:"value"`
    Status    string `json:"status"`
    Timestamp int64  `json:"timestamp"`
}

func main() {
    // Database configuration
    dbHost := os.Getenv("POSTGRES_HOST")
    dbPort := os.Getenv("POSTGRES_PORT")
    dbName := os.Getenv("POSTGRES_DB")
    dbUser := os.Getenv("POSTGRES_USER")
    dbPass := os.Getenv("POSTGRES_PASSWORD")

    // Connect to PostgreSQL
    connStr := fmt.Sprintf("host=%s port=%s dbname=%s user=%s password=%s sslmode=disable",
        dbHost, dbPort, dbName, dbUser, dbPass)

    db, err := sql.Open("postgres", connStr)
    if err != nil {
        log.Fatalf("Database connection failed: %v", err)
    }
    defer db.Close()

    // Verify connection
    if err := db.Ping(); err != nil {
        log.Fatalf("Database ping failed: %v", err)
    }

    // Create table if not exists
    createTable := `
        CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY,
            type TEXT NOT NULL,
            value TEXT,
            status TEXT,
            timestamp BIGINT,
            raw_data JSONB,
            created_at TIMESTAMPTZ DEFAULT NOW()
        )
    `
    if _, err := db.Exec(createTable); err != nil {
        log.Fatalf("Table creation failed: %v", err)
    }

    // Create sink
    sink := consumer.New(consumer.Config{
        Name:        "postgresql-sink",
        Description: "Writes events to PostgreSQL",
        Version:     "1.0.0",
        InputType:   "myorg.event.v1",
    })

    sink.SetConsumeFunc(func(ctx context.Context, event *flowpb.Event) error {
        // Parse event data
        var data EventData
        if err := json.Unmarshal(event.Data, &data); err != nil {
            return fmt.Errorf("failed to parse event: %w", err)
        }

        // Insert into database
        query := `
            INSERT INTO events (id, type, value, status, timestamp, raw_data)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE SET
                type = EXCLUDED.type,
                value = EXCLUDED.value,
                status = EXCLUDED.status,
                timestamp = EXCLUDED.timestamp,
                raw_data = EXCLUDED.raw_data
        `

        _, err := db.ExecContext(ctx, query,
            event.Id,
            data.Type,
            data.Value,
            data.Status,
            data.Timestamp,
            event.Data,
        )

        if err != nil {
            return fmt.Errorf("database insert failed: %w", err)
        }

        log.Printf("Inserted event: %s", event.Id)
        return nil
    })

    if err := sink.Run(); err != nil {
        log.Fatalf("Sink failed: %v", err)
    }
}
```

### Configuration

```yaml
sinks:
  - id: postgresql-sink
    command: ["/path/to/bin/postgresql-sink"]
    inputs: ["processor-id"]
    env:
      ENABLE_FLOWCTL: "true"
      FLOWCTL_ENDPOINT: "127.0.0.1:8080"
      PORT: ":50053"
      HEALTH_PORT: "8090"

      # Database configuration
      POSTGRES_HOST: "localhost"
      POSTGRES_PORT: "5432"
      POSTGRES_DB: "events_db"
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "password"
```

## Building and Testing

### Build Your Component

```bash
# Build binary
go build -o bin/my-component main.go

# Make executable
chmod +x bin/my-component

# Test standalone
ENABLE_FLOWCTL=false PORT=:50051 ./bin/my-component
```

### Create Docker Image

Create `Dockerfile`:

```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o bin/my-component main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=builder /app/bin/my-component .
ENTRYPOINT ["./my-component"]
```

Build and push:

```bash
# Build image
docker build -t myorg/my-component:1.0.0 .

# Test locally
docker run -p 50051:50051 -p 8088:8088 \
  -e ENABLE_FLOWCTL=false \
  myorg/my-component:1.0.0

# Push to registry
docker push myorg/my-component:1.0.0
```

## Using in Pipelines

### Standard Pipeline Configuration

Create `pipeline.yaml`:

```yaml
apiVersion: flowctl/v1
kind: Pipeline
metadata:
  name: custom-component-pipeline
  description: Pipeline using custom components

spec:
  driver: process  # or docker, kubernetes, nomad

  sources:
    - id: my-source
      command: ["/path/to/bin/my-source"]
      env:
        ENABLE_FLOWCTL: "true"
        FLOWCTL_ENDPOINT: "127.0.0.1:8080"
        PORT: ":50051"
        HEALTH_PORT: "8088"

  processors:
    - id: my-processor
      command: ["/path/to/bin/my-processor"]
      inputs: ["my-source"]
      env:
        ENABLE_FLOWCTL: "true"
        FLOWCTL_ENDPOINT: "127.0.0.1:8080"
        PORT: ":50052"
        HEALTH_PORT: "8089"

  sinks:
    - id: my-sink
      command: ["/path/to/bin/my-sink"]
      inputs: ["my-processor"]
      env:
        ENABLE_FLOWCTL: "true"
        FLOWCTL_ENDPOINT: "127.0.0.1:8080"
        PORT: ":50053"
        HEALTH_PORT: "8090"
```

### Run with flowctl

```bash
# Install flowctl
go install github.com/withobsrvr/flowctl/cmd/flowctl@latest

# Run pipeline
flowctl run pipeline.yaml

# With debug logging
flowctl run pipeline.yaml --log-level=debug
```

## Best Practices

### Error Handling

```go
func processEvent(ctx context.Context, event *flowpb.Event) ([]*flowpb.Event, error) {
    // Check context cancellation
    select {
    case <-ctx.Done():
        return nil, ctx.Err()
    default:
    }

    // Wrap errors with context
    result, err := transform(event)
    if err != nil {
        return nil, fmt.Errorf("transform failed for event %s: %w", event.Id, err)
    }

    return result, nil
}
```

### Logging

```go
import "log"

func processEvent(ctx context.Context, event *flowpb.Event) ([]*flowpb.Event, error) {
    log.Printf("Processing event: id=%s type=%s", event.Id, event.Type)
    // ... processing logic
}
```

### Configuration Validation

```go
func main() {
    apiEndpoint := os.Getenv("API_ENDPOINT")
    if apiEndpoint == "" {
        log.Fatal("API_ENDPOINT is required")
    }

    // Validate configuration before creating component
    src := source.New(source.Config{
        Name: "api-source",
        // ...
    })
}
```

## Complete Examples

The flowctl-sdk repository includes complete working examples:

**Stellar Contract Events Pipeline** (< 5 minutes to run):
- **Location**: `flowctl-sdk/examples/contract-events-pipeline/`
- **Components**:
  - Stellar Live Source (streams ledger data)
  - Contract Events Processor (extracts contract events)
  - PostgreSQL Consumer (stores in database)
- **Demo**: `./demo.sh` runs the complete pipeline

**Other Examples**:
- `examples/stellar-live-source/` - Stellar RPC source
- `examples/contract-events-processor/` - Event extraction
- `examples/postgresql-consumer/` - Database sink

## Deploying to Obsrvr Flow

Components built with flowctl-sdk work seamlessly with Obsrvr Flow:

1. **Build and push Docker image** to a container registry
2. **Configure in Flow Console** with your image URL
3. **Deploy** - Flow handles orchestration automatically

Your component will integrate with Flow's:
- Automatic scaling
- Health monitoring
- Log streaming
- Usage tracking

## Additional Resources

- **[flowctl Documentation](https://github.com/withobsrvr/flowctl)** - Orchestrator docs
- **[flowctl-sdk Repository](https://github.com/withObsrvr/flowctl-sdk)** - SDK and examples
- **[Pipeline Examples](./examples.md)** - Complete pipeline configurations
- **[Component Registry](./overview.md)** - Browse existing components

## Next Steps

1. **Clone flowctl-sdk**: `git clone https://github.com/withObsrvr/flowctl-sdk`
2. **Run the demo**: `cd examples/contract-events-pipeline && ./demo.sh`
3. **Build your component**: Follow the examples above
4. **Test locally**: Use `flowctl run` to test your pipeline
5. **Deploy to Flow**: Push to container registry and deploy via Console

## Getting Help

- **GitHub Issues**: [flowctl-sdk issues](https://github.com/withObsrvr/flowctl-sdk/issues)
- **Documentation**: [Full SDK docs](https://github.com/withObsrvr/flowctl-sdk)
- **Support**: support@withobsrvr.com
