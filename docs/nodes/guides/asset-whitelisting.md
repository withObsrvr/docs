---
sidebar_position: 1
title: Asset Whitelisting
displayed_sidebar: nodes
---

# Asset Whitelisting

Asset whitelisting lets you control which Stellar assets your dedicated OBSRVR Node retains in history. This helps reduce storage usage and keeps your node focused on the data your application needs.

## When to Use Asset Whitelisting

Use asset whitelisting when you want to:

- Retain history only for specific assets
- Reduce storage and indexing costs
- Improve query performance for targeted workloads
- Support compliance or reporting requirements for a known asset set

## Configure a Whitelist

1. Open the [OBSRVR Console](https://console.withobsrvr.com)
2. Navigate to **Nodes**
3. Select your node
4. Open **Data Retention** or **Asset Whitelisting**
5. Add the assets you want to retain
6. Save the configuration

## Asset Identifiers

For Stellar assets, provide:

- Asset code, such as `USDC`
- Asset issuer account ID

Native XLM does not require an issuer.

## Example

```text
Asset code: USDC
Issuer: GA5ZSEJYB37EA2QJ...EXAMPLE
Network: mainnet
```

## Notes

Changes may take time to apply depending on the current node state and the amount of retained history. Contact support if you need help planning a retention policy for production workloads.
