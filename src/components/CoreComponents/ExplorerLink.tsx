import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { getState, networkSelector } from "lib/sdkDappCore";
import { IPropsWithChildren, IPropsWithClass } from "types";

export interface ExplorerLinkPropsType
  extends IPropsWithClass,
    IPropsWithChildren {
  pathname: string;
  text?: any;
  icon?: IconDefinition;
  "data-testid"?: string;
}

export const ExplorerLink = ({
  pathname,
  text,
  class: className,
  children,
  "data-testid": dataTestId,
  ...rest
}: ExplorerLinkPropsType) => {
  const network = networkSelector(getState());

  return (
    <explorer-link 
      link={`${network.explorerAddress}${pathname}`}
      class={className}
      data-testid={dataTestId}
      {...rest}
    >
      {children ? <div slot='content'>{children}</div> : null}
    </explorer-link>
  );
};
