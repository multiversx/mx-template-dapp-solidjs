## Usage

This project requires **Node 24** (see `.nvmrc`) and is managed with **pnpm 11** (pinned via the `packageManager` field). Dependencies are tracked in `pnpm-lock.yaml`.

```bash
$ pnpm install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `pnpm dev` or `pnpm start`

Runs the app in the development mode over HTTPS (self-signed certificate).<br>
Open [https://localhost:3001](https://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br>

### `pnpm build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `pnpm lint`

Runs ESLint over `src` with `--fix`.

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
