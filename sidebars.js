// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Main docs sidebar (for intro page)
  docs: [
    'intro',
  ],

  // Gateway product sidebar
  gateway: [
    {
      type: 'doc',
      id: 'gateway/overview',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'gateway/guides/stellar-rpc-full-history',
      ],
    },
  ],

  // Flow product sidebar
  flow: [
    {
      type: 'doc',
      id: 'flow/overview',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'flow/getting-started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: false,
      items: [
        'flow/concepts/pipelines',
      ],
    },
    {
      type: 'category',
      label: 'API',
      collapsed: false,
      items: [
        'flow/api',
      ],
    },
    {
      type: 'category',
      label: 'Processors',
      collapsed: false,
      items: [
        'flow/processors/index',
        'flow/processors/payments-with-memo',
        'flow/processors/contract-events',
      ],
    },
    {
      type: 'category',
      label: 'Consumers',
      collapsed: false,
      items: [
        'flow/consumers/index',
        'flow/consumers/postgresql',
      ],
    },
    {
      type: 'doc',
      id: 'flow/pricing',
      label: 'Pricing',
    },
  ],

  // Lake product sidebar
  lake: [
    {
      type: 'doc',
      id: 'lake/overview',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'lake/getting-started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'lake/architecture/overview',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'lake/api/overview',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'lake/guides/query-examples',
      ],
    },
  ],

  // Nodes product sidebar
  nodes: [
    {
      type: 'doc',
      id: 'nodes/overview',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'nodes/getting-started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'nodes/guides/asset-whitelisting',
      ],
    },
  ],
};

module.exports = sidebars;
