import { useNavigate } from '@solidjs/router';
import MultiversXLogo from 'assets/img/multiversx-logo.svg?component-solid';
import { Button } from 'components/Button';
import { MxLink } from 'components/MxLink';
import { getAccountProvider, getIsLoggedIn } from 'lib';
import { RouteNamesEnum } from 'localConstants';
import { ConnectButton } from './ConnectButton';
import { NotificationsButton } from './NotificationsButton';

export const Header = () => {
  const isLoggedIn = getIsLoggedIn();
  const navigate = useNavigate();
  const provider = getAccountProvider();

  const handleLogout = async () => {
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  return (
    <header class='flex flex-row align-center justify-between pl-6 pr-6 pt-6'>
      <MxLink
        class='flex items-center justify-between'
        to={isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home}
      >
        <MultiversXLogo class='w-full h-6' viewBox='0 0 490 80' />
      </MxLink>

      <nav class='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div class='flex justify-end container mx-auto items-center gap-2'>
          <div class='flex gap-1 items-center'>
            <div class='w-2 h-2 rounded-full bg-green-500' />
            <p class='text-gray-600'>{'environment'}</p>
          </div>

          {isLoggedIn ? (
            <>
              <NotificationsButton />
              <Button
                onClick={handleLogout}
                class='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
              >
                Close
              </Button>
            </>
          ) : (
            <ConnectButton />
          )}
        </div>
      </nav>
    </header>
  );
};
