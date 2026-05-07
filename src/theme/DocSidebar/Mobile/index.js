import React from 'react';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

// Product configuration (same as desktop)
const products = [
  {
    name: 'Gateway',
    path: '/docs/gateway/',
    description: 'Stellar RPC & Horizon API',
  },
  {
    name: 'Flow',
    path: '/docs/flow/',
    description: 'Real-time blockchain data',
  },
  {
    name: 'Lake',
    path: '/docs/lake/',
    description: 'Data warehouse & analytics',
  },
  {
    name: 'Nodes',
    path: '/docs/nodes/',
    description: 'Dedicated Stellar infrastructure',
  },
];

function ProductSwitcherMobile({onItemClick}) {
  const location = useLocation();
  const currentPath = location.pathname;

  const getActiveProduct = () => {
    for (const product of products) {
      if (currentPath.startsWith(product.path)) {
        return product.name;
      }
    }
    return null;
  };

  const activeProduct = getActiveProduct();

  return (
    <div className={styles.productSwitcher}>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.name}>
            <Link
              to={product.path + 'overview'}
              onClick={onItemClick}
              className={clsx(
                styles.productLink,
                activeProduct === product.name && styles.productLinkActive,
              )}>
              {product.name}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/docs/intro"
            onClick={onItemClick}
            className={styles.productLink}>
            All docs...
          </Link>
        </li>
      </ul>
    </div>
  );
}

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu = ({sidebar, path}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems
          items={sidebar}
          activePath={path}
          onItemClick={(item) => {
            // Mobile sidebar should only be closed if the category has a link
            if (item.type === 'category' && item.href) {
              mobileSidebar.toggle();
            }
            if (item.type === 'link') {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
      <ProductSwitcherMobile onItemClick={() => mobileSidebar.toggle()} />
    </>
  );
};

function DocSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);
