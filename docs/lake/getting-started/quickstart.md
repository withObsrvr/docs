---
sidebar_position: 1
title: Quick Start
displayed_sidebar: lake
---

# Lake quickstart

Run three Lake queries in five minutes: account balances, token transfers, and Soroban contract activity.

## Prerequisites

- An Obsrvr API key from [Console](https://console.withobsrvr.com)
- `curl`

Set your environment:

```bash
export API_KEY="your-api-key"
export BASE="https://gateway.withobsrvr.com/lake/v1/testnet"
```

All examples use testnet. Switch to mainnet by replacing `/testnet` with `/mainnet` when your key has mainnet access.

## 1. Get an account's balances

This returns native XLM plus trustline and token balances for a Stellar account.

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/accounts/GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR/balances"
```

Use this for wallet portfolio views, account screens, and analyst lookups.

## 2. Query USDC transfers

Lake's silver transfer endpoint normalizes value movement so you do not have to join operations, effects, and SAC events yourself.

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/transfers?asset_code=USDC&limit=10"
```

Add an account filter when you need activity for one user:

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/transfers?asset_code=USDC&from_account=GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR&limit=10"
```

## 3. Find active Soroban contracts

This returns contracts ranked by recent activity.

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/contracts/top?period=24h&limit=10"
```

Use it for explorers, protocol monitoring, and contract discovery.

## 4. Read contract events by topic

If you know the event topic, query it directly. This example finds transfer events.

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/events/generic?topic0=transfer&limit=10"
```

This is the Lake version of starting from `getEvents`, but with access to the rest of the silver model when you need balances, transfers, accounts, and decoded transactions.

## 5. Get a decoded transaction

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/tx/YOUR_TX_HASH/decoded"
```

Use the decoded transaction endpoint when you need a human-readable summary, balance diffs, or transaction context without parsing XDR.

## What to use next

| If you need | Read next |
|-------------|-----------|
| More examples | [Query Examples](/docs/lake/guides/query-examples) |
| API parameters | [Lake API Reference](/docs/lake/api/overview) |
| Medallion architecture | [Lake Overview](/docs/lake/overview) |
| Custom pipelines | [Flow Overview](/docs/flow/overview) |
| Horizon or Stellar RPC | [Gateway Overview](/docs/gateway/overview) |
