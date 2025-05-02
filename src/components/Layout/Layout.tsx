import type { Component } from 'solid-js';
import { IPropsWithChildren } from 'types';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const Layout: Component<IPropsWithChildren> = ({ children }) => {
  return (
    <div class='flex min-h-screen flex-col bg-slate-200'>
      <Header />
      <main class='flex flex-grow items-stretch justify-center p-6'>
        {children}
      </main>
      <Footer />
    </div>
  );
};
