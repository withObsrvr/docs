import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className="container">
        <h1 className={styles.heroTitle}>Documentation</h1>
        <p className={styles.heroSubtitle}>
          Explore our guides and examples to integrate Obsrvr services into your Stellar & Soroban applications
        </p>
        <div className={styles.heroCTA}>
          <Link
            className={clsx("button button--primary button--lg", styles.ctaButton)}
            to="/docs/flow/getting-started/quickstart"
          >
            Get started with Flow →
          </Link>
          <Link
            className={clsx("button button--secondary button--lg", styles.ctaButton)}
            to="/docs/intro"
          >
            Explore all services
          </Link>
        </div>
      </div>
    </header>
  );
}

function PathwayCard({ title, description, links, icon }) {
  return (
    <div className={styles.pathwayCard}>
      <div className={styles.pathwayIcon}>{icon}</div>
      <h3 className={styles.pathwayTitle}>{title}</h3>
      <ul className={styles.pathwayLinks}>
        {links.map((link, idx) => (
          <li key={idx}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserPathways() {
  const pathways = [
    {
      title: "Quick start",
      icon: "⚡",
      links: [
        { label: "Introduction to Obsrvr", to: "/docs/intro" },
        { label: "Deploy your first pipeline", to: "/docs/flow/getting-started/quickstart" },
        { label: "Understand pricing", to: "/docs/flow/pricing" },
      ],
    },
    {
      title: "Gateway Services",
      icon: "🌐",
      links: [
        { label: "Connect to Stellar Horizon", to: "/docs/gateway/overview" },
        { label: "Access Stellar RPC", to: "/docs/gateway/overview" },
        { label: "API authentication", to: "/docs/gateway/overview" },
      ],
    },
    {
      title: "Flow Pipelines",
      icon: "🔄",
      links: [
        { label: "Component registry", to: "/docs/flow/registry/overview" },
        { label: "Processors", to: "/docs/flow/processors/" },
        { label: "Consumers", to: "/docs/flow/consumers/" },
      ],
    },
  ];

  return (
    <section className={styles.pathways}>
      <div className="container">
        <div className={styles.pathwayGrid}>
          {pathways.map((pathway, idx) => (
            <PathwayCard key={idx} {...pathway} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularResources() {
  const resources = [
    {
      category: "Component Registry",
      links: [
        { label: "Sources", to: "/docs/flow/registry/sources" },
        { label: "Processors", to: "/docs/flow/registry/processors" },
        { label: "Sinks", to: "/docs/flow/registry/sinks" },
        { label: "Building components", to: "/docs/flow/registry/building-components" },
      ],
    },
    {
      category: "Guides",
      links: [
        { label: "Pipeline concepts", to: "/docs/flow/concepts/pipelines" },
        { label: "Configuration", to: "/docs/flow/overview" },
        { label: "Example pipelines", to: "/docs/flow/registry/examples" },
      ],
    },
    {
      category: "Resources",
      links: [
        { label: "Console", to: "https://console.withobsrvr.com", external: true },
        { label: "GitHub", to: "https://github.com/withObsrvr", external: true },
        { label: "Status", to: "https://status.withobsrvr.com", external: true },
      ],
    },
  ];

  return (
    <section className={styles.resources}>
      <div className="container">
        <h2 className={styles.resourcesTitle}>Popular resources</h2>
        <div className={styles.resourceGrid}>
          {resources.map((section, idx) => (
            <div key={idx} className={styles.resourceSection}>
              <h3 className={styles.resourceCategory}>{section.category}</h3>
              <ul className={styles.resourceList}>
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.external ? (
                      <a href={link.to} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TryItOut() {
  return (
    <section className={styles.tryItOut}>
      <div className="container">
        <div className={styles.tryItOutContent}>
          <h2>Start building today</h2>
          <p>
            Deploy a Flow pipeline in minutes and start processing blockchain data with enterprise-grade reliability.
          </p>
          <div className={styles.tryItOutActions}>
            <Link
              className="button button--primary button--lg"
              to="/docs/flow/getting-started/quickstart"
            >
              View quickstart guide
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="https://console.withobsrvr.com/accounts/login/"
            >
              Open console →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Documentation"
      description="Build on Stellar & Soroban with Obsrvr's gateway services and Flow data pipelines"
    >
      <HomepageHeader />
      <main>
        <UserPathways />
        <PopularResources />
        <TryItOut />
      </main>
    </Layout>
  );
}
