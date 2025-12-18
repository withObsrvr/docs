---
sidebar_position: 1
title: Processors Overview
---

# Processors

Processors are the core components that transform raw blockchain data into structured, actionable information. Each processor is designed for specific use cases and data types on the Stellar and Soroban networks.

:::info Component Registry
For a comprehensive overview of all processors including standalone gRPC services, see the **[Component Registry](../registry/processors.md)**. You can also learn how to [build custom processors](../registry/building-components.md) or explore [complete pipeline examples](../registry/examples.md).
:::

## Available Processors

### Core Ledger & Transaction

#### Ledger Reader
Reads ledger close metadata and emits individual transactions.

**Configuration:**
```yaml
type: ledger_reader
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Entry point for transaction-level processing pipelines

---

#### Passthrough Processor
Passes ledger data through with minimal transformation, maintains XDR structure.

**Configuration:**
```yaml
type: passthrough
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
  add_metadata: false
  include_full_xdr: true
  include_xdr_json: false
```

**Use Case:** Preserve raw ledger data while adding lightweight metadata

---

#### Ledger to JSON
Converts LedgerCloseMeta to JSON format.

**Configuration:**
```yaml
type: ledger_to_json
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Export ledger data as JSON for downstream systems

---

#### Ledger Changes
Extracts and processes ledger entry changes (creates, updates, deletes).

**Configuration:**
```yaml
type: ledger_changes
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Track state changes in the ledger

---

#### Latest Ledger
Tracks and emits latest ledger information with transaction metrics.

**Configuration:**
```yaml
type: latest_ledger
```

**Use Case:** Monitor ledger progression and transaction activity

---

#### Latest Ledger RPC
Transforms raw getLatestLedger RPC data into structured messages.

**Configuration:**
```yaml
type: latest_ledger_rpc
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Process RPC responses for latest ledger queries

---

#### Operation Processor
Extracts all operation types from transactions.

**Configuration:**
```yaml
type: operation
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Track all operations regardless of type

---

### Account Monitoring

#### Account Data
Process Stellar account data changes including creation/updates/deletion.

**Configuration:**
```yaml
type: account_data
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Track account state changes, balance updates

---

#### Account Data Filter
Filters account records by various criteria.

**Configuration:**
```yaml
type: account_data_filter
config:
  account_ids:
    - "GABC..."
    - "GDEF..."
  min_balance: "100000000"
  change_types:
    - "created"
    - "updated"
  start_date: "2024-01-01T00:00:00Z"
  end_date: "2024-12-31T23:59:59Z"
```

**Use Case:** Filter account changes for specific accounts or thresholds

---

#### Account Effects
Extracts effects (side-effects of operations) for accounts.

**Configuration:**
```yaml
type: account_effects
config:
  account: "GABC123..."
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Track all effects on specific accounts (credits, debits, trustlines)

---

#### Account Transactions
Extracts transactions involving specific accounts (Stellar & Soroban).

**Configuration:**
```yaml
type: account_transactions
config:
  account: "GABC123..."
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Transaction history for accounts

---

#### Account Year Analytics
Generates yearly analytics for a specific account.

**Configuration:**
```yaml
type: account_year_analytics
config:
  account_id: "GABC123..."
  year: 2024
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Annual account activity reports

---

#### Create Account
Extracts create account operations.

**Configuration:**
```yaml
type: create_account
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Track new account creation events

---

### Soroban Contract Processing

#### [Contract Events](./contract-events.md)
Captures and processes events emitted by Soroban smart contracts.

**Configuration:**
```yaml
type: contract_events
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** DeFi protocol monitoring, dApp event tracking

---

#### Contract Invocation
Extracts contract invocations with full execution details (arguments, results, state changes).

**Configuration:**
```yaml
type: contract_invocation
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Comprehensive contract execution tracking

---

#### Contract Filter
Filters events by specific contract IDs.

**Configuration:**
```yaml
type: contract_filter
config:
  contract_ids:
    - "CCABC123..."
    - "CCDEF456..."
```

**Use Case:** Targeted monitoring of specific contracts

---

#### Contract Data
Processes contract data changes on the Soroban network.

**Configuration:**
```yaml
type: contract_data
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** State change monitoring, contract storage analytics

---

#### Contract Creation
Tracks contract creation events.

**Configuration:**
```yaml
type: contract_creation
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Monitor new contract deployments

---

#### Filtered Contract Invocation
Filters contract invocations by criteria.

**Configuration:**
```yaml
type: filtered_contract_invocation
config:
  contract_id: "CCABC123..."
  function_name: "transfer"
```

**Use Case:** Filter invocations by contract ID or function name

---

#### Stellar Contract Events
Processes Stellar Asset Contract (SAC) events.

**Configuration:**
```yaml
type: stellar_contract_events
```

**Use Case:** Track Stellar Asset Contract interactions

---

#### Get Events RPC
Fetches events via RPC getEvents endpoint.

**Configuration:**
```yaml
type: get_events_rpc
config:
  rpc_url: "https://rpc.nodeswithobsrvr.co/"
```

**Use Case:** Query historical contract events via RPC

---

#### Filter Events
Filters contract events by various criteria.

**Configuration:**
```yaml
type: filter_events
config:
  event_type: "contract"
  contract_ids:
    - "CCABC123..."
```

**Use Case:** Filter events by type, topic, or contract

---

### Bronze Layer (Hubble-Compatible)

#### Bronze Extractors
Extracts ALL 19 Bronze table data types from LedgerCloseMeta (Hubble-compatible schema).

**Configuration:**
```yaml
type: bronze_extractors
config:
  network_passphrase: "Test SDF Network ; September 2015"
```

**Output:** ledgers_row_v2, transactions_row_v2, operations_row_v2, effects_row_v1, trades_row_v1, accounts_snapshot_v1, trustlines_snapshot_v1, contract_events_stream_v1, and 11 more

**Use Case:** Export all data for medallion architecture

---

#### Bronze to Contract Invocation
Converts Bronze SQL query results to ContractInvocation format.

**Configuration:**
```yaml
type: bronze_to_contract_invocation
```

**Use Case:** Bridge Bronze data queries with contract invocation extractors

---

### Payment & Operation Processing

#### Filter Payments
Filters payment operations by amount and asset.

**Configuration:**
```yaml
type: filter_payments
config:
  min_amount: "100"
  asset_code: "USDC"
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Track large payments or specific asset transfers

---

#### Participant Extractor
Identifies all accounts involved in a transaction.

**Configuration:**
```yaml
type: participant_extractor
```

**Use Case:** Extract transaction participants for network analysis

---

#### Event Payment Extractor
Extracts structured EventPayment data from contract events.

**Configuration:**
```yaml
type: event_payment_extractor
```

**Use Case:** Parse payment events from payment processor contracts

---

#### Transaction XDR Extractor
Extracts transaction XDR data.

**Configuration:**
```yaml
type: transaction_xdr_extractor
```

**Use Case:** Export transaction XDR for debugging or archival

---

### Asset & Market Data

#### Asset Processor
Processes asset events from operations.

**Configuration:**
```yaml
type: asset
```

**Use Case:** Track asset usage in payments and trades

---

#### Asset Enrichment
Enriches asset data with issuer account information.

**Configuration:**
```yaml
type: asset_enrichment
config:
  connection_string: "postgresql://user:pass@host:5432/database"
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Add issuer metadata (home domain, auth flags) to asset data

---

#### Transform to Asset Stats
Generates asset statistics.

**Configuration:**
```yaml
type: transform_to_asset_stats
```

**Use Case:** Asset analytics and metrics (holder counts, volume)

---

#### Transform to Token Price
Calculates token prices.

**Configuration:**
```yaml
type: transform_to_token_price
```

**Use Case:** Price tracking for assets

---

#### Transform to Market Cap
Calculates market cap and supply data.

**Configuration:**
```yaml
type: transform_to_market_cap
```

**Use Case:** Market cap tracking for assets

---

#### Transform to Market Analytics
Generates market analytics.

**Configuration:**
```yaml
type: transform_to_market_analytics
```

**Use Case:** Comprehensive market analysis

---

#### Market Metrics
Generates sliding window market metrics.

**Configuration:**
```yaml
type: market_metrics
```

**Use Case:** Trading pair analytics with time-series data

---

#### Transform to Ticker Asset
Transforms operations into ticker asset data.

**Configuration:**
```yaml
type: transform_to_ticker_asset
```

**Use Case:** Asset ticker data for exchanges

---

#### Transform to Ticker Orderbook
Generates orderbook ticker data.

**Configuration:**
```yaml
type: transform_to_ticker_orderbook
```

**Use Case:** Orderbook snapshots for trading pairs

---

### DeFi Protocol Processors

#### Soroswap
Processes Soroswap DEX events (new pairs, syncs).

**Configuration:**
```yaml
type: soroswap
```

**Use Case:** Track Soroswap liquidity pool creation and state changes

---

#### Soroswap Router
Processes Soroswap router events.

**Configuration:**
```yaml
type: soroswap_router
```

**Use Case:** Track Soroswap swap routing

---

#### Phoenix AMM
Processes Phoenix AMM contract events.

**Configuration:**
```yaml
type: phoenix_amm
```

**Use Case:** Track Phoenix AMM swaps and liquidity events

---

#### Kale
Processes Kale contract events and invocations.

**Configuration:**
```yaml
type: kale
```

**Use Case:** Track Kale protocol metrics

---

### Application Transforms

#### Transform to App Account
Transforms account data for application use.

**Configuration:**
```yaml
type: transform_to_app_account
```

**Use Case:** Application-specific account data formatting

---

#### Transform to App Metrics
Generates application network metrics.

**Configuration:**
```yaml
type: transform_to_app_metrics
```

**Use Case:** Network-wide metrics for applications

---

#### Transform to App Payment
Transforms payments for application use.

**Configuration:**
```yaml
type: transform_to_app_payment
```

**Use Case:** Application-friendly payment formatting

---

#### Transform to App Trade
Transforms trades for application use.

**Configuration:**
```yaml
type: transform_to_app_trade
```

**Use Case:** Application-friendly trade formatting

---

#### Transform to App Trustline
Transforms trustlines for application use.

**Configuration:**
```yaml
type: transform_to_app_trustline
```

**Use Case:** Application-friendly trustline formatting

---

### State & Effects

#### Stellar Effects
Processes Stellar effects.

**Configuration:**
```yaml
type: stellar_effects
```

**Use Case:** Extract Horizon-style effects from ledgers

---

#### Claimable Balance
Processes claimable balance entries.

**Configuration:**
```yaml
type: claimable_balance
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Track claimable balance creation/updates/claims

---

### Wallet Backend

#### Wallet Backend
Processes state changes for wallet backend.

**Configuration:**
```yaml
type: wallet_backend
```

**Use Case:** Track all state changes relevant to wallet applications

---

### Utilities

#### Blank Processor
Example/template processor for payments.

**Configuration:**
```yaml
type: blank
config:
  network_passphrase: "Public Global Stellar Network ; September 2015"
```

**Use Case:** Template for building custom processors

---

#### Stdout Sink
Writes payload to stdout (terminal sink).

**Configuration:**
```yaml
type: stdout_sink
```

**Use Case:** Debug output, pipe to other tools

---

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

- **[Component Registry](../registry/overview.md)** - Browse all sources, processors, and sinks
- **[Building Custom Processors](../registry/building-components.md)** - Create your own processors
- **[Pipeline Examples](../registry/examples.md)** - Complete pipeline configurations
- Learn about [consumers](../consumers/) to deliver your processed data
- Check our [Getting Started Guide](../getting-started/quickstart.md) for hands-on examples