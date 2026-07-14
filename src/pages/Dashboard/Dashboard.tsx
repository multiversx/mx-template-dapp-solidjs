import classNames from 'classnames';
import { createSignal } from 'solid-js';

import { contractAddress } from 'config';

import { WidgetType } from 'types/widget.types';

import { DashboardHeader, LeftPanel, Widget } from './components';

import { ItemsIdentifiersEnum } from './dashboard.types';
import { PingPongRaw, SignMessage, Transactions } from './widgets';

// prettier-ignore
const styles = {
  dashboardContainer: 'dashboard-container flex w-screen min-h-screen relative border-t border-b border-secondary transition-all duration-200 ease-out',
  mobilePanelContainer: 'mobile-panel-container fixed bottom-0 left-0 right-0 z-50 max-h-full overflow-y-auto lg:static lg:max-h-none lg:overflow-visible',
  desktopPanelContainer: 'desktop-panel-container lg:flex',
  dashboardContent: 'dashboard-content flex flex-col gap-6 justify-center items-center flex-1 w-full overflow-auto border-l border-secondary p-4 lg:p-6 transition-all duration-200 ease-out',
  dashboardContentMobilePanelOpen: 'dashboard-content-mobile-panel-open opacity-20 lg:opacity-100 pointer-events-none',
  dashboardWidgets: 'dashboard-widgets flex flex-col gap-6  w-full max-w-320'
} satisfies Record<string, string>;

const dashboardWidgets: WidgetType[] = [
  {
    title: 'Ping & Pong (Manual)',
    widget: PingPongRaw,
    description:
      'Smart Contract interactions using manually formulated transactions',
    reference:
      'https://docs.multiversx.com/sdk-and-tools/indices/es-index-transactions/'
  },
  {
    title: 'Sign message',
    widget: SignMessage,
    description: 'Message signing using the connected account',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account-1'
  },
  {
    title: 'Transactions (All)',
    widget: () => <Transactions id={ItemsIdentifiersEnum.transactionsAll} />,
    description: 'List transactions for the connected account',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTransactions'
  },
  {
    title: 'Transactions (Ping & Pong)',
    widget: (props) => (
      <Transactions identifier='transactions-ping-pong' {...props} />
    ),
    props: { receiver: contractAddress },
    description: 'List transactions filtered for a given Smart Contract',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTransactions'
  }
];

export const Dashboard = () => {
  const [isMobilePanelOpen, setIsMobilePanelOpen] = createSignal(false);

  return (
    <div class={styles.dashboardContainer}>
      <div
        class={classNames(
          styles.mobilePanelContainer,
          styles.desktopPanelContainer
        )}
      >
        <LeftPanel
          isOpen={isMobilePanelOpen()}
          setIsOpen={setIsMobilePanelOpen}
        />
      </div>

      <div
        class={classNames(styles.dashboardContent, {
          [styles.dashboardContentMobilePanelOpen]: isMobilePanelOpen()
        })}
        style={{ 'background-image': 'url(src/assets/img/background.svg)' }}
      >
        <DashboardHeader />

        <div class={styles.dashboardWidgets}>
          {dashboardWidgets.map((element) => (
            <Widget {...element} />
          ))}
        </div>
      </div>
    </div>
  );
};
