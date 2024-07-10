import type { Component } from "solid-js";
import { networkStore } from "@multiversx/sdk-dapp-core/out/store/slices/network/network";
import { Footer } from "./components/Footer";
import { IPropsWithChildren } from "types";
import { Header } from "./components/Header";
import { Button } from "components/Button";

export const Layout: Component<IPropsWithChildren> = ({ children }) => {
  const logNetwork = () => {
    const a = networkStore.getState();
    console.log(11, a);
  };

  return (
    <div class="flex min-h-screen flex-col bg-slate-200">
      <Header />
      <main class="flex flex-grow items-stretch justify-center p-6">
        <Button onClick={logNetwork}>Click me</Button>
        {children}
      </main>
      <Footer />
    </div>
  );
};
