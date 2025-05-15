import { useStore } from 'hooks';
import { ExplorerLinkSDKPropsType, networkSelector } from 'lib';
import { IPropsWithClass, IPropsWithChildren } from 'types';

interface ExplorerLinkPropsType
  extends Partial<ExplorerLinkSDKPropsType>,
    IPropsWithClass,
    IPropsWithChildren {
  page: string;
}

export const ExplorerLink = ({
  children,
  page,
  class: className,
  'data-testid': dataTestId,
  ...rest
}: ExplorerLinkPropsType) => {
  const store = useStore();
  const network = networkSelector(store());
  return (
    <mvx-explorer-link
      link={`${network.explorerAddress}${page}`}
      class={className}
      data-testid={dataTestId}
      {...rest}
    >
      {children ? <div slot='content'>{children}</div> : null}
    </mvx-explorer-link>
  );
};
