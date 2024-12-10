import { ProviderFactory } from '@multiversx/sdk-dapp-core/out/core/providers/ProviderFactory';
import { ProviderTypeEnum } from '@multiversx/sdk-dapp-core/out/core/providers/types/providerFactory.types';
import { useNavigate } from '@solidjs/router';
import { Button } from 'components/Button';
import { RouteNamesEnum } from 'localConstants';
import { ExtendedProviders } from 'config/appConfig';
import { walletConnectV2ProjectId } from 'config';

export const Unlock = () => {
  const navigate = useNavigate();

  const handleLogin =
    (type: keyof typeof ExtendedProviders, config = {}) =>
    async () => {
      const providerConfig = {
        type,
        config
      };

      const provider = await ProviderFactory.create(providerConfig);

      const result = await provider.login();

      if (result?.address) {
        navigate(RouteNamesEnum.dashboard);
      }
    };

  return (
    <div class="flex justify-center items-center">
      <div
        class="flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]"
        data-testid="unlockPage"
      >
        <div class="flex flex-col items-center gap-1">
          <h2 class="text-2xl">Login</h2>

          <p class="text-center text-gray-400">Choose a login method</p>
        </div>

        <div class="flex flex-col md:flex-row">
          <Button onClick={handleLogin(ProviderTypeEnum.crossWindow)}>
            🆆 Web Wallet
          </Button>
          <div class="ml-2">
            <Button onClick={handleLogin(ProviderTypeEnum.ledger)}>
              🅻 Ledger
            </Button>
          </div>
          <div class="ml-2">
            <Button onClick={handleLogin(ExtendedProviders.customWallet)}>
              🆆 Custom Wallet
            </Button>
          </div>
          <div class="ml-2">
            <Button onClick={handleLogin(ProviderTypeEnum.extension)}>
              🅴 Extension
            </Button>
          </div>
          <div class="ml-2">
            <Button onClick={handleLogin(ProviderTypeEnum.metamask)}>
              🅼 Metamask
            </Button>
          </div>
          <div class="ml-2">
            <Button onClick={handleLogin(ProviderTypeEnum.passkey)}>
              🅼 Passkey
            </Button>
          </div>
          <div class="ml-2">
            <Button
              onClick={handleLogin(ProviderTypeEnum.walletConnect, {
                walletConnect: {
                  walletConnectV2ProjectId,
                  onLogout: async () => {
                    navigate(RouteNamesEnum.unlock);
                  }
                }
              })}
            >
              🅲 WalletConnect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
