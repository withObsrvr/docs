---
sidebar_position: 1
---

# What is Obsrvr?

Obsrvr is the data backbone for Stellar builders. It gives developers, analysts, and compliance teams decoded ledger data, semantic tables, and production APIs without making them run Horizon, parse XDR, index Soroban events, or maintain their own warehouse.

Obsrvr is not a generic Web3 data platform. It is built around Stellar's data model: ledgers, operations, trustlines, path payments, Soroban contract events, SAC transfers, and account state.

## Start with Lake

Obsrvr Lake is the centerpiece. It stores Stellar data in a medallion architecture:

| Layer | What it contains | Use it for |
|-------|------------------|------------|
| Bronze | Raw decoded Stellar ledger data | Audit trails, custom derivations, parity with ledger history |
| Silver | Normalized analytics tables | Token transfers, account snapshots, contract events, Soroban calls |
| Gold | Business-ready metrics | Stablecoin volume, fee intelligence, network health, compliance exports |

Most teams should start with Lake. If you want USDC transfers for an account, top Soroban contracts, account balances at a point in time, or a transaction summary, Lake is the shortest path.

```bash
export API_KEY="your-api-key"
export BASE="https://gateway.withobsrvr.com/lake/v1/testnet"

curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/transfers?asset_code=USDC&limit=10"
```

## Product map

```text
Console
  └─ Manage API keys, subscriptions, and resources

Gateway
  ├─ Horizon access
  ├─ Stellar RPC access
  └─ Lake API entrance point

Lake
  ├─ Bronze: raw decoded ledger data
  ├─ Silver: analytics-ready Stellar tables
  └─ Gold: business-ready metrics and compliance outputs

Flow
  └─ Managed custom pipelines for teams that need their own processors and sinks
```

## When to use each product

### Lake

Use Lake when you need decoded, queryable Stellar data. Lake is the default choice for wallets, explorers, analysts, compliance workflows, and dashboards.

Start here if your question sounds like:

- What token transfers involved this account?
- Which Soroban contracts were most active in the last 24 hours?
- What was this account's balance at a ledger or timestamp?
- What events did this contract emit?
- What stablecoin volume moved yesterday?

[Open Lake docs](/docs/lake/overview).

### Flow

Use Flow when you need a custom managed pipeline. Flow runs pipelines made from processors and consumers: read from Stellar, transform records, and write to PostgreSQL, webhooks, Kafka, S3, or another sink.

Use Flow when Lake's standard tables are not the shape you need, or when you need to deliver events into your own system continuously.

[Open Flow docs](/docs/flow/overview).

### Gateway

Use Gateway for direct Horizon and Stellar RPC access. It is SDK-compatible infrastructure for network calls, transaction submission, and RPC methods.

Gateway is useful, but it is not the main reason to choose Obsrvr. Lake is where decoded Stellar data becomes queryable.

[Open Gateway docs](/docs/gateway/overview).

### Console

Use Console to manage Obsrvr resources: API keys, subscriptions, Gateway access, Flow pipelines, and account settings.

[Open Console](https://console.withobsrvr.com).

## What makes Obsrvr different

Stellar's RPC and Horizon give you network access. Hubble-style datasets give you raw tables. `getEvents` gives you contract events, but not a complete semantic model for transfers, balances, contracts, and account activity.

Obsrvr Lake sits above those layers. It keeps the raw record, then adds Stellar-native silver tables and gold metrics so teams can ask questions without rebuilding the indexer first.
