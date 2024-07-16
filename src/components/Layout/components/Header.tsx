import { MxLink } from "components/MxLink";
import MultiversXLogo from "assets/img/multiversx-logo.svg?component-solid";
import { Button } from "components/Button";
import { RouteNamesEnum } from "localConstants";
import { getIsLoggedIn, logout } from "lib/sdkDappCore";
import { useLocation, useNavigate } from "@solidjs/router";

export const Header = () => {
  const isLoggedIn = getIsLoggedIn();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isUnlockRoute = pathname === RouteNamesEnum.unlock;

  const ConnectButton = isUnlockRoute ? null : (
    <MxLink to={RouteNamesEnum.unlock}>Connect</MxLink>
  );

  const handleLogout = async () => {
    await logout();
    navigate(RouteNamesEnum.unlock);
  };

  return (
    <header class="flex flex-row align-center justify-between pl-6 pr-6 pt-6">
      <MxLink
        class="flex items-center justify-between"
        to={isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home}
      >
        <MultiversXLogo class="w-full h-6" viewBox="0 0 490 80" />
      </MxLink>

      <nav class="h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent">
        <div class="flex justify-end container mx-auto items-center gap-2">
          <div class="flex gap-1 items-center">
            <div class="w-2 h-2 rounded-full bg-green-500" />
            <p class="text-gray-600">{"environment"}</p>
          </div>

          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              class="inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0"
            >
              Close
            </Button>
          ) : (
            ConnectButton
          )}
        </div>
      </nav>
    </header>
  );
};
