import type { Component } from "solid-js";
import { Footer } from "./components/Footer";
import { IPropsWithChildren } from "types";
import { Header } from "./components/Header";
import { Button } from "components/Button";
import { getState, networkSelector } from "lib/sdkDappCore";

export const Layout: Component<IPropsWithChildren> = ({ children }) => {
  const logNetwork = () => {
    const a = networkSelector(getState());
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
