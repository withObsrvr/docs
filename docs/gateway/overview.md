---
sidebar_position: 1
title: Gateway Overview
---

# Obsrvr Gateway

Gateway provides authenticated access to Stellar Horizon, Stellar RPC, and Lake APIs through a single Gateway URL. Use it when your application needs SDK-compatible network access or one entrance point for Obsrvr services.

Gateway is infrastructure. If you need decoded transfers, contract analytics, or account snapshots, start with [Obsrvr Lake](/docs/lake/overview).

## Base URL

Use `https://gateway.withobsrvr.com` for Gateway services.

| Service | Mainnet | Testnet |
|---------|---------|---------|
| Horizon | `https://gateway.withobsrvr.com/horizon/mainnet/` | `https://gateway.withobsrvr.com/horizon/testnet/` |
| Stellar RPC | `https://gateway.withobsrvr.com/rpc/mainnet/` | `https://gateway.withobsrvr.com/rpc/testnet/` |
| Lake API | `https://gateway.withobsrvr.com/lake/v1/mainnet` | `https://gateway.withobsrvr.com/lake/v1/testnet` |

Gateway routes by network in the URL path:

- Horizon: `/horizon/{network}/...`
- Stellar RPC: `/rpc/{network}/`
- Lake: `/lake/v1/{network}/...`

Supported networks depend on your Gateway plan and configuration. Common values are `mainnet` and `testnet`.

## Authentication

Send your Obsrvr API key in the `Authorization` header.

```bash
Authorization: Api-Key $API_KEY
```

Create and rotate keys in [Console](https://console.withobsrvr.com). Keep API keys server-side and do not embed them in browser code or public repositories.

## Horizon through Gateway

Horizon requests use normal Horizon paths after `/horizon/{network}`.

```bash
export API_KEY="your-api-key"
export HORIZON="https://gateway.withobsrvr.com/horizon/testnet"

curl -H "Authorization: Api-Key $API_KEY" \
  "$HORIZON/ledgers?limit=1&order=desc"
```

Account example:

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$HORIZON/accounts/GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR"
```

Gateway is compatible with Stellar SDKs that accept a Horizon URL and custom headers.

```javascript
import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://gateway.withobsrvr.com/horizon/testnet', {
  headers: {
    Authorization: `Api-Key ${process.env.OBSRVR_API_KEY}`,
  },
});

const ledgers = await server.ledgers().order('desc').limit(1).call();
console.log(ledgers.records[0]);
```

For mainnet, use:

```text
https://gateway.withobsrvr.com/horizon/mainnet
```

## Stellar RPC through Gateway

Stellar RPC requests are JSON-RPC `POST` requests to `/rpc/{network}/`.

```bash
export API_KEY="your-api-key"
export RPC="https://gateway.withobsrvr.com/rpc/testnet/"

curl -X POST "$RPC" \
  -H "Authorization: Api-Key $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getHealth"
  }'
```

JavaScript `fetch` example:

```javascript
const response = await fetch('https://gateway.withobsrvr.com/rpc/testnet/', {
  method: 'POST',
  headers: {
    Authorization: `Api-Key ${process.env.OBSRVR_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'getHealth',
  }),
});

console.log(await response.json());
```

Stellar SDK RPC example:

```javascript
import { rpc } from '@stellar/stellar-sdk';

const server = new rpc.Server('https://gateway.withobsrvr.com/rpc/testnet/', {
  headers: {
    Authorization: `Api-Key ${process.env.OBSRVR_API_KEY}`,
  },
});

const health = await server.getHealth();
console.log(health);
```

For mainnet, use:

```text
https://gateway.withobsrvr.com/rpc/mainnet/
```

Use Stellar RPC for contract simulation, transaction submission, ledger metadata, and RPC methods used by Stellar SDKs.

## Lake through Gateway

Lake is exposed through Gateway under `/lake/v1/{network}`.

```bash
export API_KEY="your-api-key"
export BASE="https://gateway.withobsrvr.com/lake/v1/testnet"

curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/contracts/top?period=24h&limit=10"
```

## Migrating from old direct endpoints

If your app still uses the older service-specific hostnames, update them to the Gateway URL path format.

| Old style | New Gateway style |
|-----------|-------------------|
| `https://stellar.nodeswithobsrvr.co/...` | `https://gateway.withobsrvr.com/horizon/mainnet/...` |
| `https://stellar-testnet.nodeswithobsrvr.co/...` | `https://gateway.withobsrvr.com/horizon/testnet/...` |
| `https://rpc.nodeswithobsrvr.co/` | `https://gateway.withobsrvr.com/rpc/mainnet/` |
| `https://rpc-testnet.nodeswithobsrvr.co/` | `https://gateway.withobsrvr.com/rpc/testnet/` |

The request shape stays the same for Horizon paths and RPC JSON bodies. Only the base URL changes.

## When to use Gateway vs Lake

| Need | Use |
|------|-----|
| Submit a transaction | Gateway RPC or Horizon |
| Call a Stellar SDK method | Gateway RPC or Horizon |
| Query account balances as a wallet would | Gateway Horizon |
| Query normalized token transfers | Lake |
| Find active Soroban contracts | Lake |
| Build compliance reports | Lake gold endpoints |

## Operational notes

- Use testnet endpoints for examples and development.
- Keep API keys server-side. Do not embed keys in browser code or public repos.
- Generate separate keys for production and development.
- If you need plan-specific limits or uptime terms, check your Console subscription or contact Obsrvr support.

## Next steps

- [Query decoded Stellar data with Lake](/docs/lake/overview)
- [Run the Lake quickstart](/docs/lake/getting-started/quickstart)
- [Create custom pipelines with Flow](/docs/flow/overview)
