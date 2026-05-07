import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function Ico({w = 16, children}) {
  return <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>;
}

const IL = {
  search: (p) => <Ico {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Ico>,
  sun: (p) => <Ico {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></Ico>,
  moon: (p) => <Ico {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></Ico>,
  copy: (p) => <Ico {...p}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></Ico>,
  check: (p) => <Ico {...p}><path d="m4 12 5 5 11-12" /></Ico>,
  arrowR: (p) => <Ico {...p}><path d="M5 12h14M13 5l7 7-7 7" /></Ico>,
  zap: (p) => <Ico {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></Ico>,
  book: (p) => <Ico {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM4 19.5A2.5 2.5 0 0 0 6.5 22H20" /></Ico>,
  rocket: (p) => <Ico {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></Ico>,
  key: (p) => <Ico {...p}><circle cx="7.5" cy="15.5" r="3.5" /><path d="m21 2-9.6 9.6M15.5 7.5l3 3" /></Ico>,
  layers: (p) => <Ico {...p}><path d="m12 2 9 5-9 5-9-5 9-5zm9 10-9 5-9-5m18 5-9 5-9-5" /></Ico>,
  shield: (p) => <Ico {...p}><path d="M12 2 4 5v6c0 5.5 3.7 10 8 11 4.3-1 8-5.5 8-11V5l-8-3z" /></Ico>,
  webhook: (p) => <Ico {...p}><path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 1 1 8.49 13.1M11 10l-2 4M7.66 4.34a4 4 0 0 1 7.27 1.5l-1.93 5.05" /></Ico>,
  external: (p) => <Ico {...p}><path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></Ico>,
  ai: (p) => <Ico {...p}><path d="M12 8V4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" /></Ico>,
  terminal: (p) => <Ico {...p}><path d="m4 17 6-6-6-6M12 19h8" /></Ico>,
  github: (p) => <Ico {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.44 5.44 0 0 0 3.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></Ico>,
  wallet: (p) => <Ico {...p}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5M18 12a2 2 0 0 0 0 4h4v-4z" /></Ico>,
  branch: (p) => <Ico {...p}><circle cx="6" cy="3" r="2" /><circle cx="6" cy="21" r="2" /><circle cx="18" cy="6" r="2" /><path d="M6 5v14M18 8a4 4 0 0 1-4 4H8" /></Ico>,
  shieldCheck: (p) => <Ico {...p}><path d="M12 2 4 5v6c0 5.5 3.7 10 8 11 4.3-1 8-5.5 8-11V5l-8-3z" /><path d="m9 12 2 2 4-4" /></Ico>,
  filter: (p) => <Ico {...p}><path d="M3 6h18M6 12h12M10 18h4" /></Ico>,
  warn: (p) => <Ico {...p}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" /></Ico>,
  msg: (p) => <Ico {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></Ico>,
};

function Hero({onSearch}) {
  return <section className="dl-hero">
    <span className="pill"><span className="dot" /><span>All systems operational · ledger 55,812,406</span></span>
    <h1>Build on Stellar without building <span className="accent">the data layer.</span></h1>
    <p className="lede">Decoded, queryable Stellar data — bronze to gold, with tables for token transfers, contract events, account snapshots, and network metrics.</p>
    <button className="dl-bigsearch" onClick={onSearch}><span className="sicon"><IL.search w={20} /></span><span className="lab">Search Lake, Flow, Gateway</span><span className="kbd">⌘K</span></button>
    <div className="hints"><b>Try:</b><Link to="/docs/lake/guides/query-examples">Get USDC transfers for an account</Link><Link to="/docs/lake/overview">Compare Lake to raw getEvents</Link><Link to="/docs/gateway/overview">Find Gateway endpoints</Link></div>
  </section>;
}

const LAKE_CURL = `export API_KEY="your-api-key"
export BASE="https://gateway.withobsrvr.com/lake/v1/testnet"

curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/transfers?asset_code=USDC&limit=10"`;

const LAKE_SQL = `-- Same question in SQL against Lake silver tables
select
  ledger_closed_at,
  from_account,
  to_account,
  asset_code,
  amount
from silver.token_transfers
where asset_code = 'USDC'
order by ledger_closed_at desc
limit 10;`;

const LAKE_CONTRACTS = `curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/contracts/top?period=24h&limit=10"

curl -H "Authorization: Api-Key $API_KEY" \
  "$BASE/api/v1/silver/events/generic?topic0=transfer&limit=10"`;

const LANGS = {
  curl: {label: 'Lake API', install: 'Query silver.token_transfers', code: LAKE_CURL},
  sql: {label: 'SQL', install: 'Query Lake silver tables', code: LAKE_SQL},
  contracts: {label: 'Soroban', install: 'Find active contracts and CAP-67 events', code: LAKE_CONTRACTS},
};

function highlight(src) {
  return src.split('\n').map((line, i) => <div key={i}><span className="ln">{i + 1}</span><span className={/^\s*(\/\/|#)/.test(line) ? 'c' : 'v'}>{line}</span></div>);
}

function Quickstart() {
  const [lang, setLang] = useState('curl');
  const [copied, setCopied] = useState(false);
  const active = LANGS[lang];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(active.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error('Failed to copy code sample', error);
    }
  };
  return <section className="dl-section">
    <div className="head"><span className="eyebrow">Get started</span><h2>Query decoded Stellar data in under 60 seconds</h2><span className="sub"><Link to="/docs/lake/getting-started/quickstart">Lake quickstart <IL.arrowR w={12} /></Link></span></div>
    <div className="dl-quickstart">
      <ol className="dl-qs-steps" style={{listStyle: 'none', padding: 0, margin: 0}}>{['Get an API key', 'Query Lake', 'Use silver tables', 'Move to gold metrics'].map((title, i) => <li key={title} className={'dl-step ' + (i === 0 ? 'is-active' : '')}><span className="num">{i + 1}</span><div><h4>{title}</h4><p>{['Create a key in Console and send it as Authorization: Api-Key $API_KEY.', 'Start with a REST call against Lake testnet. No Horizon joins or XDR decoding.', 'Use analytics-ready tables for transfers, accounts, contract events, and Soroban calls.', 'When you need reporting, use gold datasets for stablecoin volumes, fee intelligence, and network health.'][i]}</p></div></li>)}</ol>
      <div className="dl-qs-code"><div className="code-card"><div className="head"><div className="endpoint"><span className="meth">$</span><span className="path">{active.install}</span></div><button className="copy" onClick={copy}>{copied ? <IL.check w={12} /> : <IL.copy w={12} />}{copied ? 'Copied' : 'Copy'}</button></div><div className="code-tabs">{Object.entries(LANGS).map(([id, l]) => <button key={id} className={'tab ' + (lang === id ? 'active' : '')} onClick={() => setLang(id)}>{l.label}</button>)}</div><pre className="code-body" style={{maxHeight: 'none'}}>{highlight(active.code)}</pre></div></div>
    </div>
  </section>;
}

const products = [
  ['layers', 'Obsrvr Lake', 'Decoded Stellar data, queryable. Bronze, silver, and gold tables for tokens, contracts, accounts, and network metrics.', '/docs/lake/overview', ['GET Silver API', 'SQL Lake tables', 'GET Gold metrics']],
  ['zap', 'Flow', 'Custom data pipelines composed from processors and sinks. Deploy managed Stellar pipelines when Lake is not enough.', '/docs/flow/overview', ['YAML Pipelines', 'POST Sinks', 'GET Processors']],
  ['terminal', 'Gateway', 'Drop-in Horizon and Stellar RPC access. Use it for network calls, submission, and SDK-compatible RPC.', '/docs/gateway/overview', ['RPC Stellar', 'GET Horizon', 'API Auth']],
  ['rocket', 'Get Started', 'Pick your path: query Lake, run Flow, or test Gateway. Start with Lake unless you need raw infrastructure.', '/docs/intro', ['GET Intro', 'GET Quickstart', 'GET Pricing']],
];

function Products() {
  return <section className="dl-section" id="api"><div className="head"><span className="eyebrow">Explore by product</span><h2>Lake first. Flow and Gateway when you need them.</h2><span className="sub"><Link to="/docs/intro">View the platform <IL.arrowR w={12} /></Link></span></div><div className="dl-product-grid">{products.map(([icon, title, desc, href, links]) => { const Icon = IL[icon]; return <Link key={title} className="dl-prod" to={href}><div className="ic"><Icon w={18} /></div><h3>{title}<span className="ext"><IL.external w={13} /></span></h3><p>{desc}</p><div className="links">{links.map((x) => { const [m, ...rest] = x.split(' '); return <span key={x}><span className={'method ' + (m === 'GET' ? 'get' : m === 'POST' ? 'post' : 'ws')}>{m}</span>{rest.join(' ')}</span>; })}</div></Link>; })}</div></section>;
}

const roles = [
  ['a', IL.wallet, 'Wallets', 'Show users a clear, human-readable history of their on-chain activity.', ['Decoded transaction summaries', 'Asset deltas in/out per address', 'Soroban contract calls labeled'], '/docs/lake/guides/query-examples'],
  ['b', IL.branch, 'Protocols', 'Read your own contract events and the rest of the network through a single API.', ['Contract event streams', 'Soroban storage snapshots', 'Cross-protocol asset routing'], '/docs/flow/overview'],
  ['c', IL.shieldCheck, 'Compliance teams', 'Audit-ready exports, sanctions screening, and stablecoin flow analytics.', ['Per-address activity reports', 'Sanctioned counterparty checks', 'CSV / parquet exports'], '/docs/lake/overview'],
];

function ByRole() {
  return <section className="dl-section"><div className="head"><span className="eyebrow">Start by role</span><h2>Pick the path that fits what you're building</h2></div><div className="dl-roles">{roles.map(([cls, Icon, title, desc, bullets, href]) => <Link key={title} className={'dl-role ' + cls} to={href}><div className="glyph"><Icon w={20} /></div><h3>{title}</h3><p>{desc}</p><ul>{bullets.map((b) => <li key={b}><span className="check"><IL.check w={14} /></span>{b}</li>)}</ul><span className="start">{title} guide <IL.arrowR w={13} /></span></Link>)}</div></section>;
}

const guides = [
  [IL.layers, 'Query token transfers', 'Get classic payments and SAC transfers from one Lake silver endpoint.', 'Lake · 3 min read', '/docs/lake/guides/query-examples'],
  [IL.book, 'Understand bronze, silver, and gold', 'How raw decoded ledger data becomes analytics tables and business metrics.', 'Lake · 5 min read', '/docs/lake/overview'],
  [IL.search, 'Start with the Lake quickstart', 'Run your first account, transfer, and contract-event queries.', 'Lake · 5 min read', '/docs/lake/getting-started/quickstart'],
  [IL.zap, 'Build a custom Flow pipeline', 'Use Flow when you need your own processors and sinks.', 'Flow · 7 min read', '/docs/flow/overview'],
  [IL.terminal, 'Use Gateway endpoints', 'Horizon and Stellar RPC URLs, auth, and SDK-compatible examples.', 'Gateway · 4 min read', '/docs/gateway/overview'],
  [IL.key, 'Create an API key in Console', 'Console manages keys, subscriptions, and Obsrvr resources.', 'Console · 3 min read', 'https://console.withobsrvr.com'],
];

function Guides() {
  return <section className="dl-section" id="guides"><div className="head"><span className="eyebrow">Popular topics</span><h2>Start with decoded data, then choose your tool</h2><span className="sub"><Link to="/docs/lake/guides/query-examples">Browse Lake examples <IL.arrowR w={12} /></Link></span></div><div className="dl-guides">{guides.map(([Icon, t, d, meta, href]) => <Link key={t} className="dl-guide" to={href}><div className="ic"><Icon w={18} /></div><div className="body"><div className="t">{t}</div><div className="d">{d}</div><div className="meta">{meta}</div></div><div className="arrow"><IL.arrowR w={16} /></div></Link>)}</div></section>;
}

function Help() {
  return <section className="dl-help"><div><h3>Stuck or need higher limits?</h3><p>Talk to a Stellar engineer at Obsrvr — same person who'd answer in production support.</p></div><div className="actions"><a href="mailto:support@withobsrvr.com"><IL.msg w={14} />Chat with us</a><a href="mailto:sales@withobsrvr.com" className="primary">Contact sales <IL.arrowR w={14} /></a></div></section>;
}

export default function Home() {
  useEffect(() => {
    document.body.classList.add('obsrvr-landing-page');
    return () => document.body.classList.remove('obsrvr-landing-page');
  }, []);
  const openSearch = () => window.dispatchEvent(new CustomEvent('obsrvr:open-search'));
  return <Layout title="Obsrvr Docs" description="Decoded Stellar data, queryable with SQL." wrapperClassName="obsrvr-landing-page" noFooter>
    <main className="landing-shell"><Hero onSearch={openSearch} /><Quickstart /><Products /><ByRole /><Guides /><Help /></main>
  </Layout>;
}
