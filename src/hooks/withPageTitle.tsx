import { Component, createEffect } from 'solid-js';

export const withPageTitle = (title: string, Comp: Component) => {
  return () => {
    createEffect(() => {
      document.title = title;
    });

    return <Comp />;
  };
};
