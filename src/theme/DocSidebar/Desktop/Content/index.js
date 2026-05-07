import React, {useState} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {
  useAnnouncementBar,
  useScrollPosition,
} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

// Product configuration
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

function useShowAnnouncementBar() {
  const {isActive} = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);
  useScrollPosition(
    ({scrollY}) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

function ProductSwitcher() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine which product is active
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
              className={clsx(
                styles.productLink,
                activeProduct === product.name && styles.productLinkActive,
              )}>
              {product.name}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/docs/intro" className={styles.productLink}>
            All docs...
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function DocSidebarDesktopContent({path, sidebar, className}) {
  const showAnnouncementBar = useShowAnnouncementBar();
  return (
    <nav
      aria-label={translate({
        id: 'theme.docs.sidebar.navAriaLabel',
        message: 'Docs sidebar',
        description: 'The ARIA label for the sidebar navigation',
      })}
      className={clsx(
        'menu thin-scrollbar',
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className,
      )}>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
      <ProductSwitcher />
    </nav>
  );
}
