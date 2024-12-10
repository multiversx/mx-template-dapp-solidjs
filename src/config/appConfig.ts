import {
  EnvironmentsEnum,
  IProvider,
  InitAppType,
  ProviderTypeEnum,
  createCrossWindowProvider,
} from "lib/sdkDappCore";

const ADDITIONAL_PROVIDERS = {
  customWallet: "customWallet",
} as const;

export const ExtendedProviders = {
  ...ProviderTypeEnum,
  ...ADDITIONAL_PROVIDERS,
} as const;

export const appConfig: InitAppType = {
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    environment: EnvironmentsEnum.devnet,
    network: {
      // walletAddress: "https://localhost:3002",
      walletAddress: "https://devnet-wallet.multiversx.com",
    },
  },
  customProviders: [
    {
      name: "xAlias",
      type: ExtendedProviders.customWallet,
      icon: "",
      constructor: async (address: any) => {
        const newProvider = await createCrossWindowProvider({ address });
        return newProvider as unknown as IProvider<ProviderTypeEnum>;
      },
    },
  ],
};
