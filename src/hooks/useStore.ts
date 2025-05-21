import { createSignal, onCleanup } from 'solid-js';
import { getStore } from 'lib';

export function useStore() {
  const store = getStore();
  const [state, setState] = createSignal(store.getState());

  const unsubscribe = store.subscribe((newState) => {
    setState(newState);
  });

  onCleanup(() => unsubscribe());

  return state;
}
