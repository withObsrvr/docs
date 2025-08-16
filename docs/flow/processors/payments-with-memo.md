---
sidebar_position: 2
title: Payments with Memo
---

# Payments with Memo Processor

The Payments with Memo processor filters and processes payment operations that contain memo fields, making it ideal for applications that use memos for payment identification, reconciliation, or routing.

## Overview

This processor specifically targets payment operations on the Stellar network, filtering them based on memo content and other criteria. It's particularly useful for:

- **Invoice Systems**: Match payments to invoices using memo fields
- **Exchange Deposits**: Identify user deposits via memo codes
- **Payment Routing**: Route payments based on memo patterns
- **Compliance Tracking**: Monitor payments with specific reference codes

## Configuration

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `memo_text` | string | No | "internal" | Filter payments by exact memo text match |
| `min_amount` | string | No | None | Minimum payment amount to process |
| `asset_code` | string | No | None | Filter by specific asset code (e.g., "USDC", "XLM") |
| `addresses` | array | No | None | List of addresses to monitor for payments |

### Example Configuration

```json
{
  "type": "payments_memo",
  "config": {
    "memo_text": "invoice-2024",
    "min_amount": "100",
    "asset_code": "USDC",
    "addresses": [
      "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "GYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
    ]
  }
}
```

## Output Format

The processor outputs structured payment data including:

```json
{
  "transaction_hash": "abc123...",
  "ledger": 12345678,
  "timestamp": "2024-01-15T10:30:00Z",
  "source_account": "GXXXXX...",
  "destination_account": "GYYYYY...",
  "amount": "1000.00",
  "asset": {
    "code": "USDC",
    "issuer": "GZZZZZ..."
  },
  "memo": {
    "type": "text",
    "value": "invoice-2024-001"
  },
  "operation_id": "12345678-1",
  "successful": true
}
```

## Use Cases

### Invoice Reconciliation

```json
{
  "memo_text": "INV",
  "min_amount": "10"
}
```

Monitor all payments with memos starting with "INV" for automatic invoice matching.

### Exchange Deposit Tracking

```json
{
  "addresses": ["EXCHANGE_HOT_WALLET_ADDRESS"],
  "min_amount": "1"
}
```

Track all incoming payments to exchange addresses with user identification memos.

### Multi-Currency Payment Processing

```json
{
  "asset_code": "USDC",
  "memo_text": "payment",
  "min_amount": "50"
}
```

Process only USDC payments above $50 with "payment" memo.

## Best Practices

1. **Memo Format Standards**: Establish clear memo format standards for your application
2. **Amount Filtering**: Use `min_amount` to filter out dust transactions
3. **Address Whitelisting**: Specify addresses to reduce processing overhead
4. **Asset Filtering**: Filter by asset code when processing specific currencies

## Performance Considerations

- Filtering by specific addresses is more efficient than processing all network payments
- Exact memo matching is faster than pattern matching
- Combining multiple filters (memo + amount + asset) reduces data volume

## Integration Examples

### With PostgreSQL Consumer

```json
{
  "processor": {
    "type": "payments_memo",
    "config": {
      "memo_text": "order",
      "min_amount": "10"
    }
  },
  "consumer": {
    "type": "postgres",
    "config": {
      "connection_string": "postgresql://...",
      "table_name": "payment_orders"
    }
  }
}
```

### With Webhook Consumer

```json
{
  "processor": {
    "type": "payments_memo",
    "config": {
      "memo_text": "webhook",
      "addresses": ["GXXXXX..."]
    }
  },
  "consumer": {
    "type": "webhook",
    "config": {
      "url": "https://api.example.com/payments",
      "secret": "webhook_secret"
    }
  }
}
```

## Common Patterns

### Dynamic Memo Matching
While the processor supports exact matching, you can process all payments and filter by memo pattern in your consumer application for more flexibility.

### Multi-Stage Processing
Combine with other processors for complex workflows:
1. First stage: Account Balance processor for balance changes
2. Second stage: Payments with Memo for payment details

## Troubleshooting

**No payments being processed:**
- Verify memo text matches exactly (case-sensitive)
- Check if minimum amount is too high
- Ensure addresses are formatted correctly
- Confirm asset code matches on-chain representation

**Too many payments processed:**
- Add more specific filters (addresses, asset_code)
- Increase minimum amount threshold
- Use more specific memo text

## Related Processors

- Raw Transactions - For processing all transaction types
- Account Balance - For tracking balance changes
- Contract Events - For Soroban payment contracts