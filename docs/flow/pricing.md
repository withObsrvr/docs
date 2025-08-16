---
sidebar_position: 10
title: Pricing
---

# Flow Pricing

Flow uses simple, transparent pay-as-you-go pricing that scales with your usage. Only pay for the time your pipelines are actively running.

## Pricing Model

### Base Rate
**$0.003 per minute** of pipeline runtime

- No setup fees
- No minimum commitments
- No hidden costs
- Cancel anytime

### Free Tier
**First 100 pipeline-minutes free** for new users
- Perfect for testing and development
- Automatically applied to new accounts
- No credit card required to start

## How Billing Works

### Runtime Calculation
- Billing starts when pipeline enters `running` state
- Billing stops when pipeline is `stopped`, `completed`, or `failed`
- Billed to the nearest minute
- Paused pipelines don't incur charges

### Monthly Billing
- Usage aggregated monthly
- Invoiced at the end of each billing cycle
- Detailed usage reports available
- Multiple payment methods supported

## Cost Examples

### Small Pipeline
**Monitoring specific accounts**
- Runtime: 24/7 (43,200 minutes/month)
- Cost: $129.60/month

### Medium Pipeline
**Processing payment streams**
- Runtime: Business hours (8h/day, 22 days)
- Runtime: 10,560 minutes/month
- Cost: $31.68/month

### Large Pipeline
**Network-wide analytics**
- Runtime: 24/7 with 95% uptime
- Runtime: 41,040 minutes/month
- Cost: $123.12/month

### Development Pipeline
**Testing and development**
- Runtime: 2 hours/day
- Runtime: 3,600 minutes/month
- Cost: $10.80/month

## Cost Optimization

### 1. Efficient Filtering
Use processor filters to reduce data volume:
```json
{
  "type": "payments_memo",
  "config": {
    "min_amount": "100",
    "addresses": ["GSPECIFICADDRESS..."]
  }
}
```

### 2. Batch Processing
Larger batch sizes reduce processing overhead:
```json
{
  "consumer": {
    "type": "postgres",
    "config": {
      "batch_size": 100  // More efficient than batch_size: 1
    }
  }
}
```

### 3. Schedule Pipelines
For non-critical data, run pipelines during specific hours:
- Process historical data in batches
- Run analytics during off-peak hours
- Pause development pipelines when not in use

### 4. Monitor Usage
Track your usage in real-time:
- Dashboard shows current runtime
- Usage alerts available
- Detailed cost breakdowns
- Export usage data for analysis

## Pricing Calculator

Estimate your monthly costs:

| Use Case | Runtime | Minutes/Month | Monthly Cost |
|----------|---------|---------------|--------------|
| Real-time monitoring | 24/7 | 43,200 | $129.60 |
| Business hours only | 8h × 22d | 10,560 | $31.68 |
| Overnight batch | 6h × 30d | 10,800 | $32.40 |
| Weekend processing | 48h × 4 | 11,520 | $34.56 |
| Hourly snapshots | 5min × 24 × 30 | 3,600 | $10.80 |

## Subscription Management

### Starting a Subscription
1. Add payment method in Console
2. Subscribe to Flow
3. Create your first pipeline
4. Automatic billing begins

### Monitoring Usage
- Real-time usage dashboard
- Email notifications for thresholds
- Downloadable invoices
- Usage API for automation

### Cancellation
- Cancel anytime from Console
- Pipelines stop at end of billing period
- Pro-rated refunds available
- Data export supported

## Enterprise Pricing

For high-volume usage or custom requirements:

### Volume Discounts
- 1M+ minutes/month: Contact sales
- Annual commitments: Up to 20% discount
- Custom pricing for specific use cases

### Enterprise Features
- Dedicated infrastructure
- SLA guarantees
- Priority support
- Custom integrations

### Contact Sales
Email: sales@withobsrvr.com

## FAQ

### Is there a free trial?
Yes! First 100 pipeline-minutes are free for new users.

### How accurate is billing?
Billing is calculated to the nearest minute with millisecond precision tracking.

### Can I set spending limits?
Yes, configure spending alerts and automatic pipeline pausing in Console.

### What payment methods are accepted?
- Credit/debit cards (Visa, Mastercard, Amex)
- ACH transfers (for Enterprise)
- Wire transfers (for Enterprise)

### Are there any additional fees?
No. The only cost is the per-minute runtime charge.

### What happens if payment fails?
- 7-day grace period
- Email notifications
- Pipelines paused after grace period
- Data preserved for 30 days

### Can I get a refund?
Pro-rated refunds available for annual plans. Contact support for assistance.

## Comparison with Alternatives

### vs. Self-Hosted Infrastructure

| Aspect | Flow | Self-Hosted |
|--------|------|-------------|
| Setup Cost | $0 | $1000s+ |
| Monthly Cost (small) | ~$30 | ~$500+ (servers) |
| Maintenance | None | 20+ hrs/month |
| Scaling | Automatic | Manual |
| Time to Deploy | Minutes | Weeks |

### vs. Other Data Platforms

Flow's pricing is typically 50-80% less expensive than comparable platforms:
- No ingress/egress fees
- No storage charges
- No per-event pricing
- Simple per-minute model

## Getting Started

Ready to start? [Create your first pipeline](./getting-started/quickstart.md) and get 100 free minutes!