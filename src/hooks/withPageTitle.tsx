import { Component, createEffect } from "solid-js";

export const withPageTitle = (title: string, Component: Component) => {
  return () => {
    createEffect(() => {
      document.title = title;
    });

    return <Component />;
  };
};
