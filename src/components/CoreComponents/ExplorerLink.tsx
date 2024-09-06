import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getState, networkSelector } from "lib/sdkDappCore";
import { IPropsWithChildren, IPropsWithClass } from "types";

export interface ExplorerLinkPropsType
  extends IPropsWithClass,
    IPropsWithChildren {
  page: string;
  text?: any;
  customExplorerIcon?: IconProp;
  title?: string;
  onClick?: () => void;
  "data-testid"?: string;
}

export const ExplorerLink = ({
  page,
  text,
  class: className = "dapp-explorer-link",
  children,
  customExplorerIcon,
  ...rest
}: ExplorerLinkPropsType) => {
  const network = networkSelector(getState());

  const defaultContent = text ?? (
    <FontAwesomeIcon icon={customExplorerIcon ?? faArrowUpRightFromSquare} />
  );

  return (
    <a
      href={`${network.explorerAddress}${page}`}
      target="_blank"
      class={className}
      rel="noreferrer"
      {...rest}
    >
      {children ?? defaultContent}
    </a>
  );
};
