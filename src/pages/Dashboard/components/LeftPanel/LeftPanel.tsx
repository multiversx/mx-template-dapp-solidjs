import {
  faClose,
  faPowerOff,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from '@solidjs/router';
import classNames from 'classnames';

import Fa from 'solid-fa';
import IconExpand from 'assets/img/expand-up-down.svg';
import { Logo } from 'components';
import { getAccount, getAccountProvider, getIsLoggedIn } from 'lib';
import { RouteNamesEnum } from 'localConstants';

import { Account, SideMenu } from './components';

// prettier-ignore
const styles = {
  leftPanelContainer: 'left-panel-container flex flex-col w-screen lg:w-80 gap-8 lg:gap-0 py-4 p-6 sticky lg:h-screen top-0 bg-primary lg:bg-accent transition-all duration-200 ease-out overflow-y-scroll',
  leftPanelContainerOpen: 'left-panel-container-open rounded-t-2xl lg:rounded-t-none p-6',
  leftPanelMobileHeader: 'left-panel-mobile-header flex lg:hidden justify-between items-center pt-2 pb-1 transition-all duration-200 ease-out',
  leftPanelMobileHeaderIconClose: 'left-panel-mobile-header-icon-close text-link transition-all duration-200 ease-out', 
  leftPanelMobileHeaderIconOpen: 'left-panel-mobile-header-icon-open fill-primary transition-all duration-200 ease-out', 
  leftPanel: 'left-panel flex flex-col gap-4 lg:!block',
  leftPanelHidden: 'hidden',
  leftPanelMobileAddressSection: 'left-panel-mobile-address-section lg:hidden bg-accent transition-all duration-200 ease-out h-8 flex items-center justify-between rounded-full border border-secondary px-6 py-4',
  leftPanelMobileAddress: 'left-panel-mobile-address flex gap-2 items-center justify-start w-[calc(100%-50px)]',
  leftPanelMobileAddressIcon: 'left-panel-mobile-address-icon text-accent transition-all duration-200 ease-out',
  logoutButton: 'text-center text-link hover:text-primary transition-all duration-200 ease-out cursor-pointer',
  leftPanelComponents: 'flex flex-col gap-4 bg-accent p-6 lg:p-0 rounded-2xl transition-all duration-200 ease-out',
  leftPanelBar: 'w-full h-0.25 bg-neutral-700 opacity-40 transition-all duration-200 ease-out'
} satisfies Record<string, string>;

interface LeftPanelPropsType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const LeftPanel = ({
  isOpen = false,
  setIsOpen
}: LeftPanelPropsType) => {
  const handleOpenPanel = () => {
    setIsOpen(!isOpen);
  };

  const address = getAccount()?.address;

  const isLoggedIn = getIsLoggedIn();

  const provider = getAccountProvider();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  return (
    <div
      class={classNames(styles.leftPanelContainer, {
        [styles.leftPanelContainerOpen]: isOpen
      })}
    >
      <div class={styles.leftPanelMobileHeader} onClick={handleOpenPanel}>
        <Logo />

        {isOpen ? (
          <Fa
            icon={faClose}
            class={styles.leftPanelMobileHeaderIconClose}
            // size='xl' 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
          />
        ) : (
          <div class={styles.leftPanelMobileHeaderIconOpen}>
            <IconExpand />
          </div>
        )}
      </div>

      <div
        class={classNames(styles.leftPanel, {
          [styles.leftPanelHidden]: !isOpen
        })}
      >
        <div class={styles.leftPanelMobileAddressSection}>
          <div class={styles.leftPanelMobileAddress}>
            <Fa icon={faWallet} class={styles.leftPanelMobileAddressIcon} />

            {/* <AddressComponent address={address} isHeader /> */}
          </div>

          {isLoggedIn && (
            <button onClick={handleLogout} class={styles.logoutButton}>
              <Fa icon={faPowerOff} />
            </button>
          )}
        </div>

        <div class={styles.leftPanelComponents}>
          <Account />

          <div class={styles.leftPanelBar} />

          <SideMenu setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};
