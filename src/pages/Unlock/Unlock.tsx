import { useNavigate } from "@solidjs/router";
import { Button } from "components/Button";
import { RouteNamesEnum } from "localConstants";
import { ExtendedProviders } from "config/appConfig";
import { ProviderFactory, ProviderTypeEnum } from "lib/sdkDappCore";

export const Unlock = () => {
  const navigate = useNavigate();
  const handletLogin = (type: keyof typeof ExtendedProviders) => async () => {
    const config = {
      type,
    };

    const provider = await ProviderFactory.create(config);

    await provider.login();

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
            <Button onClick={handletLogin(ExtendedProviders.customWallet)}>
              🆆 Custom Wallet
            </Button>
          </div>
          <div class="ml-2">
            <Button onClick={handletLogin(ProviderTypeEnum.extension)}>
              🅴 Extension
            </Button>
          </div>
          <div class="ml-2">
            <Button onClick={handletLogin(ProviderTypeEnum.metamask)}>
              🅼 Metamask
            </Button>
          </div>
          <div class="ml-2">
            <Button onClick={handletLogin(ProviderTypeEnum.passkey)}>
              🅼 Passkey
            </Button>
          </div>
          {/* <div class="ml-2">
            <Button onClick={handletLogin(ProviderTypeEnum.walletconnect)}>
              🅲 Walletconnect
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
