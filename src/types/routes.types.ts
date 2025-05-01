import { Component } from 'solid-js';

export type RouteType = {
  path: string;
  component: Component;
};

export type RouteWithTitleType = RouteType & {
  title: string;
};
