import { JSX } from "solid-js";

export interface IPropsWithChildren {
  children?: JSX.Element;
}

export interface IPropsWithClass {
  class?: string;
  "data-testid"?: string;
}
