import {
  faChevronUp,
  faFilter,
  faPenNib,
  faRectangleList,
  faTableTennisPaddleBall,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import Fa from 'solid-fa';
import { createSignal, JSX } from 'solid-js';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

// prettier-ignore
const styles = {
  sideMenuContainer: 'side-menu-container flex flex-col gap-4',
  sideMenuHeader: 'side-menu-header flex items-center justify-between',
  sideMenuHeaderTitle: 'side-menu-header-title text-base transition-all duration-200 ease-out text-secondary',
  sideMenuHeaderIcon: 'side-menu-header-icon text-primary transition-transform duration-200 ease-out',
  sideMenuHeaderIconRotated: 'rotate-180',
  sideMenuItems: 'side-menu-items flex flex-col transition-all duration-200 ease-out',
  sideMenuItemsHidden: 'hidden',
  sideMenuItem: 'side-menu-item flex items-center gap-2 p-2 cursor-pointer text-tertiary hover:text-primary hover:bg-primary hover:font-bold transition-all duration-200 ease-out fill-tertiary hover:fill-primary hover:rounded-lg',
  sideMenuItemActive: 'side-menu-item-active text-primary bg-primary fill-primary rounded-lg font-bold transition-all duration-200 ease-out',
  sideMenuItemTitle: 'side-menu-item-title transition-all duration-200 ease-out text-sm'
} satisfies Record<string, string>;

interface SideMenuPropsType {
  setIsOpen: (isOpen: boolean) => void;
}
interface MenuItemsType {
  title: string;
  icon?:
    | string
    | IconDefinition
    | ((props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element);
  id: ItemsIdentifiersEnum;
}

const menuItems: MenuItemsType[] = [
  {
    title: 'Ping & Pong (Manual)',
    icon: faTableTennisPaddleBall,
    id: ItemsIdentifiersEnum.pingPongRaw
  },
  {
    title: 'Sign message',
    icon: faPenNib,
    id: ItemsIdentifiersEnum.signMessage
  },
  {
    title: 'Transactions (All)',
    icon: faRectangleList,
    id: ItemsIdentifiersEnum.transactionsAll
  },
  {
    title: 'Transactions (Ping & Pong)',
    icon: faFilter,
    id: ItemsIdentifiersEnum.transactionsPingPong
  }
];

export const SideMenu = ({ setIsOpen }: SideMenuPropsType) => {
  const [isCollapsed, setIsCollapsed] = createSignal(false);
  const [activeItem, setActiveItem] = createSignal(
    ItemsIdentifiersEnum.pingPongRaw
  );

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed());
  };

  const handleMenuItemClick = (id: ItemsIdentifiersEnum) => {
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 250;
      window.scrollTo({ top: y, behavior: 'smooth' });

      setActiveItem(id);
    }
  };

  const setItemIcon = (
    icon:
      | IconDefinition
      | ((props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element)
  ) => {
    if ('iconName' in icon) return <Fa icon={icon} />;

    const IconComponent = icon;
    return <IconComponent />;
  };

  return (
    <div class={styles.sideMenuContainer}>
      <div class={styles.sideMenuHeader}>
        <h2 class={styles.sideMenuHeaderTitle}>Library</h2>

        <button
          class={classNames(styles.sideMenuHeaderIcon, {
            [styles.sideMenuHeaderIconRotated]: isCollapsed()
          })}
          onClick={toggleCollapse}
        >
          <Fa icon={faChevronUp} />
        </button>
      </div>

      <div
        class={classNames(styles.sideMenuItems, {
          [styles.sideMenuItemsHidden]: isCollapsed()
        })}
      >
        {menuItems.map((item) => (
          <div
            onClick={() => handleMenuItemClick(item.id)}
            class={classNames(styles.sideMenuItem, {
              [styles.sideMenuItemActive]: item.id === activeItem()
            })}
          >
            {item.icon && setItemIcon(item.icon as any)}

            <div class={styles.sideMenuItemTitle}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
