import { JSX } from 'solid-js';

export interface IPropsWithChildren {
  children?: JSX.Element;
}

export interface IPropsWithClass {
  class?: string;
  'data-testid'?: string;
}

export interface IPropsWithStyles {
  styles?: Record<string, string>;
}
