import {
  EnvironmentsEnum,
  InitAppType,
  ProviderTypeEnum,
  CrossWindowProviderStrategy
} from 'lib/sdkDappCore';
import { walletConnectV2ProjectId } from 'config';
import { RouteNamesEnum } from 'localConstants';

const ADDITIONAL_PROVIDERS = {
  customWallet: 'customWallet'
} as const;

export const ExtendedProviders = {
  ...ProviderTypeEnum,
  ...ADDITIONAL_PROVIDERS
} as const;

export const appConfig: InitAppType = {
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    environment: EnvironmentsEnum.devnet,
    network: {
      // walletAddress: "https://localhost:3002",
      walletAddress: 'https://devnet-wallet.multiversx.com'
    },
    providers: {
      crossWindow: {
        isBrowserWithPopupConfirmation: true
      },
      walletConnect: {
        walletConnectV2ProjectId,
        onLogout: async () => {
          window.location.replace(RouteNamesEnum.unlock);
        }
      }
    }
  },
  customProviders: [
    {
      name: 'xAlias',
      type: ExtendedProviders.customWallet,
      icon: '',
      constructor: async (address?: string) => {
        const providerInstance = new CrossWindowProviderStrategy({ address });
        const provider = await providerInstance.createProvider();

        return provider;
      }
    }
  ]
};
