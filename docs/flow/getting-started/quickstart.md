---
sidebar_position: 2
title: Quickstart Guide
---

# Quickstart Guide

Get your first Flow pipeline running in minutes. This guide walks you through creating a payment tracking pipeline that monitors Stellar payments and stores them in PostgreSQL.

## Prerequisites

Before you begin, ensure you have:

1. **Obsrvr Account**: [Sign up](https://console.withobsrvr.com) and join the Flow waitlist
2. **Active Subscription**: Flow requires an active subscription ($0.003/minute)
3. **PostgreSQL Database**: For storing the processed data (or use our managed option)

## Step 1: Access Flow

Once approved from the waitlist:

1. Log into the [Obsrvr Console](https://console.withobsrvr.com)
2. Navigate to **Flow** in the main menu
3. Click **Create Pipeline** to start the configuration wizard

## Step 2: Configure Your Pipeline

### Network Selection

Choose your target network:
- **Mainnet**: For production data
- **Testnet**: For development and testing

### Start Ledger Configuration

Select where to begin processing:
- **Latest**: Start from the most recent ledger
- **Genesis**: Process from the beginning (historical data)
- **Specific Ledger**: Enter a ledger number to start from

### Select a Processor

For this example, choose **Payments with Memo**:

```json
{
  "type": "payments_memo",
  "config": {
    "memo_text": "invoice",
    "min_amount": "10",
    "asset_code": "USDC"
  }
}
```

This configuration will:
- Filter payments containing "invoice" in the memo
- Only process payments >= 10 USDC
- Track USDC payments specifically

### Configure the Consumer

Select **PostgreSQL** as your destination:

```json
{
  "type": "postgres",
  "config": {
    "connection_string": "postgresql://user:password@host:5432/payments",
    "batch_size": 50
  }
}
```

## Step 3: Deploy Your Pipeline

1. Review your configuration
2. Name your pipeline (e.g., "invoice-payment-tracker")
3. Click **Deploy Pipeline**

The deployment process:
- Validates your configuration
- Securely stores credentials in Vault
- Deploys to Obsrvr's infrastructure
- Begins processing immediately

## Step 4: Monitor Your Pipeline

### Pipeline Status

Your pipeline will progress through these states:
- `pending` → `deploying` → `running`

### View Logs

Click on your pipeline to access:
- Real-time log streaming
- Processing statistics
- Error messages (if any)

### Usage Tracking

Monitor your costs in real-time:
- Runtime minutes used
- Current billing rate ($0.003/minute)
- Estimated monthly cost

## Example: Complete Pipeline Configuration

Here's a complete example for tracking exchange deposits:

```yaml
name: "exchange-deposit-tracker"
network: "mainnet"
start_ledger: "latest"

processor:
  type: "payments_memo"
  config:
    addresses: 
      - "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"  # Exchange hot wallet
    min_amount: "100"

consumer:
  type: "postgres"
  config:
    connection_string: "postgresql://exchange:secure@db.example.com/deposits"
    batch_size: 10
```

## Querying Your Data

Once data starts flowing, query it from PostgreSQL:

```sql
-- Find recent large payments
SELECT 
    transaction_hash,
    source_account,
    amount,
    memo,
    timestamp
FROM flow_data
WHERE data->>'amount' > '1000'
ORDER BY timestamp DESC
LIMIT 10;

-- Daily payment volumes
SELECT 
    DATE(timestamp) as day,
    COUNT(*) as payment_count,
    SUM((data->>'amount')::numeric) as total_volume
FROM flow_data
GROUP BY DATE(timestamp)
ORDER BY day DESC;
```

## Next Steps

Now that your first pipeline is running:

1. **Explore More Processors**: Try [Contract Events](../processors/contract-events.md) for Soroban
2. **Add Multiple Consumers**: Send data to both PostgreSQL and Webhooks
3. **Build Complex Pipelines**: Chain processors for advanced use cases
4. **Optimize Performance**: Tune batch sizes and configurations

## Common Issues

### Pipeline Stuck in "Deploying"
- Check your consumer credentials
- Verify network connectivity
- Review deployment logs

### No Data Appearing
- Confirm transactions match your filter criteria
- Check the start ledger configuration
- Verify processor configuration

### High Costs
- Optimize batch sizes for better efficiency
- Consider filtering criteria to reduce data volume
- Monitor runtime metrics

## Getting Help

- **Documentation**: Browse our comprehensive guides
- **Support**: Contact support@withobsrvr.com
- **Community**: Join our Discord server
- **Status**: Check [status.withobsrvr.com](https://status.withobsrvr.com)