import { useNavigate } from '@solidjs/router';
import { ParentProps, createEffect } from 'solid-js';
import { getIsLoggedIn } from 'lib/sdkDappCore';
import { RouteNamesEnum } from 'localConstants/routes';

interface AuthRedirectWrapperPropsType extends ParentProps {
  requireAuth?: boolean;
}

export const AuthRedirectWrapper = ({
  children,
  requireAuth = true,
}: AuthRedirectWrapperPropsType) => {
  const navigate = useNavigate();
  const isLoggedIn = getIsLoggedIn();

  createEffect(() => {
    if (isLoggedIn && !requireAuth) {
      navigate(RouteNamesEnum.dashboard);
      return;
    }

    if (!isLoggedIn && requireAuth) {
      navigate(RouteNamesEnum.unlock);
    }
  });

  return <>{children}</>;
};
