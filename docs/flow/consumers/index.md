---
sidebar_position: 1
title: Consumers Overview
---

# Consumers

Consumers are the destination components in Flow pipelines that receive processed blockchain data and deliver it to your applications, databases, or storage systems. Each consumer is optimized for specific use cases and integration patterns.

## Available Consumers

### Database Storage

#### [PostgreSQL](./postgresql.md)
The most versatile consumer for structured data storage. Features:
- Multiple schema options (generic, specialized)
- Batch processing for efficiency
- Automatic table creation
- Connection pooling

**Use Cases:**
- Analytics databases
- Application backends
- Historical data storage
- Reporting systems

#### Redis
High-performance in-memory storage for real-time access:
- Latest ledger information
- Real-time balance tracking
- Cache layer for applications
- Pub/sub capabilities

#### DuckDB
Embedded analytical database perfect for:
- Local analytics
- Data science workflows
- No infrastructure required
- Columnar storage efficiency

#### SQLite
Lightweight embedded database ideal for:
- Development and testing
- Edge deployments
- Single-user applications
- Portable data storage

### Streaming & Messaging

#### Webhook
HTTP endpoint delivery for real-time notifications:
- Configurable batch sizes
- Secret-based authentication
- Retry logic
- Custom headers support

**Use Cases:**
- Real-time notifications
- Microservice integration
- Third-party webhooks
- Event-driven architectures

#### Kafka
Enterprise message streaming platform:
- High-throughput data pipelines
- Multiple consumer groups
- Guaranteed delivery
- Horizontal scaling

#### ZeroMQ
Lightweight message queue for:
- High-performance IPC
- Minimal latency
- Flexible patterns (pub/sub, push/pull)
- No broker required

### Cloud Storage

#### Amazon S3
Scalable object storage for:
- Data archival
- Batch processing inputs
- Data lake architectures
- Backup and compliance

## Specialized Consumers

### PostgreSQL Schema Variants

Flow offers specialized PostgreSQL consumers with optimized schemas:

- **Account Data PostgreSQL**: Stellar account information
- **Contract Invocations PostgreSQL**: Soroban contract calls
- **Contract Events PostgreSQL**: Smart contract events
- **SwapService PostgreSQL**: DEX-specific data
- **Contract Data PostgreSQL**: Contract storage with custom schemas
- **Extracted Contract Invocations PostgreSQL**: Business data extraction

## Choosing the Right Consumer

Consider these factors when selecting a consumer:

### 1. **Data Access Patterns**
- **Real-time queries**: PostgreSQL, Redis
- **Batch analytics**: S3, DuckDB
- **Stream processing**: Kafka, Webhook
- **Embedded/Edge**: SQLite, DuckDB

### 2. **Scale Requirements**
- **High volume**: Kafka, S3
- **Moderate volume**: PostgreSQL, Webhook
- **Low volume**: SQLite, ZeroMQ

### 3. **Infrastructure**
- **Managed services**: PostgreSQL, S3
- **Self-hosted**: All options
- **No infrastructure**: SQLite, DuckDB

### 4. **Integration Needs**
- **SQL queries**: PostgreSQL, DuckDB, SQLite
- **REST APIs**: Webhook
- **Stream processing**: Kafka, ZeroMQ
- **Key-value access**: Redis

## Consumer Configuration

All consumers support configuration through the Flow pipeline builder:

```json
{
  "consumer_type": "postgres",
  "config": {
    "connection_string": "postgresql://user:pass@host/db",
    "batch_size": 100
  }
}
```

## Security Considerations

### Credential Management
- Credentials are stored securely in Vault
- Never exposed in logs or UI
- Automatic rotation support
- Encrypted in transit

### Connection Security
- TLS/SSL support for all network consumers
- Authentication mechanisms:
  - PostgreSQL: Username/password, SSL certs
  - Kafka: SASL, SSL
  - S3: IAM credentials
  - Webhook: Shared secrets

## Performance Optimization

### Batch Processing
Most consumers support batch processing for efficiency:
- Configure appropriate batch sizes
- Balance between latency and throughput
- Consider memory constraints

### Connection Pooling
Database consumers maintain connection pools:
- Reuse connections for better performance
- Configure pool sizes based on load
- Monitor connection health

### Parallel Processing
Some consumers support parallel writes:
- Kafka partitions
- S3 multipart uploads
- PostgreSQL parallel inserts

## Monitoring & Troubleshooting

### Health Checks
- Connection status monitoring
- Write failure tracking
- Latency measurements
- Queue depth (for streaming consumers)

### Common Issues
- **Connection failures**: Check credentials and network
- **Performance degradation**: Adjust batch sizes
- **Data loss**: Enable consumer acknowledgments
- **Schema mismatches**: Verify data formats

## Best Practices

1. **Start Simple**: Begin with PostgreSQL or Webhook
2. **Plan for Scale**: Choose consumers that can grow with your needs
3. **Monitor Performance**: Track metrics and adjust configurations
4. **Handle Failures**: Implement retry logic and dead letter queues
5. **Secure Credentials**: Use Vault integration for sensitive data

## Next Steps

- Explore individual consumer documentation for detailed configuration
- Check our [Getting Started Guide](../getting-started/quickstart.md) for implementation examples
- Learn about [processors](../processors) to transform your data
- Review [Flow Overview](../overview.md) for architecture details