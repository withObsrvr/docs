---
sidebar_position: 1
title: API Overview
displayed_sidebar: lake
---

# Lake API overview

Lake exposes Stellar bronze, silver, semantic, and gold data through REST endpoints. Use silver endpoints for most application and analyst workflows.

## Base URL

```bash
export API_KEY="your-api-key"
export BASE="https://gateway.withobsrvr.com/lake/v1/testnet"
```

Use `/mainnet` instead of `/testnet` for mainnet access.

## Authentication

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/accounts/current?account_id=GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR"
```

## Response shape

List endpoints return data plus pagination or metadata fields when applicable.

```json
{
  "data": [],
  "count": 10,
  "cursor": "ODI5MDQ1OjE6ZGVzYw==",
  "has_more": true,
  "_meta": {
    "scanned_ledger": 829045,
    "available_ledgers": {
      "oldest": 277,
      "latest": 829045
    }
  }
}
```

## Silver endpoints

### Accounts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/silver/accounts` | List and search accounts |
| GET | `/api/v1/silver/accounts/current` | Current account state |
| GET | `/api/v1/silver/accounts/history` | Historical account snapshots |
| GET | `/api/v1/silver/accounts/top` | Top accounts by XLM balance |
| GET | `/api/v1/silver/accounts/{id}/balances` | XLM and trustline balances |
| GET | `/api/v1/silver/accounts/{id}/activity` | Account activity feed |

### Transfers and operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/silver/transfers` | Unified token transfers across classic and SAC activity |
| GET | `/api/v1/silver/payments` | Payment operations |
| GET | `/api/v1/silver/operations/enriched` | Operations with transaction context |
| GET | `/api/v1/silver/operations/soroban` | Soroban operations only |

### Assets and tokens

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/silver/assets` | List tracked assets |
| GET | `/api/v1/silver/assets/{code}:{issuer}/holders` | Asset holders |
| GET | `/api/v1/silver/assets/{code}:{issuer}/stats` | Asset statistics |
| GET | `/api/v1/silver/tokens/{contract_id}` | SEP-41 token metadata |
| GET | `/api/v1/silver/tokens/{contract_id}/balances` | Token holder balances |
| GET | `/api/v1/silver/tokens/{contract_id}/transfers` | Token transfer history |

### Soroban contracts and events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/silver/contracts/top` | Most active contracts |
| GET | `/api/v1/silver/contracts/{id}/analytics` | Contract-level analytics |
| GET | `/api/v1/silver/contracts/{id}/interface` | Detected contract interface |
| GET | `/api/v1/silver/events` | CAP-67 unified event stream |
| GET | `/api/v1/silver/events/generic` | Raw contract events with topic filters |
| GET | `/api/v1/silver/events/by-contract` | Events for one contract |

### Transactions and search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/silver/tx/{hash}/decoded` | Human-readable transaction summary |
| GET | `/api/v1/silver/tx/{hash}/diffs` | Balance and state diffs |
| GET | `/api/v1/silver/tx/{hash}/full` | Full transaction analysis |
| GET | `/api/v1/silver/search` | Search accounts, contracts, transactions, ledgers, and assets |

## Semantic endpoints

Semantic endpoints answer higher-level questions without requiring the caller to know every Stellar table.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/semantic/activities` | Unified on-chain activity feed |
| GET | `/api/v1/semantic/contracts` | Contract registry with type classification |
| GET | `/api/v1/semantic/contracts/functions` | Function-level contract stats |
| GET | `/api/v1/semantic/accounts/summary` | Account activity summary |
| GET | `/api/v1/semantic/flows` | Normalized value flows |

## Gold endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/gold/compliance/balances` | Point-in-time balances |
| GET | `/api/v1/gold/compliance/supply` | Supply timeline with audit trail |
| GET | `/api/v1/gold/compliance/archives` | Compliance archive index |
| GET | `/api/v1/gold/compliance/lineage` | Audit lineage and checksums |

## Pagination

List endpoints use cursor pagination.

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/transfers?asset_code=USDC&limit=100"

curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/transfers?asset_code=USDC&limit=100&cursor=ODI5MDQ1OjE6ZGVzYw=="
```

Treat cursors as opaque strings. Do not parse or construct them.

## Errors

```json
{
  "error": "invalid account_id"
}
```

| Status code | Meaning |
|-------------|---------|
| 200 | Success |
| 400 | Invalid parameter |
| 401 | Missing or invalid API key |
| 404 | Resource not found |
| 429 | Rate limit exceeded |
| 500 | Server error |

## Next steps

- [Run the Lake quickstart](/docs/lake/getting-started/quickstart)
- [Copy query examples](/docs/lake/guides/query-examples)
- [Understand Lake architecture](/docs/lake/architecture/overview)
