import { getState, networkSelector } from "lib/sdkDappCore";
import { IPropsWithChildren } from "types";

export interface ExplorerLinkPropsType extends IPropsWithChildren {
  class?: string;
  "data-testid"?: string;
  icon?: any;
  page: string;
  text?: any;
}

export const ExplorerLink = ({
  children,
  page,
  class: className,
  "data-testid": dataTestId,
  ...rest
}: ExplorerLinkPropsType) => {
  const network = networkSelector(getState());

  return (
    <explorer-link
      link={`${network.explorerAddress}${page}`}
      class={className}
      data-testid={dataTestId}
      {...rest}
    >
      {children ? <div slot="content">{children}</div> : null}
    </explorer-link>
  );
};
