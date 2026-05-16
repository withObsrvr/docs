---
sidebar_position: 10
title: Pricing
---

# Transparent starting points. Custom quotes where the work is custom.

Usage-based for early builders. Flat-rate for teams running at scale. Managed and BYOC deployments are scoped before launch. Every tier reads from the same platform.

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

  <div className="pricing-tier-card featured">
    <span className="pricing-flag">Recommended</span>
    <h3>Builder</h3>
    <p className="pricing-tier-sub">For teams building real Stellar and Soroban products.</p>
    <div className="pricing-price">$499<span>per month</span></div>
    <ul>
      <li><strong>10M API calls/month</strong> included</li>
      <li>$0.50 per additional million, fair-use limits apply</li>
      <li>RPC, Horizon, and Lake REST APIs</li>
      <li>Limited DuckLake SQL access</li>
      <li>Email support, best-effort response</li>
    </ul>
    <a href="https://console.withobsrvr.com" className="pricing-button primary">Start building</a>
  </div>

  <div className="pricing-tier-card">
    <h3>Data Access</h3>
    <p className="pricing-tier-sub">Flat rate with full DuckLake SQL access.</p>
    <div className="pricing-price">$1,800<span>per month</span></div>
    <ul>
      <li><strong>50M API calls/month</strong> included, fair-use limits apply</li>
      <li>Full DuckLake SQL access</li>
      <li>Business-hours support</li>
      <li>99.5% availability target</li>
    </ul>
    <a href="mailto:sales@withobsrvr.com" className="pricing-button secondary">Contact sales</a>
  </div>

  <div className="pricing-tier-card">
    <h3>Managed</h3>
    <p className="pricing-tier-sub">Obsrvr builds and operates custom data processors for you.</p>
    <div className="pricing-price">$5,500<span>per month</span></div>
    <ul>
      <li>High-volume usage included, fair-use limits apply</li>
      <li><strong>Scoped custom processor development</strong> — 2–3 processors of standard complexity, scoped at onboarding</li>
      <li>Priority support</li>
      <li>99.9% availability target, with SLA available by contract</li>
    </ul>
    <a href="mailto:sales@withobsrvr.com" className="pricing-button secondary">Contact sales</a>
  </div>

  <div className="pricing-tier-card">
    <h3>BYOC Managed</h3>
    <p className="pricing-tier-sub">Run in your own cloud. We operate it.</p>
    <div className="pricing-price">From $3,500<span>per month + infra + setup</span></div>
    <ul>
      <li>High-volume usage included, fair-use limits apply</li>
      <li>Your cloud, our operators</li>
      <li>Priority support</li>
      <li>Availability target scoped by deployment</li>
      <li>One-time setup scoped per deployment</li>
    </ul>
    <a href="mailto:sales@withobsrvr.com" className="pricing-button secondary">Contact sales</a>
  </div>
</div>

## Compare plans

Pick by scale, not by feature gates.

| Feature | Launch | Builder | Data Access | Managed | BYOC Managed |
|---------|--------|---------|-------------|---------|--------------|
| Monthly | ~$99 + usage | $499 | $1,800 | $5,500 | From $3,500 + infra + setup |
| API calls | Metered | 10M included | 50M included, fair-use beyond | High-volume, fair-use beyond | High-volume, deployment-scoped |
| Custom processors | — | — | Build your own | 2–3 scoped, standard complexity | Build your own or scope separately |
| Direct SQL access | — | Limited | Full DuckLake | Full DuckLake | Full DuckLake |
| MCP server | Shared | Shared | Dedicated | Dedicated | Dedicated or deployment-scoped |
| Support | Community | Email, best-effort | Business hours | Priority | Priority |
| Availability | — | — | 99.5% target | 99.9% target, SLA by contract | Scoped by deployment |

## What each tier is for

### Launch

For early builders proving out an integration. Launch keeps the base commitment low while you test Lake queries, Gateway access, and Flow pipelines.

### Builder

For teams running real traffic against the standard APIs — RPC, Horizon, and Lake REST — before they need full SQL access or production support. Builder includes limited DuckLake SQL access: read-only access to standard shared datasets with lower query concurrency, shorter query timeout, standard shared compute, and standard export limits.

### Data Access

For teams that know they need decoded Stellar data and want predictable pricing. Data Access includes 50M API calls per month, fair-use limits, and full DuckLake SQL access.

### Managed

For teams that need custom data products but do not want to maintain processors. Managed includes scoped custom processor development for 2–3 processors of standard complexity, priority support, and a 99.9% availability target with SLA available by contract.

### BYOC Managed

For teams with data residency, security, or cloud-account requirements. You own the cloud account and infrastructure bill. Obsrvr deploys and operates the platform inside your perimeter. Monthly pricing starts at $3,500 plus infrastructure and one-time setup scoped per deployment.

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

### What's the difference between Builder and Data Access?

Builder is for teams running real traffic against the standard APIs — RPC, Horizon, and Lake REST. Data Access adds full DuckLake SQL access, higher included usage, business-hours support, and the 99.5% availability target. Most teams start on Builder and move up when they need full SQL access, higher volume, or stronger production support.

### What does 'fair-use limits' mean?

Each plan includes a generous monthly usage allowance. Fair-use limits protect the platform from abusive or accidental traffic patterns, such as runaway loops or sustained traffic far outside the tier's intended use. If your normal usage consistently exceeds your plan, we'll work with you on the right tier before taking any limiting action.

### How is custom processor scope defined?

During onboarding, we scope each processor with you — data sources, output schema, latency requirements, edge cases, and expected backfill needs. The Managed tier includes 2–3 processors of standard complexity. Larger or more complex processor work is scoped and quoted separately as a contract addendum.

### What's the difference between Data Access and Managed?

Data Access gives you full DuckLake SQL access and 50M API calls per month, with fair-use limits. You build custom processors yourself. Managed adds scoped custom processor development for 2–3 processors of standard complexity, plus priority support.

### Can I switch tiers as we scale?

Yes. Launch → Builder → Data Access → Managed is the normal upgrade path. Usage migrates with you; the API surface does not change.

### How does BYOC Managed work?

You own the cloud account and pay infrastructure costs directly to AWS, GCP, or another agreed provider. Obsrvr deploys and operates the platform inside it. Your data stays inside your perimeter. One-time setup is scoped per deployment.

### Is the open source platform free forever?

Yes. nebu and flowctl are MIT-licensed and remain free to self-host. You pay Obsrvr when you want us to run the platform or build processors for you.

### Do you offer annual pricing?

Annual commitments get about 15% off on Data Access and Managed tiers. Contact sales for details.

## Ready to move to production?

Data Access customers can usually start within days. Managed and BYOC deployments are scoped before launch. Start pay-as-you-go today or contact sales for committed plans.

<div className="pricing-cta-row">
  <a href="https://console.withobsrvr.com" className="pricing-button primary">Request access</a>
  <a href="mailto:sales@withobsrvr.com" className="pricing-button secondary">Contact sales</a>
</div>
