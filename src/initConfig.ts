import { EnvironmentsEnum, InitAppType } from 'lib';
import './styles/globals.css';

const DEFAULT_TOAST_LIEFTIME = 5000;

export const config: InitAppType = {
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    environment: EnvironmentsEnum.devnet,
    network: {
      walletAddress: 'https://devnet-wallet.multiversx.com'
    },
    successfulToastLifetime: DEFAULT_TOAST_LIEFTIME
  }

  // Option 2: Add providers using the config `customProviders` array
  // customProviders: [customWalletProvider]
};
