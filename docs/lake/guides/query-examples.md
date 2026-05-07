---
sidebar_position: 1
title: Query Examples
displayed_sidebar: lake
---

# Lake query examples

Copy-paste queries for common Stellar analysis tasks.

```bash
export API_KEY="your-api-key"
export BASE="https://gateway.withobsrvr.com/lake/v1/testnet"
```

## Account balances

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/accounts/GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR/balances"
```

Use this for wallet portfolio views and account investigations.

## Current account state

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/accounts/current?account_id=GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR"
```

Returns sequence number, XLM balance, subentry count, and last modified ledger.

## Token transfers by asset

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/transfers?asset_code=USDC&limit=20"
```

Lake normalizes classic payments and Soroban/SAC transfers into one transfer model.

## Token transfers by account

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/transfers?from_account=GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR&asset_code=USDC&limit=20"
```

Use `to_account` instead of `from_account` for incoming transfers.

## Top holders for an issued asset

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/assets/USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN/holders?limit=10"
```

Use this for supply concentration, holder reports, and token dashboards.

## Top Soroban contracts

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/contracts/top?period=24h&limit=10"
```

Returns the most active contracts by recent activity.

## Contract analytics

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/contracts/CAUGJT4GREIY3WHOUUU5RIUDGSPVREF5CDCYJOWMHOVT2GWQT5JEETGJ/analytics"
```

Use this when you need callers, callees, functions, and activity over time for one contract.

## Contract events by topic

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/events/generic?topic0=transfer&limit=10"
```

This is useful when you know the CAP-67 or application topic you want.

## Transaction summary

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/tx/YOUR_TX_HASH/decoded"
```

Use decoded transactions when you need a human-readable summary instead of raw XDR.

## Search

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/search?q=USDC"
```

Search spans accounts, contracts, transactions, ledgers, and assets.

## Point-in-time compliance balances

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/gold/compliance/balances?asset_code=XLM&timestamp=2026-01-12T23:59:59Z&limit=100"
```

Use gold compliance endpoints for defensible reporting with lineage.

## Why not just use `getEvents`?

Use `getEvents` when you want raw Soroban events and already know the exact contract, topic filters, and cursor model.

Use Lake when you need the event plus context: accounts, token balances, transfer normalization, decoded transactions, contract analytics, and historical joins across Stellar classic and Soroban activity.
