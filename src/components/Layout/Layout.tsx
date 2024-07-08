import type { Component, JSX } from "solid-js";
import { Footer } from "./components/Footer";
import { IPropsWithChildren } from "types";
import { Header } from "./components/Header";

export const Layout: Component<IPropsWithChildren> = ({ children }) => {
  console.log("\x1b[42m%s\x1b[0m", 112);

  return (
    <div class="flex min-h-screen flex-col bg-slate-200">
      <Header />
      <main class="flex flex-grow items-stretch justify-center p-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};
