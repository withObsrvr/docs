import React, {useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useColorMode} from '@docusaurus/theme-common';

function Ico({w = 16, children}) {
  return <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>;
}

const icons = {
  search: (p) => <Ico {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Ico>,
  sun: (p) => <Ico {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></Ico>,
  moon: (p) => <Ico {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></Ico>,
  arrowR: (p) => <Ico {...p}><path d="M5 12h14M13 5l7 7-7 7" /></Ico>,
  github: (p) => <Ico {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.44 5.44 0 0 0 3.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></Ico>,
  layers: (p) => <Ico {...p}><path d="m12 2 9 5-9 5-9-5 9-5zm9 10-9 5-9-5m18 5-9 5-9-5" /></Ico>,
  zap: (p) => <Ico {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></Ico>,
  terminal: (p) => <Ico {...p}><path d="m4 17 6-6-6-6M12 19h8" /></Ico>,
  book: (p) => <Ico {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM4 19.5A2.5 2.5 0 0 0 6.5 22H20" /></Ico>,
  key: (p) => <Ico {...p}><circle cx="7.5" cy="15.5" r="3.5" /><path d="m21 2-9.6 9.6M15.5 7.5l3 3" /></Ico>,
};

const searchIndex = [
  ['Obsrvr overview', '/docs/intro', 'Obsrvr product hierarchy Lake Flow Gateway Console decoded Stellar data'],
  ['Obsrvr Lake', '/docs/lake/overview', 'bronze silver gold Stellar data warehouse token transfers accounts contracts metrics'],
  ['Lake quickstart', '/docs/lake/getting-started/quickstart', 'query Lake account balances token transfers contract events decoded transaction'],
  ['Lake query examples', '/docs/lake/guides/query-examples', 'USDC transfers holders contract analytics CAP-67 events search compliance balances'],
  ['Lake API overview', '/docs/lake/api/overview', 'silver semantic gold endpoints accounts transfers contracts events transactions pagination'],
  ['Lake architecture', '/docs/lake/architecture/overview', 'hot cold DuckLake PostgreSQL Parquet architecture'],
  ['Flow overview', '/docs/flow/overview', 'custom Stellar data pipelines processors consumers managed runtime'],
  ['Flow quickstart', '/docs/flow/getting-started/quickstart', 'create pipeline YAML ContractEvent PostgreSQL API apply validate'],
  ['Flow Pipeline API', '/docs/flow/api', 'pipeline API apply validate start stop export registry secrets CI/CD'],
  ['Flow pipeline concepts', '/docs/flow/concepts/pipelines', 'source processors consumers BufferedStorageSourceAdapter lifecycle billing'],
  ['Flow processors', '/docs/flow/processors/', 'payments memo contract event account data raw transactions processor registry'],
  ['Flow consumers', '/docs/flow/consumers/', 'PostgreSQL webhook Kafka S3 Redis consumer destination'],
  ['Flow pricing', '/docs/flow/pricing', 'runtime metered billing pipeline minutes price'],
  ['Gateway overview', '/docs/gateway/overview', 'Horizon Stellar RPC Gateway endpoints authentication Api-Key'],
  ['Gateway full-history RPC', '/docs/gateway/guides/stellar-rpc-full-history', 'Stellar RPC full history guide'],
  ['Nodes overview', '/docs/nodes/overview', 'dedicated Stellar infrastructure nodes Horizon RPC'],
];

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('http')) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SearchModal({open, onClose}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchIndex.slice(0, 8);
    const terms = q.split(/\s+/);
    return searchIndex
      .map(([title, href, text]) => {
        const haystack = `${title} ${text}`.toLowerCase();
        const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0) + (title.toLowerCase().includes(term) ? 2 : 0), 0);
        return {title, href, text, score};
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  return <div className="cmdk-overlay open" onClick={(e) => { if (e.target.classList.contains('cmdk-overlay')) onClose(); }}>
    <div className="cmdk">
      <div className="cmdk-input-wrap">
        {icons.search({})}
        <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search docs…" />
        <span className="kbd">Esc</span>
      </div>
      <div className="cmdk-results">
        <div className="cmdk-section">
          <h6>{query ? 'Results' : 'Popular pages'}</h6>
          {results.length ? results.map((item, index) => <Link key={item.href} className={`cmdk-item ${index === 0 ? 'active' : ''}`} to={item.href} onClick={onClose}>
            <span className="ico">{icons.book({})}</span>
            <span>{item.title}</span>
            <span className="meta">{item.href}</span>
          </Link>) : <div className="cmdk-item"><span>No results for “{query}”</span></div>}
        </div>
      </div>
      <div className="cmdk-foot">
        <span><span className="kbd">⌘K</span> Toggle</span>
        <span><span className="kbd">Esc</span> Close</span>
      </div>
    </div>
  </div>;
}

export default function ObsrvrTopNav() {
  const {pathname} = useLocation();
  const {colorMode, setColorMode} = useColorMode();
  const [searchOpen, setSearchOpen] = useState(false);
  const logoSrc = colorMode === 'dark' ? '/img/obsrvr_white.png' : '/img/obsrvr_black.png';
  const subnav = [
    ['Lake', icons.layers, '/docs/lake/overview'],
    ['Query examples', icons.search, '/docs/lake/guides/query-examples'],
    ['Flow', icons.zap, '/docs/flow/overview'],
    ['Gateway', icons.terminal, '/docs/gateway/overview'],
    ['Pricing', icons.book, '/docs/flow/pricing'],
    ['Console', icons.key, 'https://console.withobsrvr.com'],
  ];

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((value) => !value);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    const onOpenSearch = () => setSearchOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('obsrvr:open-search', onOpenSearch);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('obsrvr:open-search', onOpenSearch);
    };
  }, []);

  return <>
    <header className="navbar docs-topbar">
      <Link to="/" className="brand obsrvr-logo-brand"><img src={logoSrc} alt="Obsrvr" /></Link>
      <span className="docs-tag">Docs</span>
      <nav className="top-links">
        <Link to="/" className={pathname === '/' ? 'is-active' : ''}>Documentation</Link>
        <Link to="/docs/lake/api/overview" className={pathname.includes('/api') ? 'is-active' : ''}>API reference</Link>
        <Link to="/docs/lake/guides/query-examples" className={pathname.includes('/guides/') ? 'is-active' : ''}>Guides</Link>
        <a href="https://github.com/withObsrvr/docs">Changelog</a>
      </nav>
      <div className="docs-spacer" />
      <button className="docs-search" onClick={() => setSearchOpen(true)} aria-label="Search docs">
        <span className="search-icon">{icons.search({})}</span>
        <span>Search docs…</span>
        <span className="kbd">⌘K</span>
      </button>
      <button className="theme-toggle" aria-label="Toggle theme" onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}>
        {colorMode === 'dark' ? icons.sun({}) : icons.moon({})}
      </button>
      <a href="https://github.com/withObsrvr" className="docs-icon-btn" aria-label="GitHub">{icons.github({})}</a>
      <a href="https://console.withobsrvr.com" className="top-cta">Sign in {icons.arrowR({w: 14})}</a>
    </header>
    <div className="docs-subnav">
      {subnav.map(([label, Icon, href], index) => <Link key={label} to={href} className={isActive(pathname, href) || (pathname === '/' && index === 0) ? 'is-active' : ''}>
        <span className="icon-dot"><Icon w={14} /></span>{label}
      </Link>)}
    </div>
    <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
  </>;
}
