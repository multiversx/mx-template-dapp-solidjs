import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import solid from 'vite-plugin-solid';
// import devtools from "solid-devtools/vite";
import solidSvg from 'vite-plugin-solid-svg';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools({
    //   /* features options - all disabled by default */
    //   autoname: true, // e.g. enable autoname
    // }),
    solid(),
    tsconfigPaths(),
    basicSsl(),
    solidSvg(),
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true }
    })
  ],
  resolve: {
    // preserveSymlinks: true, // 👈 Activat this for links in links
    alias: {
      src: '/src'
    }
  },
  server: {
    port: 3001
  },
  build: {
    target: 'esnext'
  },
  optimizeDeps: {
    exclude: ['@multiversx/sdk-dapp-ui']
  }
});
