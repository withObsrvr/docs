---
sidebar_position: 1
title: Architecture Overview
displayed_sidebar: lake
---

# Architecture Overview

OBSRVR Lake implements a lambda architecture optimized for blockchain data, combining real-time streaming with batch processing to provide both low-latency queries and complete historical access.

## System Components

Lake consists of 8 interconnected microservices:

### Ingestion Layer

**stellar-postgres-ingester**
- Receives real-time ledger data via gRPC
- Writes to PostgreSQL hot buffer using UNLOGGED tables
- Optimized for high-throughput writes

### Transformation Layer

**silver-realtime-transformer**
- Polls PostgreSQL hot buffer
- Enriches and transforms raw data
- Writes to PostgreSQL silver_hot tables

**contract-event-index-transformer**
- Indexes contract events by ledger
- Enables O(1) lookups for contract queries

**index-plane-transformer**
- Creates transaction hash index
- Enables fast (~500ms) hash lookups at scale

### Cold Storage Archival

**postgres-ducklake-flusher**
- Moves data from hot buffer to cold storage
- Uses high-watermark pattern for safe, idempotent transfers
- Writes Parquet files to S3/B2

**silver-cold-flusher**
- Archives silver layer data to cold storage
- Maintains analytics-ready historical data

### Query Layer

**stellar-query-api**
- REST API for all queries
- Transparently routes to hot or cold storage
- Merges results when queries span both layers

## Data Flow

```
Stellar Network
      ↓
stellar-live-source-datalake (gRPC stream)
      ↓
stellar-postgres-ingester
      ↓
PostgreSQL Hot Buffer (UNLOGGED tables)
      ↓
      ├──→ silver-realtime-transformer → PostgreSQL Silver Hot
      │
      ├──→ postgres-ducklake-flusher → DuckLake Bronze (S3/B2)
      │
      └──→ silver-cold-flusher → DuckLake Silver (S3/B2)

stellar-query-api ←── queries both hot and cold storage
```

## High-Watermark Flush Pattern

Data moves from hot to cold storage using a safe, idempotent pattern:

1. **MARK**: Record the maximum ledger_sequence in hot storage
2. **FLUSH**: Copy all data ≤ watermark to cold storage
3. **DELETE**: Remove flushed data from hot storage
4. **VACUUM**: Periodically reclaim space

This ensures no data loss even if the process is interrupted.

## Storage Characteristics

### Hot Storage (PostgreSQL)

- **Tables**: UNLOGGED for maximum write performance
- **Retention**: ~10-20 minutes of recent data
- **Query Latency**: ~100ms
- **Purpose**: Real-time queries on recent data

### Cold Storage (DuckLake)

- **Format**: Parquet files on S3/B2
- **Partitioning**: By ledger_range for efficient pruning
- **Compression**: Snappy
- **Query Latency**: ~2 seconds
- **Purpose**: Historical queries and analytics
