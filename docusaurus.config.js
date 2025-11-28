// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Obsrvr Documentation",
  tagline: "Web3 development platform",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.withobsrvr.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "withObsrvr", // Usually your GitHub org/user name.
  projectName: "obsrvr-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      defaultMode: "dark",
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Docs",
        logo: {
          alt: "Obsrvr Logo",
          src: "img/obsrvr_black.png",
          srcDark: "img/obsrvr_white.png",
        },
        items: [
          // Products dropdown
          {
            type: "dropdown",
            label: "Products",
            position: "left",
            items: [
              {
                type: "doc",
                docId: "intro",
                label: "Overview",
              },
              {
                type: "doc",
                docId: "gateway/overview",
                label: "Gateway Services",
              },
              {
                type: "doc",
                docId: "flow/overview",
                label: "Flow Pipelines",
              },
            ],
          },
          // Documentation dropdown
          {
            type: "dropdown",
            label: "Documentation",
            position: "left",
            items: [
              {
                type: "doc",
                docId: "flow/getting-started/quickstart",
                label: "Quick Start",
              },
              {
                type: "doc",
                docId: "flow/registry/overview",
                label: "Component Registry",
              },
              {
                type: "doc",
                docId: "flow/processors/index",
                label: "Processors",
              },
              {
                type: "doc",
                docId: "flow/consumers/index",
                label: "Consumers",
              },
            ],
          },
          // Resources dropdown
          {
            type: "dropdown",
            label: "Resources",
            position: "left",
            items: [
              {
                href: "https://console.withobsrvr.com",
                label: "Console",
              },
              {
                href: "https://status.withobsrvr.com",
                label: "Status",
              },
              {
                href: "https://github.com/withObsrvr",
                label: "GitHub",
              },
            ],
          },
          // Right side items
          {
            href: "https://console.withobsrvr.com/accounts/login/",
            label: "Sign In",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Products",
            items: [
              {
                label: "Gateway Services",
                to: "/docs/gateway/overview",
              },
              {
                label: "Flow Pipelines",
                to: "/docs/flow/overview",
              },
              {
                label: "Pricing",
                to: "/docs/flow/pricing",
              },
            ],
          },
          {
            title: "Developers",
            items: [
              {
                label: "Documentation",
                to: "/docs/intro",
              },
              {
                label: "Quick Start",
                to: "/docs/flow/getting-started/quickstart",
              },
              {
                label: "Component Registry",
                to: "/docs/flow/registry/overview",
              },
              {
                label: "API Reference",
                to: "/docs/gateway/overview",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Console",
                href: "https://console.withobsrvr.com",
              },
              {
                label: "Status",
                href: "https://status.withobsrvr.com",
              },
              {
                label: "GitHub",
                href: "https://github.com/withObsrvr",
              },
              {
                label: "Support",
                href: "https://github.com/withObsrvr/docs/issues",
              },
            ],
          },
          {
            title: "Company",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/withObsrvr",
              },
              {
                label: "Blog",
                href: "https://www.withobsrvr.com/blog",
              },
              {
                label: "Terms of Service",
                href: "https://withobsrvr.com/terms",
              },
              {
                label: "Privacy Policy",
                href: "https://withobsrvr.com/privacy",
              },
            ],
          },
        ],
        copyright: `
          <div class="footer__bottom">
            <div class="footer__copyright">
              © ${new Date().getFullYear()} Obsrvr. Built for the Stellar ecosystem.
            </div>
            <div class="footer__badges">
              <span class="footer__badge">⚡ Powered by Stellar</span>
              <span class="footer__badge">🔒 Enterprise Ready</span>
            </div>
          </div>
        `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
