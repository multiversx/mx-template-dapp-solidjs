import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUpRightFromSquare,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { getState, networkSelector } from "lib/sdkDappCore";
import Fa from "solid-fa";
import { IPropsWithChildren, IPropsWithClass } from "types";

export interface ExplorerLinkPropsType
  extends IPropsWithClass,
    IPropsWithChildren {
  page: string;
  text?: any;
  customExplorerIcon?: IconDefinition;
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
    <Fa icon={customExplorerIcon ?? faArrowUpRightFromSquare} />
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
