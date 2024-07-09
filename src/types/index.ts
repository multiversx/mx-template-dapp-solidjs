import { JSX, Component } from "solid-js";

export type RouteType = {
  path: string;
  component: Component;
};

export type RouteWithTitleType = RouteType & {
  title: string;
};

export interface IPropsWithChildren {
  children?: JSX.Element;
}

export interface IPropsWithClass {
  class?: string;
  "data-testid"?: string;
}
