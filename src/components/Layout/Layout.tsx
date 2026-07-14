import { Component } from 'solid-js';
import { Footer, Header } from 'components';
import { IPropsWithChildren } from 'types';

// prettier-ignore
const styles = {
  layoutContainer: 'layout-container flex min-h-screen flex-col bg-accent transition-all duration-200 ease-out',
  mainContainer: 'main-container flex flex-grow items-stretch justify-center'
} satisfies Record<string, string>;

export const Layout: Component<IPropsWithChildren> = ({ children }) => (
  <div class={styles.layoutContainer}>
    <Header />

    <main class={styles.mainContainer}>{children}</main>

    <Footer />
  </div>
);
