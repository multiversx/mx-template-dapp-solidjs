import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // Optional: Add other SVGR options here
      },
    }),
  ],
  server: {
    port: 3001,
  },
  build: {
    target: "esnext",
  },
});
