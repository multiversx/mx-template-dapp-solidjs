import { InitAppType } from 'lib';
import './styles/globals.css';
import './styles/tailwind.css';
import { environment, walletConnectV2ProjectId } from './config';

const DEFAULT_TOAST_LIEFTIME = 5000;

export const config: InitAppType = {
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    environment,
    providers: {
      walletConnect: {
        walletConnectV2ProjectId
      }
    },
    transactionTracking: {
      successfulToastLifetime: DEFAULT_TOAST_LIEFTIME
    },
    theme: 'mvx:dark-theme'
  }

  // Option 2: Add providers using the config `customProviders` array
  // customProviders: [customWalletProvider]
};
