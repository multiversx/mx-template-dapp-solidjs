import { useLocation } from '@solidjs/router';
import { createEffect } from 'solid-js';

export const useScrollToElement = () => {
  const location = useLocation();

  createEffect(() => {
    const [, anchor] = location.hash.split('#');

    if (!anchor) {
      return;
    }

    const element = document.getElementById(anchor);

    if (!element) {
      return;
    }

    element.scrollIntoView();
  });
};
