import { login } from "@multiversx/sdk-dapp-core/out/core/methods/login/login";
import {
  IProviderConfig,
  ProviderTypeEnum,
} from "@multiversx/sdk-dapp-core/out/core/providers/types/providerFactory.types";
import { useNavigate } from "@solidjs/router";
import { Button } from "components/Button";
import { RouteNamesEnum } from "localConstants";

export const Unlock = () => {
  const navigate = useNavigate();
  const handletLogin = (type: ProviderTypeEnum) => async () => {
    const config = {
      type,
      config: {
        network: {
          walletAddress: "https://devnet-wallet.multiversx.com",
        },
      } as IProviderConfig,
    };

    await login({
      providerConfig: config,
    });

    navigate(RouteNamesEnum.dashboard);
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
          <Button onClick={handletLogin(ProviderTypeEnum.crossWindow)}>
            🆆 Web Wallet
          </Button>
          <div class="ml-2">
            <Button onClick={handletLogin(ProviderTypeEnum.ledger)}>
              🅻 Ledger
            </Button>
          </div>
          <div class="ml-2">
            <Button onClick={handletLogin(ProviderTypeEnum.extension)}>
              🅴 Extension
            </Button>
          </div>
          <div class="ml-2">
            <Button onClick={handletLogin(ProviderTypeEnum.metamask)}>
              Ⓜ️ Metamask
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
