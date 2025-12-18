---
sidebar_position: 5
title: Contract Events
---

# Contract Events Processor

The Contract Events processor captures and processes events emitted by Soroban smart contracts, enabling real-time monitoring and analytics for decentralized applications.

## Overview

Soroban smart contracts can emit events during execution, providing a powerful way to track contract activity, state changes, and important occurrences. This processor captures all contract events from the network and delivers them in a structured format.

Note: To filter events from specific contracts, combine this processor with the Contract Filter processor.

## Use Cases

- **DeFi Protocol Monitoring**: Track swaps, liquidity changes, and liquidations
- **NFT Marketplaces**: Monitor mints, transfers, and sales
- **Gaming dApps**: Capture game events and player actions
- **Governance Systems**: Track proposals, votes, and executions
- **Oracle Networks**: Monitor price updates and data submissions

## Configuration

### Parameters

The Contract Events processor requires no configuration parameters - it captures all contract events from the network. To filter specific contracts, combine it with the Contract Filter processor.

### Basic Configuration

```json
{
  "type": "contract_event"
}
```

### With Contract Filtering

```json
[
  {
    "type": "contract_filter",
    "config": {
      "contract_ids": [
        "CCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "CCYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
      ]
    }
  },
  {
    "type": "contract_event"
  }
]
```

## Output Format

The processor outputs structured event data:

```json
{
  "ledger": 12345678,
  "ledger_closed_at": "2024-01-15T10:30:00Z",
  "contract_id": "CCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "id": "0000012345678-0000000001",
  "type": "contract",
  "transaction_hash": "abc123def456...",
  "in_successful_contract_call": true,
  "topics": [
    {
      "type": "symbol",
      "value": "transfer"
    },
    {
      "type": "address",
      "value": "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    }
  ],
  "data": {
    "type": "map",
    "value": {
      "from": {
        "type": "address",
        "value": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      },
      "to": {
        "type": "address",
        "value": "GYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
      },
      "amount": {
        "type": "i128",
        "value": "1000000"
      }
    }
  }
}
```

## Event Structure

### Topics
Topics are indexed values that can be efficiently queried:
- First topic typically identifies the event type
- Additional topics contain key event parameters
- Limited to 4 topics per event

### Data
The event data payload containing detailed information:
- Can be any Soroban data type (map, vec, address, etc.)
- Not indexed but contains complete event details
- Size limited by transaction constraints

## Common Event Patterns

### Token Transfer Event
```json
{
  "topics": [
    {"type": "symbol", "value": "transfer"},
    {"type": "address", "value": "GFROM..."},
    {"type": "address", "value": "GTO..."}
  ],
  "data": {
    "type": "i128",
    "value": "1000000"
  }
}
```

### Liquidity Pool Event
```json
{
  "topics": [
    {"type": "symbol", "value": "swap"},
    {"type": "address", "value": "GUSER..."}
  ],
  "data": {
    "type": "map",
    "value": {
      "amount_in": {"type": "i128", "value": "1000"},
      "amount_out": {"type": "i128", "value": "950"},
      "token_in": {"type": "address", "value": "CCTOKEN1..."},
      "token_out": {"type": "address", "value": "CCTOKEN2..."}
    }
  }
}
```

## Best Practices

### 1. Use Contract Filtering
Always combine with Contract Filter when monitoring specific contracts to reduce data volume:

```json
[
  {
    "type": "contract_filter",
    "config": {
      "contract_ids": ["CCYOUR_CONTRACT_ID..."]
    }
  },
  {
    "type": "contract_event"
  }
]
```

### 2. Design Meaningful Events
When building contracts, design events with:
- Clear, descriptive topic values
- Consistent event schemas
- Minimal but complete data

### 3. Handle Event Versions
Plan for event schema evolution:
- Include version indicators in events
- Maintain backward compatibility
- Document event changes

## Integration Examples

### DeFi Analytics Dashboard

```yaml
apiVersion: flowctl/v1
kind: Pipeline
metadata:
  name: dex-analytics
  description: Track DEX contract events

spec:
  sources:
    - id: stellar-source
      command: ["stellar-live-source"]
      env:
        NETWORK: "mainnet"

  processors:
    - id: contract-filter
      command: ["contract-filter-processor"]
      inputs: ["stellar-source"]
      env:
        CONTRACT_IDS: "CC_DEX_CONTRACT_ID..."

    - id: event-extractor
      command: ["contract-event-processor"]
      inputs: ["contract-filter"]

  sinks:
    - id: postgres-analytics
      command: ["postgres-consumer"]
      inputs: ["event-extractor"]
      env:
        CONNECTION_STRING: "postgresql://..."
        TABLE_NAME: "dex_events"
```

### Real-time Notifications

```yaml
apiVersion: flowctl/v1
kind: Pipeline
metadata:
  name: contract-event-notifications
  description: Real-time contract event webhooks

spec:
  sources:
    - id: stellar-source
      command: ["stellar-live-source"]
      env:
        NETWORK: "mainnet"

  processors:
    - id: event-extractor
      command: ["contract-event-processor"]
      inputs: ["stellar-source"]

  sinks:
    - id: webhook-notifier
      command: ["webhook-consumer"]
      inputs: ["event-extractor"]
      env:
        URL: "https://api.example.com/contract-events"
        BATCH_SIZE: "1"
```

## Performance Considerations

- **Network-wide Monitoring**: Processing all contract events can be resource-intensive
- **Filtering**: Always use Contract Filter for specific contract monitoring
- **Batch Processing**: Configure appropriate batch sizes in consumers
- **Event Volume**: Some contracts emit many events per transaction

## Troubleshooting

**No events captured:**
- Verify the contract actually emits events
- Check if events are in successful contract calls
- Ensure correct network (mainnet/testnet) selection

**Too many events:**
- Add Contract Filter processor
- Process events in your consumer application
- Consider event topic filtering in post-processing

## Related Processors

- Contract Filter - Filter events by contract ID
- Contract Invocation - Track contract function calls
- Contract Data - Monitor contract storage changes
- Extracted Contract Invocation - Extract structured business data