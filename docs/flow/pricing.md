---
sidebar_position: 10
title: Pricing
---

# Pricing

Transparent pricing for Obsrvr Lake, Flow, Gateway, and operated Stellar infrastructure. Usage-based for early builders. Flat-rate for teams running at scale. Managed plans include processor development. Every tier reads from the same platform.

## Platform plans

<div className="pricing-tier-grid">
  <div className="pricing-tier-card">
    <h3>Launch</h3>
    <p className="pricing-tier-sub">Pay-as-you-go for early builders and prototypes.</p>
    <div className="pricing-price">~$99<span>base + metered usage</span></div>
    <ul>
      <li><strong>Metered</strong> API calls</li>
      <li>Community support</li>
      <li>Shared infrastructure</li>
      <li>All three APIs included</li>
    </ul>
    <a href="https://console.withobsrvr.com" className="pricing-button secondary">Start building</a>
  </div>

  <div className="pricing-tier-card">
    <h3>Data Access</h3>
    <p className="pricing-tier-sub">Flat rate with direct SQL access to Lake.</p>
    <div className="pricing-price">$1,800<span>per month</span></div>
    <ul>
      <li><strong>Unlimited</strong> API calls</li>
      <li>Direct SQL via DuckLake</li>
      <li>Business-hours support</li>
      <li>99.5% SLA</li>
    </ul>
    <a href="mailto:sales@withobsrvr.com" className="pricing-button secondary">Contact sales</a>
  </div>

  <div className="pricing-tier-card featured">
    <span className="pricing-flag">Recommended</span>
    <h3>Managed</h3>
    <p className="pricing-tier-sub">Obsrvr builds and maintains custom processors for you.</p>
    <div className="pricing-price">$5,500<span>per month</span></div>
    <ul>
      <li><strong>Unlimited</strong> API calls</li>
      <li><strong>2–3 custom processors</strong> built by Obsrvr</li>
      <li>Priority support</li>
      <li>99.9% SLA</li>
    </ul>
    <a href="mailto:sales@withobsrvr.com" className="pricing-button primary">Contact sales</a>
  </div>

  <div className="pricing-tier-card">
    <h3>BYOC Managed</h3>
    <p className="pricing-tier-sub">Run in your own cloud. We operate it.</p>
    <div className="pricing-price">$3,500<span>+ infrastructure costs</span></div>
    <ul>
      <li><strong>Unlimited</strong> API calls</li>
      <li>Your cloud, our operators</li>
      <li>Priority support</li>
      <li>99.9% SLA</li>
    </ul>
    <a href="mailto:sales@withobsrvr.com" className="pricing-button secondary">Contact sales</a>
  </div>
</div>

## Compare plans

Pick by scale, not by feature gates.

| Feature | Launch | Data Access | Managed | BYOC Managed |
|---------|--------|-------------|---------|--------------|
| Monthly | ~$99 + usage | $1,800 | $5,500 | $3,500 + infra |
| API calls | Metered | Unlimited | Unlimited | Unlimited |
| Custom processors | — | Build your own | 2–3 included | Build your own |
| Direct SQL access | — | DuckLake | DuckLake | DuckLake |
| MCP server | Shared | Dedicated | Dedicated | Dedicated |
| Support | Community | Business hours | Priority | Priority |
| SLA | — | 99.5% | 99.9% | 99.9% |

## What each tier is for

### Launch

For early builders proving out an integration. Launch keeps the base commitment low while you test Lake queries, Gateway access, and Flow pipelines.

### Data Access

For teams that know they need decoded Stellar data and want predictable pricing. Data Access includes unlimited API calls and direct SQL access to Lake through DuckLake.

### Managed

For teams that need custom data products but do not want to maintain processors. Managed includes 2–3 custom processors built and maintained by Obsrvr, priority support, and a 99.9% SLA.

### BYOC Managed

For teams with data residency, security, or cloud-account requirements. You own the cloud account and infrastructure bill. Obsrvr deploys and operates the platform inside your perimeter.

## Nodes

Dedicated Stellar infrastructure for teams that need isolation, higher rate limits, or validator participation.

| Service | Monthly | Notes |
|---------|---------|-------|
| Dedicated RPC | $799 | Isolated Stellar RPC endpoint |
| Dedicated Horizon | $1,499 | Isolated Horizon instance with unlimited throughput |
| Validator Quorum | $1,499 | Dedicated validator node with quorum set management |
| Complete Stack | $3,299 | RPC + Horizon + Validator, operated together |
| Validator maintenance-only | $599 | We operate your existing validator |

## Compliance pricing

Compliance plans are priced by data volume and feature scope.

Compliance plans include dashboards, sanctions screening, counterparty analysis, and audit-ready exports. Plans are scoped to your assets and required integrations.

[Contact sales](mailto:sales@withobsrvr.com) for compliance pricing.

## FAQ

### What's the difference between Data Access and Managed?

Data Access gives you Lake and unlimited APIs. You build custom processors yourself. Managed adds 2–3 custom processors built and maintained by Obsrvr, plus priority support.

### Can I switch tiers as we scale?

Yes. Launch → Data Access → Managed is the normal upgrade path. Usage migrates with you; the API surface does not change.

### How does BYOC Managed work?

You own the cloud account and pay infrastructure costs directly to AWS, GCP, or another agreed provider. Obsrvr deploys and operates the platform inside it. Your data stays inside your perimeter.

### Is the open source platform free forever?

Yes. nebu and flowctl are MIT-licensed and remain free to self-host. You pay Obsrvr when you want us to run the platform or build processors for you.

### Do you offer annual pricing?

Annual commitments get about 15% off on Data Access and Managed tiers. Contact sales for details.

## Ready to move to production?

Most teams are live within a week of access. Start pay-as-you-go today or contact sales for committed plans.

<div className="pricing-cta-row">
  <a href="https://console.withobsrvr.com" className="pricing-button primary">Request access</a>
  <a href="mailto:sales@withobsrvr.com" className="pricing-button secondary">Contact sales</a>
</div>
