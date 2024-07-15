import { Button } from "components/Button";
import { MxLink } from "components/MxLink";
import { webWalletLogin } from "lib/sdkDappCore";
import { RouteNamesEnum } from "localConstants";

export const Unlock = () => {
  const handleWebWalletLogin = async () => {
    const account = await webWalletLogin({
      nativeAuth: true,
    });
    console.log(account);
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
          <Button onClick={handleWebWalletLogin}>Web Wallet</Button>
        </div>
      </div>
    </div>
  );
};
