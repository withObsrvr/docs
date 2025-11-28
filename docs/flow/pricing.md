---
sidebar_position: 10
title: Pricing
---

import HelperBox from '@site/src/components/HelperBox';

# Pricing

Simple, transparent pricing that scales with your usage. Build on Stellar & Soroban with predictable costs and included usage allowances.

## Launch Plan

**Everything you need to get started**

### $99/month

The Launch Plan includes generous usage allowances for all Obsrvr services with transparent overage pricing.

#### ✅ Included Usage Allowances

| Resource | Included | Overage Rate |
|----------|----------|--------------|
| **ObsrvrLake Storage** | 250 GB | $0.01/GB-month |
| **Flow Processing** | 50 GB processed | $0.10/GB |
| **Lake Queries** | 1,000,000 queries | $2.00 per 1,000 queries |
| **Gateway Requests** | 1,000,000 requests | $15.00 per 1M requests |
| **Data Egress** | 25 GB | $0.08/GB |
| **Concurrent Pipelines** | 2 pipelines | $10/month per extra pipeline |

#### ✅ Additional Features

- **Email Support** - 24-hour SLA response time
- **30 Days Data Retention** - Automatic backups and retention
- **Multi-Network Access** - Stellar mainnet and testnet
- **Console Dashboard** - Real-time usage monitoring
- **API Access** - Full API access to all services

<HelperBox title="Start building today" icon="🚀" variant="tip">

The Launch Plan is perfect for:
- Development teams building on Stellar
- Production applications with predictable usage
- Teams wanting all Obsrvr services in one plan
- Projects needing generous included allowances

**Get started:** [Sign up for Launch Plan](https://console.withobsrvr.com) and start building immediately.

</HelperBox>

---

## Usage Examples

### Typical Monthly Usage Scenarios

#### Small Project
**Profile:** Development & testing, 1-2 active pipelines
- Flow Processing: 10 GB → **Included**
- Gateway Requests: 200K → **Included**
- Lake Queries: 50K → **Included**
- Storage: 50 GB → **Included**

**Total Cost:** **$99/month** (no overages)

#### Medium Application
**Profile:** Production app, moderate traffic
- Flow Processing: 45 GB → **Included**
- Gateway Requests: 800K → **Included**
- Lake Queries: 500K → **Included**
- Storage: 180 GB → **Included**

**Total Cost:** **$99/month** (no overages)

#### High-Volume Application
**Profile:** Heavy processing, high traffic
- Flow Processing: 75 GB → $2.50 overage (25 GB × $0.10)
- Gateway Requests: 2.5M → $22.50 overage (1.5M × $15/1M)
- Lake Queries: 1.8M → $1.60 overage (800K × $2/1K)
- Storage: 300 GB → $0.50 overage (50 GB × $0.01)

**Total Cost:** **$126.10/month** ($99 base + $27.10 overage)

---

## Legacy Pricing

The following pay-as-you-go pricing is available for existing subscribers. **New users should choose the Launch Plan** for better value and predictability.

### Flow Pipelines (Legacy)
**$0.003 per minute** of pipeline runtime
- No included allowance
- Billed per minute of active pipeline time
- First 100 minutes free for new accounts

### Gateway (Legacy)
**$0.000007 per API call**
- Horizon API access
- Soroban RPC access
- All networks (mainnet, testnet)

### Nodes (Legacy)
**$2.25 per hour**
- Dedicated Stellar/Soroban node
- Single network access
- Direct node access

<HelperBox title="Upgrading from legacy pricing?" icon="💡" variant="info">

Existing subscribers can continue using legacy pricing. Contact [sales@withobsrvr.com](mailto:sales@withobsrvr.com) to discuss upgrading to the Launch Plan for:
- More predictable costs
- Included usage allowances
- All services in one plan
- Simplified billing

</HelperBox>

---

## How Billing Works

### Launch Plan Billing

1. **Base Charge:** $99/month recurring subscription
2. **Usage Tracking:** All usage tracked against included allowances
3. **Overage Calculation:** Only usage above included limits is billed
4. **Monthly Invoice:** Base + any overage charges at end of billing period

### Billing Cycle
- Monthly subscription (automatically renews)
- Usage resets at start of each billing period
- Detailed usage dashboard in Console
- Downloadable invoices and usage reports

### Payment
- Credit/debit cards (Visa, Mastercard, Amex)
- Automatic monthly billing
- Secure payment via Stripe
- Change payment methods anytime

---

## Cost Optimization

### Monitor Your Usage

Track usage in real-time via the Console dashboard:
- Current usage vs. allowances
- Projected end-of-month costs
- Usage breakdown by service
- Historical usage trends

### Optimize Flow Processing

**Efficient Filtering** - Process only the data you need:
```json
{
  "type": "payments_memo",
  "config": {
    "min_amount": "100",
    "addresses": ["GSPECIFICADDRESS..."]
  }
}
```

**Batch Processing** - Larger batches reduce overhead:
```json
{
  "consumer": {
    "type": "postgres",
    "config": {
      "batch_size": 100
    }
  }
}
```

### Optimize Gateway Usage

- Cache frequently accessed data
- Use webhooks instead of polling
- Batch requests when possible
- Implement efficient pagination

### Storage Management

- Archive old data to cheaper storage
- Use data retention policies
- Compress data before storage
- Monitor storage growth

---

## Enterprise Pricing

For high-volume usage, custom requirements, or dedicated infrastructure:

### Volume Discounts
- Custom pricing for 100GB+ monthly processing
- Annual commit discounts available
- Dedicated account management

### Enterprise Features
- **Dedicated Infrastructure** - Isolated deployment
- **SLA Guarantees** - 99.9% uptime commitment
- **Priority Support** - 4-hour response time
- **Custom Integrations** - Tailored solutions
- **Compliance** - SOC 2, GDPR assistance

### Contact Sales
Email: [sales@withobsrvr.com](mailto:sales@withobsrvr.com)

---

## FAQ

### What's included in the Launch Plan?

The $99/month Launch Plan includes generous usage allowances for all Obsrvr services: 250GB storage, 50GB Flow processing, 1M Gateway requests, 1M Lake queries, 25GB egress, and 2 concurrent pipelines. You only pay overage if you exceed these limits.

### How do I know if I'll exceed allowances?

Your Console dashboard shows real-time usage vs. allowances with progress bars and projected costs. Most small-to-medium applications stay within included limits.

### What happens if I exceed an allowance?

You're only billed for the overage amount at the published overage rates. For example, if you use 1.5M Gateway requests, you pay $99 base + $7.50 for the extra 500K requests.

### Can I upgrade from legacy pricing?

Yes! Contact sales@withobsrvr.com to discuss upgrading. We'll help you estimate costs and make the transition smooth.

### Is there a free trial?

Yes! New Launch Plan subscribers get their first month with doubled allowances to try all features risk-free. Legacy Flow users get 100 free pipeline-minutes.

### Can I set spending limits?

Yes, you can configure alerts when approaching allowance limits and set hard caps on overage spending in the Console.

### What payment methods are accepted?

All major credit/debit cards (Visa, Mastercard, Amex) via Stripe. Enterprise plans can use ACH or wire transfers.

### What happens if payment fails?

You'll receive email notifications and have a 7-day grace period. Services pause after the grace period, but data is preserved for 30 days.

### Can I cancel anytime?

Yes, cancel anytime from the Console. Access continues through the end of your billing period with no pro-ration charges for early cancellation.

### Are there any hidden fees?

No. The only costs are the $99/month base and any usage overages at published rates. No setup fees, no egress fees beyond allowances, no surprise charges.

---

## Comparison with Alternatives

### Launch Plan vs. Self-Hosted

| Aspect | Obsrvr Launch Plan | Self-Hosted Infrastructure |
|--------|-------------------|---------------------------|
| Setup Cost | $0 | $5,000+ |
| Monthly Cost | $99 + usage | $500+ (servers, maintenance) |
| Maintenance | Zero | 40+ hours/month |
| Scaling | Automatic | Manual infrastructure |
| Time to Deploy | Minutes | Weeks |
| Support | Included (24h SLA) | DIY |

### Launch Plan vs. Competitor Platforms

Obsrvr Launch Plan typically costs 50-70% less than comparable blockchain data platforms:
- ✅ Included usage allowances (others charge per query/call)
- ✅ No ingress fees
- ✅ Transparent overage pricing (others have complex tiers)
- ✅ All services in one plan
- ✅ No vendor lock-in

---

## Getting Started

Ready to start building on Stellar & Soroban?

1. **[Sign up for Launch Plan](https://console.withobsrvr.com)** - Create your account
2. **[Deploy your first pipeline](./getting-started/quickstart.md)** - 5-minute quickstart
3. **Monitor usage** - Track usage in real-time via Console
4. **Scale with confidence** - Predictable costs as you grow

Questions? Email [support@withobsrvr.com](mailto:support@withobsrvr.com) or check our [documentation](../intro.md).
