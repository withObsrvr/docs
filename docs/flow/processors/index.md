---
sidebar_position: 1
title: Processors Overview
---

# Processors

Processors are the core components that transform raw blockchain data into structured, actionable information. Each processor is designed for specific use cases and data types on the Stellar and Soroban networks.

## Available Processors

### Payment Processing

#### [Payments with Memo](./payments-with-memo.md)
Process payment operations with memo field filtering. Perfect for:
- Invoice reconciliation systems
- Payment tracking with reference IDs
- Multi-tenant payment processing

**Configuration Options:**
- Filter by minimum amount
- Match specific memo text
- Filter by asset code
- Monitor specific addresses

### Transaction Processing

#### Raw Transactions
Access and process all network transactions without filtering. Ideal for:
- Complete transaction history
- Network-wide analytics
- Custom transaction processing

**Configuration Options:**
- Filter by transaction types
- Full transaction envelope access

### Account Monitoring

#### Account Balance
Track balance changes for specified accounts. Essential for:
- Treasury management
- Wallet balance monitoring
- Portfolio tracking

**Configuration Options:**
- Monitor multiple accounts
- Filter by specific assets
- Real-time balance updates

### Soroban Contract Processing

#### [Contract Events](./contract-events.md)
Subscribe to Soroban smart contract events for:
- DeFi protocol monitoring
- dApp event tracking
- Custom contract analytics

#### Contract Invocation
Track all contract invocations with detailed information about:
- Function calls
- Parameters
- Results

#### Contract Filter
Filter events by specific contract IDs for targeted monitoring of:
- Your deployed contracts
- Third-party protocol contracts
- Specific contract interactions

#### Contract Data
Process contract data changes on the Soroban network for:
- State change monitoring
- Contract storage analytics
- Data integrity tracking

#### Extracted Contract Invocation
Extract structured business data from contract invocations using configurable schemas. Perfect for:
- Custom business logic extraction
- Structured data pipelines
- Domain-specific processing

### Network Metrics

#### Latest Ledger Metrics
Real-time network statistics and metrics including:
- Latest ledger information
- Transaction counts
- Network health indicators

### DeFi Specific

#### SwapService
Specialized processor for Soroswap DEX events:
- Swap transactions
- Liquidity events
- Price tracking

### Account Data

#### Account Data
Process Stellar account data changes including:
- Account creation/updates
- Trustline modifications
- Account flags and thresholds

## Choosing the Right Processor

Consider these factors when selecting a processor:

1. **Data Requirements**: What specific blockchain data do you need?
2. **Performance**: Some processors are more resource-intensive than others
3. **Filtering Needs**: Many processors offer built-in filtering options
4. **Output Format**: Each processor outputs data in a specific structure

## Processor Configuration

All processors support configuration through the Flow pipeline builder. Common configuration patterns include:

```json
{
  "processor_type": "payments_memo",
  "config": {
    "memo_text": "invoice-2024",
    "min_amount": "100",
    "asset_code": "USDC"
  }
}
```

## Combining Processors

You can chain multiple processors in a single pipeline for complex data processing scenarios. For example:
- Use Contract Filter → Contract Events for targeted event monitoring
- Combine Account Balance → Latest Ledger for balance snapshots

## Performance Considerations

- **Filtered processors** (like Payments with Memo) are more efficient than processing all data
- **Account-specific processors** scale better than network-wide processors
- **Contract processors** require Soroban-enabled networks

## Next Steps

- Explore individual processor documentation for detailed configuration options
- Learn about [consumers](../consumers/) to deliver your processed data
- Check our [Getting Started Guide](../getting-started/quickstart.md) for hands-on examples