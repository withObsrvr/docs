---
sidebar_position: 1
title: Overview
displayed_sidebar: lake
---

# Obsrvr Lake

Obsrvr Lake is a medallion-architecture data warehouse for Stellar. It stores decoded ledger data and exposes analytics-ready tables for token transfers, accounts, Soroban contracts, contract events, fees, and network metrics.

Use Lake when you want the answer without building the indexer first.

```bash
export API_KEY="your-api-key"
export BASE="https://gateway.withobsrvr.com/lake/v1/testnet"

curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/accounts/GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR/balances"
```

## The medallion model

```text
Stellar ledger stream
        │
        ▼
Bronze  Raw decoded ledgers, transactions, operations, effects, trades, contract events
        │
        ▼
Silver  Normalized analytics tables for transfers, accounts, contracts, prices, events
        │
        ▼
Gold    Business-ready metrics for compliance, stablecoin volume, fees, and network health
```

| Layer | What it contains | Who uses it |
|-------|------------------|-------------|
| Bronze | Raw decoded Stellar data with full lineage | Teams that need auditability or custom derivations |
| Silver | Pre-joined, normalized tables and API endpoints | Wallets, explorers, analysts, dashboards, protocols |
| Gold | Curated business metrics and compliance outputs | Analysts, compliance teams, reporting workflows |

## Why Lake exists

Stellar data is not hard because ledgers are unavailable. It is hard because the useful answers are spread across transaction envelopes, operation results, effects, trustlines, contract events, SAC events, and Soroban diagnostic data.

Lake turns those pieces into tables that match the questions teams ask:

- token transfers by account, asset, issuer, or contract
- account balances and historical snapshots
- Soroban contract calls and call graphs
- CAP-67 events by contract or topic
- top contracts, holders, assets, and trading pairs
- fee distributions and network health metrics
- compliance archives and point-in-time balances

## Silver tables to start with

| Domain | Useful tables / endpoints | Typical question |
|--------|---------------------------|------------------|
| Accounts | `/silver/accounts/current`, `/silver/accounts/{id}/balances`, `/silver/accounts/{id}/activity` | What does this account hold and what has it done? |
| Transfers | `/silver/transfers`, `/silver/tokens/{contract_id}/transfers` | What value moved between accounts? |
| Contracts | `/silver/contracts/top`, `/silver/contracts/{id}/analytics` | Which Soroban contracts are active and who calls them? |
| Events | `/silver/events`, `/silver/events/generic`, `/silver/events/by-contract` | What CAP-67 or raw events did this contract emit? |
| Transactions | `/silver/tx/{hash}/decoded`, `/silver/tx/{hash}/full` | What happened in this transaction? |
| Prices | `/silver/prices/pairs`, `/silver/prices/{base}/{counter}/latest` | What pairs trade and at what price? |
| Gold compliance | `/gold/compliance/balances`, `/gold/compliance/lineage` | What balances existed at a point in time, with audit lineage? |

## Hot and cold storage

Lake uses hot storage for recent data and cold storage for full history. The API chooses the right layer and merges results.

| Storage | Data range | Typical use |
|---------|------------|-------------|
| Hot | Recent ledgers | dashboards, fresh account state, new contract activity |
| Cold | Full history in Parquet/DuckLake | historical scans, compliance reports, backfills |

You do not choose hot or cold in the request. You query Lake once.

## Compared to `getEvents`

`getEvents` is useful when you already know the contract, topics, cursor, and event shape you want. It returns contract events.

Lake is different. Lake keeps events, but also normalizes them into Stellar-native tables: transfers, token balances, account activity, contract analytics, decoded transactions, and compliance outputs. If you want to know who received USDC, which SAC transfer affected an account, or what a transaction did across classic and Soroban operations, Lake saves you the parsing layer.

## Next steps

- [Run your first Lake query](/docs/lake/getting-started/quickstart)
- [Copy common query examples](/docs/lake/guides/query-examples)
- [Review the Lake API reference](/docs/lake/api/overview)
- [See the architecture](/docs/lake/architecture/overview)
