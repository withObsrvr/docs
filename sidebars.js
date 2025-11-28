/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  docs: [
    'intro',
    {
      type: 'category',
      label: 'Gateway',
      collapsed: false,
      items: [
        'gateway/overview',
        {
          type: 'category',
          label: 'Guides',
          items: [
            'gateway/guides/stellar-rpc-full-history',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Flow',
      collapsed: false,
      items: [
        'flow/overview',
        {
          type: 'category',
          label: 'Getting Started',
          items: [
            'flow/getting-started/quickstart',
          ],
        },
        {
          type: 'category',
          label: 'Concepts',
          items: [
            'flow/concepts/pipelines',
          ],
        },
        {
          type: 'category',
          label: 'Processors',
          items: [
            'flow/processors/index',
            'flow/processors/payments-with-memo',
            'flow/processors/contract-events',
          ],
        },
        {
          type: 'category',
          label: 'Consumers',
          items: [
            'flow/consumers/index',
            'flow/consumers/postgresql',
          ],
        },
        'flow/pricing',
      ],
    },
  ],
  // tutorial: [
  //   {
  //     type: 'category',
  //     label: 'Tutorial',
  //     items: ['tutorial-basics/create-a-document'],
  //   },
  // ],
  // products: [
  //   {
  //     type: 'category',
  //     label: 'Products',
  //     items: ['tutorial-extras/manage-docs-versions'],
  //   },
  // ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};




// export default {
//   sidebars
// };
module.exports = sidebars;