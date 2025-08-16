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
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleGradient}>Obsrvr Docs</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Build on Stellar & Soroban with confidence
        </p>
        <p className={styles.heroDescription}>
          Everything you need to integrate with Obsrvr's gateway services and Flow data pipelines
        </p>
      </div>
    </header>
  );
}

function FeatureCard({ title, description, link, icon, gradient }) {
  return (
    <Link to={link} className={styles.featureCard}>
      <div className={clsx(styles.featureCardInner, gradient)}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </Link>
  );
}

function HomepageFeatures() {
  const features = [
    {
      title: "What is Obsrvr?",
      description: "Learn about our Web3 development platform for Stellar and Soroban networks",
      link: "/docs/intro",
      icon: "🌐",
      gradient: styles.gradientBlue,
    },
    {
      title: "Gateway Services",
      description: "Connect to Stellar Horizon and Soroban RPC with enterprise-grade reliability",
      link: "/docs/gateway/overview",
      icon: "🔌",
      gradient: styles.gradientPurple,
    },
    {
      title: "Flow Pipelines",
      description: "Build data pipelines to process blockchain events with one-click deployment",
      link: "/docs/flow/overview",
      icon: "🔄",
      gradient: styles.gradientGreen,
    },
    {
      title: "Get Started",
      description: "Create your first Flow pipeline and start processing blockchain data",
      link: "/docs/flow/getting-started/quickstart",
      icon: "🚀",
      gradient: styles.gradientOrange,
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Popular Topics</h2>
        <div className={styles.linkGrid}>
          <div className={styles.linkColumn}>
            <h3>Getting Started</h3>
            <ul>
              <li><Link to="/docs/intro">Introduction</Link></li>
              <li><Link to="/docs/flow/getting-started/quickstart">Flow Quickstart</Link></li>
              <li><Link to="/docs/flow/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3>Flow Components</h3>
            <ul>
              <li><Link to="/docs/flow/processors/">Processors</Link></li>
              <li><Link to="/docs/flow/consumers/">Consumers</Link></li>
              <li><Link to="/docs/flow/concepts/pipelines">Pipeline Concepts</Link></li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3>Resources</h3>
            <ul>
              <li><a href="https://console.withobsrvr.com">Console</a></li>
              <li><a href="https://github.com/withObsrvr">GitHub</a></li>
              <li><a href="https://status.withobsrvr.com">Status</a></li>
            </ul>
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
        <HomepageFeatures />
        <QuickLinks />
      </main>
    </Layout>
  );
}