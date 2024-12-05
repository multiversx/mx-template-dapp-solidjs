import {
  EnvironmentsEnum,
  IProvider,
  IProviderConfig,
  InitAppType,
  ProviderTypeEnum,
  createCrossWindowProvider,
} from "lib/sdkDappCore";

// (window as any).multiversx = {};
// (window as any).multiversx.providers = [
//   {
//     name: "PEM",
//     icon: "",
//     class: new KeystoreProvider(),
//   },
// ];

const ADDITIONAL_PROVIDERS = {
  xAlias: "xAlias",
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
      type: ExtendedProviders.xAlias,
      icon: "",
      constructor: async (config: IProviderConfig) => {
        const provider = await createCrossWindowProvider({
          address: config.account?.address,
        });
        return provider as unknown as IProvider;
      },
    },
  ],
};
