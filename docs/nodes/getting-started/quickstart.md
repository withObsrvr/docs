---
sidebar_position: 1
title: Quick Start
displayed_sidebar: nodes
---

# Quick Start

Get started with OBSRVR Nodes to deploy your dedicated Stellar infrastructure.

## Prerequisites

- An OBSRVR account ([sign up](https://console.withobsrvr.com))
- A project that requires dedicated Stellar infrastructure

## Provisioning a Node

1. Log in to the [OBSRVR Console](https://console.withobsrvr.com)
2. Navigate to **Nodes** in the sidebar
3. Click **Create Node**
4. Select your node type:
   - **Horizon** - Full Stellar Horizon API
   - **RPC** - Stellar RPC for Soroban smart contracts
5. Configure your node settings
6. Review pricing and confirm

Your node will be provisioned within minutes.

## Connecting to Your Node

Once provisioned, you'll receive dedicated endpoints for your node:

### Horizon Node

```bash
# Your dedicated Horizon endpoint
curl "https://your-node-id.nodes.withobsrvr.com/ledgers?limit=10"
```

### RPC Node

```bash
# Your dedicated RPC endpoint
curl -X POST "https://your-node-id.rpc.withobsrvr.com" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
```

## Next Steps

- Configure [Asset Whitelisting](/docs/nodes/guides/asset-whitelisting) to customize data retention
- Review [Pricing](/docs/nodes/overview#pricing) details
- Contact support for enterprise requirements
