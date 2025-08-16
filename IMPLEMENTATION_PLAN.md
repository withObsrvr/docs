# Obsrvr Documentation Site Update Implementation Plan

## Overview
This plan outlines the comprehensive update of the Obsrvr documentation site to include detailed Flow documentation and implement a modern, hierarchical layout inspired by Prismatic.io's documentation design.

## Phase 1: Content Gathering and Organization (Week 1)

### 1.1 Flow Documentation Content
Consolidate information from various repositories into comprehensive Flow documentation:

**Content Sources:**
- `obsrvr-console/` - Primary source for Flow features, pipeline management, subscription model, and user workflows
- `obsrvr-console/apps/flow/` - Core Flow implementation including models, views, and registry
- `obsrvr-console/docs/` - Flow waitlist, pricing, subscription implementation, and runtime tracking
- `flowctl/docs/` - Orchestration and architecture documentation
- `cdp-pipeline-workflow/` - Pipeline configuration and deployment
- `ttp-processor-demo/` - Processor building tutorials

**Documentation Structure:**
```
docs/
├── flow/
│   ├── overview.md
│   ├── getting-started/
│   │   ├── introduction.md
│   │   ├── quickstart.md
│   │   ├── first-pipeline.md
│   │   └── subscription-setup.md
│   ├── concepts/
│   │   ├── pipelines.md
│   │   ├── processors.md
│   │   ├── consumers.md
│   │   ├── orchestration.md
│   │   └── runtime-tracking.md
│   ├── processors/
│   │   ├── payments-with-memo.md
│   │   ├── raw-transactions.md
│   │   ├── account-balance.md
│   │   ├── contract-events.md
│   │   ├── swap-service.md
│   │   └── latest-ledger-metrics.md
│   ├── consumers/
│   │   ├── postgresql.md
│   │   ├── webhooks.md
│   │   ├── kafka.md
│   │   ├── s3.md
│   │   ├── redis.md
│   │   └── duckdb.md
│   ├── tutorials/
│   │   ├── building-payment-processor.md
│   │   ├── contract-event-monitoring.md
│   │   ├── schema-customization.md
│   │   └── custom-processors.md
│   ├── reference/
│   │   ├── api.md
│   │   ├── pipeline-configuration.md
│   │   ├── schema-templates.md
│   │   └── component-registry.md
│   └── pricing.md
```

**Key Flow Features to Document (from obsrvr-console):**
- Pipeline lifecycle management (create, deploy, monitor, delete)
- Component registry with available processors and consumers
- Subscription-based access model with usage tracking
- Schema configuration and validation
- Vault integration for secure credential management
- Nomad deployment orchestration
- Real-time log streaming
- Runtime tracking for billing

### 1.2 Gateway Documentation Enhancement
Update existing gateway documentation with clearer structure:
```
docs/
├── gateway/
│   ├── overview.md
│   ├── stellar/
│   │   ├── mainnet.md
│   │   ├── testnet.md
│   │   └── api-reference.md
│   ├── soroban/
│   │   ├── rpc-mainnet.md
│   │   ├── rpc-testnet.md
│   │   └── api-reference.md
│   └── authentication.md
```

## Phase 2: Design and Layout Updates (Week 2)

### 2.1 Navigation Structure Redesign
Implement hierarchical navigation inspired by Prismatic.io:

**New Sidebar Structure:**
```javascript
// sidebars.js
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'intro',
        'quickstart',
        'architecture-overview'
      ]
    },
    {
      type: 'category',
      label: 'Products',
      items: [
        {
          type: 'category',
          label: 'Gateway',
          items: [
            'gateway/overview',
            'gateway/stellar/mainnet',
            'gateway/stellar/testnet',
            'gateway/soroban/rpc-mainnet',
            'gateway/soroban/rpc-testnet',
            'gateway/authentication'
          ]
        },
        {
          type: 'category',
          label: 'Flow',
          items: [
            'flow/overview',
            {
              type: 'category',
              label: 'Getting Started',
              items: [
                'flow/getting-started/introduction',
                'flow/getting-started/quickstart',
                'flow/getting-started/first-pipeline'
              ]
            },
            {
              type: 'category',
              label: 'Concepts',
              items: [
                'flow/concepts/pipelines',
                'flow/concepts/processors',
                'flow/concepts/data-sources',
                'flow/concepts/orchestration'
              ]
            },
            {
              type: 'category',
              label: 'Tutorials',
              items: [
                'flow/tutorials/raw-transactions',
                'flow/tutorials/payments-with-memo',
                'flow/tutorials/account-balance',
                'flow/tutorials/custom-processors'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'Console',
          items: [
            'console/overview',
            'console/account-management',
            'console/usage-monitoring'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Developer Tools',
      items: [
        {
          type: 'category',
          label: 'flowctl CLI',
          items: [
            'tools/flowctl/installation',
            'tools/flowctl/commands',
            'tools/flowctl/configuration'
          ]
        },
        {
          type: 'category',
          label: 'SDKs',
          items: [
            'tools/sdks/javascript',
            'tools/sdks/python',
            'tools/sdks/go'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/api',
        'reference/webhooks',
        'reference/error-codes',
        'reference/rate-limits'
      ]
    }
  ]
};
```

### 2.2 Visual Design Updates

**Color Scheme and Typography:**
```css
/* src/css/custom.css updates */
:root {
  /* Light theme */
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  
  /* Typography */
  --ifm-font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  --ifm-heading-font-family: var(--ifm-font-family-base);
  --ifm-font-size-base: 16px;
  --ifm-line-height-base: 1.65;
  
  /* Spacing */
  --ifm-spacing-horizontal: 1.5rem;
  --ifm-spacing-vertical: 1.5rem;
  
  /* Layout */
  --ifm-container-width-xl: 1440px;
  --doc-sidebar-width: 280px;
}

[data-theme='dark'] {
  --ifm-color-primary: #4cc9f0;
  --ifm-color-primary-dark: #2dc2eb;
  --ifm-color-primary-darker: #1fbde8;
  --ifm-color-primary-darkest: #13a2c9;
  --ifm-color-primary-light: #6bd0f3;
  --ifm-color-primary-lighter: #79d5f5;
  --ifm-color-primary-lightest: #a6e3f9;
  
  --ifm-background-color: #0d1117;
  --ifm-background-surface-color: #161b22;
}

/* Enhanced sidebar styling */
.theme-doc-sidebar-container {
  border-right: 1px solid var(--ifm-toc-border-color);
  background: var(--ifm-background-surface-color);
}

.menu__link {
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.menu__link:hover {
  background: var(--ifm-hover-overlay);
}

/* Content area improvements */
.markdown {
  --ifm-h1-font-size: 2.5rem;
  --ifm-h2-font-size: 2rem;
  --ifm-h3-font-size: 1.5rem;
}

.markdown h1:first-child {
  margin-top: 0;
}

/* Code block enhancements */
.prism-code {
  font-size: 0.875rem;
  line-height: 1.7;
}
```

### 2.3 Component Updates

**Homepage Redesign:**
```jsx
// src/pages/index.js
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/flow/overview">
            Explore Flow
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProductCard({title, description, link, icon}) {
  return (
    <div className={clsx('col col--4', styles.productCard)}>
      <Link to={link} className={styles.productLink}>
        <div className={styles.productIcon}>{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Documentation for Obsrvr Web3 development platform">
      <HomepageHeader />
      <main>
        <section className={styles.products}>
          <div className="container">
            <h2>Our Products</h2>
            <div className="row">
              <ProductCard
                title="Gateway"
                description="Enterprise-grade access to Stellar and Soroban networks"
                link="/docs/gateway/overview"
                icon="🌐"
              />
              <ProductCard
                title="Flow"
                description="Build and deploy data pipelines with one-click deployment"
                link="/docs/flow/overview"
                icon="🔄"
              />
              <ProductCard
                title="Console"
                description="Manage your infrastructure and monitor usage"
                link="/docs/console/overview"
                icon="📊"
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
```

## Phase 3: Content Migration and Creation (Week 3)

### 3.1 Flow Documentation Creation

**Key Pages to Create:**

1. **flow/overview.md**
   - What is Flow? (Infrastructure building blocks for Stellar/Soroban data)
   - Key features (one-click deployment, pay-as-you-go, multiple destinations)
   - Use cases (payment processing, contract monitoring, analytics)
   - Architecture overview (processors → consumers model)

2. **flow/getting-started/quickstart.md**
   - Waitlist and access requirements
   - Subscription setup ($0.003/minute pricing)
   - Creating your first pipeline
   - Configuration wizard walkthrough
   - Monitoring deployment and logs

3. **flow/concepts/pipelines.md**
   - Pipeline lifecycle (pending → deploying → running → completed/failed)
   - Network selection (mainnet/testnet)
   - Start ledger configuration
   - Status tracking and monitoring
   - Runtime tracking for billing

4. **flow/processors/** (Individual pages for each)
   - Payments with Memo: Track payments with specific memo patterns
   - Raw Transactions: Process all network transactions
   - Account Balance: Monitor account balance changes
   - Contract Events: Subscribe to specific contract events
   - SwapService: Track Soroswap DEX transactions
   - Latest Ledger Metrics: Real-time network statistics

5. **flow/consumers/** (Individual pages for each)
   - PostgreSQL: Various schemas (generic, payments, account balance)
   - Webhook: HTTP endpoint delivery
   - Kafka: Stream processing integration
   - S3: Archival storage
   - Redis: Real-time data access
   - DuckDB/SQLite: Embedded analytics

6. **flow/reference/api.md**
   - Pipeline management endpoints
   - Schema validation API
   - Default schema templates
   - Schema recommendations API

### 3.2 Gateway Documentation Enhancement

Update existing gateway docs with:
- Clearer API examples
- Rate limiting information
- Authentication best practices
- Error handling guides
- SDK integration examples

### 3.3 Console Documentation

Create new documentation for the Obsrvr Console:
- Account management
- Usage monitoring
- Billing and pricing
- Team collaboration

## Phase 4: Features and Enhancements (Week 4)

### 4.1 Search Enhancement
Configure Algolia DocSearch for better search experience:
```javascript
// docusaurus.config.js
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
    indexName: 'obsrvr',
    contextualSearch: true,
  },
}
```

### 4.2 Version Management
Implement documentation versioning for API changes:
```javascript
// docusaurus.config.js
presets: [
  [
    'classic',
    {
      docs: {
        lastVersion: 'current',
        versions: {
          current: {
            label: 'v2.0',
          },
        },
      },
    },
  ],
],
```

### 4.3 Interactive Examples
Add interactive code examples using:
- CodeSandbox embeds for JavaScript examples
- Runnable code snippets for CLI commands
- API playground for testing endpoints

### 4.4 Feedback System
Implement user feedback collection:
```jsx
// src/theme/DocItem/Footer/index.js
import React from 'react';
import Footer from '@theme-original/DocItem/Footer';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <div className="feedback-section">
        <h4>Was this page helpful?</h4>
        <button onClick={() => sendFeedback('yes')}>Yes</button>
        <button onClick={() => sendFeedback('no')}>No</button>
      </div>
    </>
  );
}
```

## Phase 5: Testing and Deployment (Week 5)

### 5.1 Content Review
- Technical accuracy review
- Grammar and style check
- Link verification
- Code example testing

### 5.2 Performance Optimization
- Image optimization
- Build size reduction
- Lighthouse audit improvements
- SEO optimization

### 5.3 Deployment Process
1. Update GitHub Actions workflow
2. Configure custom domain
3. Set up redirects for old URLs
4. Monitor analytics

## Success Metrics

- **Content Coverage**: 100% of Flow features documented
- **Navigation**: < 3 clicks to any documentation
- **Search**: 90% of searches return relevant results
- **Performance**: Lighthouse score > 90
- **User Satisfaction**: Positive feedback > 80%

## Timeline Summary

- **Week 1**: Content gathering and organization
- **Week 2**: Design and layout implementation
- **Week 3**: Content creation and migration
- **Week 4**: Feature development
- **Week 5**: Testing and deployment

## Resources Required

- Technical writers for content creation
- Frontend developer for layout implementation
- Designer for visual assets
- DevOps for deployment configuration
- Product team for content review

## Next Steps

1. Review and approve this implementation plan
2. Assign team members to each phase
3. Set up project tracking in GitHub Issues
4. Begin Phase 1 content gathering
5. Schedule weekly progress reviews