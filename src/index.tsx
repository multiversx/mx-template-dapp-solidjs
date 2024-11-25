/* @refresh reload */
import { render } from "solid-js/web";
import "./styles/globals.css";

import { App } from "./App";
import { initApp } from "lib/sdkDappCore";
import { EnvironmentsEnum } from "@multiversx/sdk-dapp-core/out/types/enums.types";

initApp({
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    environment: EnvironmentsEnum.devnet,
    network: {
      // walletAddress: "https://localhost:3002",
      walletAddress: "https://devnet-wallet.multiversx.com",
    },
  },
}).then(() => {
  const root = document.getElementById("root");
  if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
      "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
    );
  }
  render(() => <App />, root!);
});
