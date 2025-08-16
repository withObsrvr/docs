---
sidebar_position: 2
title: PostgreSQL
---

# PostgreSQL Consumer

The PostgreSQL consumer delivers processed blockchain data to PostgreSQL databases, offering flexible schema options and enterprise-grade reliability for data storage and analytics.

## Overview

PostgreSQL is the most versatile consumer in Flow, supporting:
- **Generic schemas** for flexible data storage
- **Specialized schemas** optimized for specific data types
- **Custom schemas** for your specific requirements
- **Batch processing** for optimal performance
- **Connection pooling** for scalability

## Configuration

### Basic PostgreSQL Consumer

The standard PostgreSQL consumer stores data in a flexible JSON format.

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `connection_string` | string | Yes | - | PostgreSQL connection string |
| `batch_size` | integer | No | 5 | Records per batch (1-100) |

#### Example Configuration

```json
{
  "type": "postgres",
  "config": {
    "connection_string": "postgresql://user:password@host:5432/database?sslmode=require",
    "batch_size": 50
  }
}
```

### Connection String Format

```
postgresql://[user[:password]@][host][:port][/dbname][?param1=value1&...]
```

Common parameters:
- `sslmode`: `disable`, `require`, `verify-ca`, `verify-full`
- `connect_timeout`: Connection timeout in seconds
- `application_name`: Identify your application in pg_stat_activity

## Specialized PostgreSQL Consumers

Flow provides optimized consumers for specific data types:

### Account Data PostgreSQL

Stores Stellar account information with optimized schema.

```json
{
  "type": "account_data_postgres",
  "config": {
    "host": "localhost",
    "port": 5432,
    "database": "stellar_accounts",
    "username": "user",
    "password": "password",
    "sslmode": "require",
    "max_open_conns": 20,
    "max_idle_conns": 10
  }
}
```

### Contract Events PostgreSQL

Optimized for Soroban contract events with indexed topics.

```json
{
  "type": "contract_events_postgres",
  "config": {
    "host": "localhost",
    "port": 5432,
    "database": "contract_events",
    "username": "user",
    "password": "password"
  }
}
```

### Contract Data PostgreSQL

Supports custom schemas for contract data storage.

```json
{
  "type": "contract_data_postgres",
  "config": {
    "database_url": "postgresql://user:password@host/db",
    "table_name": "contract_storage",
    "create_table_if_not_exists": true,
    "batch_size": 100,
    "schema_config": {
      "columns": [
        {"name": "contract_id", "type": "text"},
        {"name": "key", "type": "text"},
        {"name": "value", "type": "jsonb"},
        {"name": "ledger", "type": "bigint"}
      ]
    }
  }
}
```

## Schema Design

### Generic Schema (Default)

The basic PostgreSQL consumer uses a flexible schema:

```sql
CREATE TABLE flow_data (
    id SERIAL PRIMARY KEY,
    ledger BIGINT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_flow_data_ledger ON flow_data(ledger);
CREATE INDEX idx_flow_data_timestamp ON flow_data(timestamp);
CREATE INDEX idx_flow_data_jsonb ON flow_data USING GIN(data);
```

### Custom Schema Configuration

For specialized consumers that support schema configuration:

```json
{
  "schema_config": {
    "columns": [
      {
        "name": "transaction_hash",
        "type": "text",
        "nullable": false,
        "primary_key": true
      },
      {
        "name": "amount",
        "type": "numeric",
        "nullable": false
      },
      {
        "name": "memo",
        "type": "text",
        "nullable": true
      },
      {
        "name": "created_at",
        "type": "timestamp",
        "default": "NOW()"
      }
    ],
    "indexes": [
      {
        "columns": ["created_at"],
        "type": "btree"
      },
      {
        "columns": ["memo"],
        "type": "hash",
        "where": "memo IS NOT NULL"
      }
    ]
  }
}
```

## Performance Optimization

### Batch Size Tuning

Choose batch size based on your use case:

- **Small batches (1-10)**: Lower latency, real-time updates
- **Medium batches (10-50)**: Balanced performance
- **Large batches (50-100)**: Maximum throughput

### Connection Pool Configuration

For specialized consumers:

```json
{
  "max_open_conns": 25,    // Maximum open connections
  "max_idle_conns": 5,     // Maximum idle connections
  "conn_max_lifetime": 300  // Connection lifetime in seconds
}
```

### Indexing Strategy

Create appropriate indexes for your queries:

```sql
-- For time-series queries
CREATE INDEX idx_timestamp ON your_table(timestamp DESC);

-- For filtering by specific fields
CREATE INDEX idx_account ON your_table(account_id);

-- For JSONB queries
CREATE INDEX idx_data_gin ON your_table USING GIN(data);

-- For complex queries
CREATE INDEX idx_composite ON your_table(account_id, timestamp DESC);
```

## Use Cases

### Analytics Database

```json
{
  "processor": {
    "type": "raw_transactions"
  },
  "consumer": {
    "type": "postgres",
    "config": {
      "connection_string": "postgresql://analytics:pass@analytics.db/stellar",
      "batch_size": 100
    }
  }
}
```

### Real-time Application Backend

```json
{
  "processor": {
    "type": "payments_memo",
    "config": {
      "memo_text": "app-payment"
    }
  },
  "consumer": {
    "type": "postgres",
    "config": {
      "connection_string": "postgresql://app:pass@app.db/payments",
      "batch_size": 1
    }
  }
}
```

### Historical Data Warehouse

```json
{
  "processor": {
    "type": "account_balance",
    "config": {
      "account_ids": ["GXXXX...", "GYYYY..."]
    }
  },
  "consumer": {
    "type": "postgres",
    "config": {
      "connection_string": "postgresql://warehouse:pass@warehouse.db/balances",
      "batch_size": 50
    }
  }
}
```

## Monitoring & Maintenance

### Query Performance

Monitor slow queries:

```sql
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
WHERE mean_time > 100
ORDER BY mean_time DESC;
```

### Table Maintenance

Regular maintenance tasks:

```sql
-- Analyze tables for query optimization
ANALYZE your_table;

-- Vacuum to reclaim space
VACUUM ANALYZE your_table;

-- Reindex for performance
REINDEX TABLE your_table;
```

### Connection Monitoring

Check active connections:

```sql
SELECT pid, usename, application_name, state, query_start
FROM pg_stat_activity
WHERE datname = 'your_database';
```

## Security Best Practices

1. **Use SSL/TLS**: Always set `sslmode=require` or stronger
2. **Credential Rotation**: Regularly rotate database passwords
3. **Least Privilege**: Create specific users with minimal permissions
4. **Network Security**: Use VPC/private networks when possible
5. **Audit Logging**: Enable PostgreSQL audit logging

### Example User Setup

```sql
-- Create a dedicated Flow user
CREATE USER flow_user WITH PASSWORD 'secure_password';

-- Grant minimal permissions
GRANT CONNECT ON DATABASE stellar_data TO flow_user;
GRANT USAGE ON SCHEMA public TO flow_user;
GRANT CREATE ON SCHEMA public TO flow_user;
GRANT INSERT, SELECT ON ALL TABLES IN SCHEMA public TO flow_user;
```

## Troubleshooting

### Connection Issues

**Error: Connection refused**
- Verify host and port
- Check PostgreSQL is running
- Verify firewall rules

**Error: Authentication failed**
- Check username/password
- Verify pg_hba.conf settings
- Ensure user has CONNECT permission

### Performance Issues

**Slow inserts**
- Increase batch_size
- Check for lock contention
- Review indexes (too many can slow inserts)

**High memory usage**
- Reduce batch_size
- Check for memory leaks
- Monitor connection pool size

## Related Consumers

- Redis - For real-time caching
- S3 - For data archival
- Kafka - For stream processing