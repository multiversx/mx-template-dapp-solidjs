import { useStore } from 'hooks';
import { networkSelector } from 'lib';
import { IPropsWithChildren } from 'types';

export interface ExplorerLinkPropsType extends IPropsWithChildren {
  class?: string;
  'data-testid'?: string;
  icon?: any;
  page: string;
  text?: any;
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
    <explorer-link
      link={`${network.explorerAddress}${page}`}
      class={className}
      data-testid={dataTestId}
      {...rest}
    >
      {children ? <div slot='content'>{children}</div> : null}
    </explorer-link>
  );
};
