import {
  faChevronUp,
  faLayerGroup,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { Fa } from 'solid-fa';

import { Component, createSignal, JSX } from 'solid-js';
import xLogo from 'assets/img/x-logo.svg';
import { Label } from 'components';
import { useStore } from 'hooks';
import {
  DECIMALS,
  DIGITS,
  FormatAmount,
  FormatAmountController,
  getAccount,
  networkSelector,
  MvxTrim
} from 'lib';

import { Username } from './components';
import { getUserHerotag } from './hooks/getUserHerotag';

// prettier-ignore
const styles = {
  connectedAccountContainer: 'connected-account flex flex-col gap-4',
  connectedAccountHeader: 'connected-account-header flex justify-between items-center',
  connectedAccountHeaderTitle: 'connected-account-header-title text-base transition-all duration-200 ease-out text-secondary',
  connectedAccountHeaderIcon: 'connected-account-header-icon text-primary transition-transform duration-200 ease-out',
  connectedAccountHeaderIconRotated: 'rotate-180',
  connectedAccountDetails: 'connected-account-details flex flex-col',
  connectedAccountDetailsHidden: 'hidden',
  connectedAccountInfo: 'connected-account-info flex h-14 gap-2 items-center',
  connectedAccountInfoIcon: 'connected-account-info-icon min-w-10 min-h-10 max-h-10 max-w-10 flex items-center justify-center text-tertiary border border-secondary rounded-lg overflow-hidden p-1.5 transition-all duration-200 ease-out',
  connectedAccountInfoText: 'connected-account-info-text truncate flex flex-col',
  connectedAccountInfoTextValue: 'connected-account-info-text-value text-primary transition-all duration-200 ease-out text-base',
  connectedAccountDetailsIcon: 'connected-account-details-icon w-6 h-6',
  connectedAccountDetailsHerotag: 'connected-account-details-herotag rounded-full',
  connectedAccountDetailsXLogo: 'connected-account-details-xlogo fill-primary w-8 h-8 transition-all duration-200 ease-out',
  connectedAccountDetailsTrimAddress: 'w-max'
} satisfies Record<string, string>;

interface AccountDetailsType {
  icon: JSX.Element | string;
  label: string;
  value: number | JSX.Element;
}

export const Account = () => {
  const store = useStore();
  const network = networkSelector(store());
  const account = getAccount(store());
  const address = getAccount()?.address;

  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: network.egldLabel,
      input: account.balance
    });

  const [isCollapsed, setIsCollapsed] = createSignal(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed());
  };

  const [herotag, profileUrl] = getUserHerotag(address);
  const XLogo = xLogo as unknown as Component<
    JSX.SvgSVGAttributes<SVGSVGElement>
  >;

  const accountDetails: AccountDetailsType[] = [
    {
      icon: <Fa icon={faWallet} class={styles.connectedAccountDetailsIcon} />,
      label: 'Address',
      value: (
        <MvxTrim
          text={address}
          class={styles.connectedAccountDetailsTrimAddress}
        />
      ) as JSX.Element
    },
    {
      icon: herotag() ? (
        profileUrl ? (
          <img
            src={profileUrl()}
            class={styles.connectedAccountDetailsHerotag}
          />
        ) : (
          herotag().slice(0, 3)
        )
      ) : (
        ('@' as any)
      ),
      label: 'Herotag',
      value: (<Username address={address} />) as JSX.Element
    },
    {
      icon: (
        <Fa icon={faLayerGroup} class={styles.connectedAccountDetailsIcon} />
      ),
      label: 'Shard',
      value: account.shard as number
    },
    {
      icon: <XLogo class={styles.connectedAccountDetailsXLogo} />,
      label: 'Balance',
      value: (
        <FormatAmount
          isValid={isValid}
          valueInteger={valueInteger}
          valueDecimal={valueDecimal}
          label={label}
          data-testid='balance'
          decimalClass='opacity-70'
          labelClass='opacity-70'
        />
      ) as JSX.Element
    }
  ];

  return (
    <div class={styles.connectedAccountContainer}>
      <div class={styles.connectedAccountHeader}>
        <h2 class={styles.connectedAccountHeaderTitle}>
          Connected account details
        </h2>

        <button
          class={classNames(styles.connectedAccountHeaderIcon, {
            [styles.connectedAccountHeaderIconRotated]: isCollapsed()
          })}
          onClick={toggleCollapse}
        >
          <Fa icon={faChevronUp} />
        </button>
      </div>

      <div
        data-testid='topInfo'
        class={classNames(styles.connectedAccountDetails, {
          [styles.connectedAccountDetailsHidden]: isCollapsed()
        })}
      >
        {accountDetails.map((accountDetail) => (
          <div class={styles.connectedAccountInfo}>
            <div class={styles.connectedAccountInfoIcon}>
              {accountDetail.icon as any}
            </div>

            <p class={styles.connectedAccountInfoText}>
              <Label>{accountDetail.label}</Label>
              <span class={styles.connectedAccountInfoTextValue}>
                {accountDetail.value as any}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
