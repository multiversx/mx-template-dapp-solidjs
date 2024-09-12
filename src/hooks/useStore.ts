import { getStore } from "@multiversx/sdk-dapp-core/out/store/store";
import { createSignal, onCleanup } from "solid-js";

export function useStore() {
  const store = getStore();
  const [state, setState] = createSignal(store.getState());

  const unsubscribe = store.subscribe((newState) => {
    console.log("newState", newState);
    setState(newState);
  });

  onCleanup(() => unsubscribe());

  return state;
}
