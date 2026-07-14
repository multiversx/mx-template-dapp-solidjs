# MultiversX Template dApp (SolidJS)

The **MultiversX dApp Template** ported to [SolidJS](https://www.solidjs.com/) + TypeScript + [Vite](https://vitejs.dev/). It is a reference implementation of [@multiversx/sdk-dapp](https://www.npmjs.com/package/@multiversx/sdk-dapp) v5, demonstrating:

- wallet authentication (browser extension, xPortal / WalletConnect, web wallet, Ledger)
- transaction signing, sending, and tracking
- smart-contract interaction (a Ping-Pong contract)
- **how to bridge sdk-dapp's framework-agnostic store into SolidJS signals** (sdk-dapp ships React hooks, but its store works in any framework)

> **Looking for another framework?** The same dApp exists for React (TS and JS), Next.js, Vue, Angular, and React Native — see [Other templates](#other-templates).

## Requirements

- Node.js 24
- pnpm 11 (the repo ships a `pnpm-lock.yaml` — use pnpm, not npm or yarn)

> pnpm blocks native postinstall build scripts by default; the allowlist (`keccak`, `protobufjs`, `esbuild`, ...) lives in `pnpm-workspace.yaml` under `allowBuilds`. If `pnpm install` exits non-zero over a new dependency's build script, add it there.

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the dev server on the desired network

```bash
pnpm start-devnet     # or start-testnet / start-mainnet
```

Open [https://localhost:3001](https://localhost:3001) (note **https** — the dev server uses a self-signed certificate, because wallet providers only work on secure origins; accept the browser warning).

### 3. Build for production

```bash
pnpm build-devnet     # or build-testnet / build-mainnet
```

The output goes to the `dist/` folder — deploy it to any static host.

## Available scripts

| Script | Description |
| --- | --- |
| `pnpm start-devnet` / `start-testnet` / `start-mainnet` | Copy the network config, then run the Vite dev server on `https://localhost:3001` |
| `pnpm build-devnet` / `build-testnet` / `build-mainnet` | Copy the network config, then build to `dist/` |
| `pnpm copy-devnet-config` (also `testnet` / `mainnet`) | Copy `src/config/config.<network>.ts` over `src/config/index.ts` |
| `pnpm dev` | Vite dev server with the currently active config |
| `pnpm start` | Type-check (`tsc`), then dev server |
| `pnpm start-no-tsc` | Dev server, skip type-check, force dep re-optimization |
| `pnpm serve` | Preview the production build |
| `pnpm lint` | ESLint with `--fix` over `src` |

There is no test runner configured in this template.

## Network configuration

There is **no `.env` file**. The active network (devnet / testnet / mainnet) is selected at dev/build time by copying one of the per-network config files over the generated index:

- `src/config/config.devnet.ts`, `config.testnet.ts`, `config.mainnet.ts` — per-network values (`API_URL`, `contractAddress`, `environment`)
- `src/config/sharedConfig.ts` — values common to all networks (WalletConnect project ID, native auth flag, batch-transaction contracts)
- `src/config/index.ts` — **generated** by the `copy-*-config` scripts; never edit it by hand, it is overwritten on every `start-*` / `build-*`

The `environment` exported by the active config is passed to sdk-dapp's `initApp` in `src/initConfig.ts`, so the copy mechanism is the single source of truth for the network.

## Project structure

```
src/
├── assets/          # images, icons
├── components/      # shared presentational components
├── config/          # per-network configs (see Network configuration)
├── contracts/       # Ping-Pong contract ABI (loaded at runtime)
├── helpers/         # signAndSendTransactions and other utilities
├── hooks/           # useStore (the store → Solid signal bridge) + transaction hooks
├── lib/             # SDK re-export layer — the only place with deep @multiversx/* imports
├── localConstants/  # route names
├── pages/           # Home, Dashboard, Disclaimer
├── routes/          # route table consumed by App.tsx
├── styles/          # Tailwind v4 styles
├── types/           # shared TypeScript types
├── wrappers/        # layout/auth wrappers
├── initConfig.ts    # the InitAppType config passed to sdk-dapp's initApp
└── index.tsx        # entry: awaits initApp(config), then renders the app
```

## How sdk-dapp is used

1. **Bootstrap** — `src/index.tsx` awaits `initApp(config)` (config in `src/initConfig.ts`) before rendering; sdk-dapp must initialize its store and providers first.
2. **SDK import layer** — app code never imports `@multiversx/sdk-*` directly; everything goes through `src/lib/` (`sdkCore`, `sdkDapp`, `sdkDappUI`, `sdkDappUtils`). Import from `'lib'`.
3. **The Solid state bridge (the key concept)** — sdk-dapp ships React hooks, but its store is framework-agnostic. `src/hooks/useStore.ts` subscribes to the store and mirrors it into a Solid signal. Components combine it with the framework-agnostic selectors re-exported from `lib` (`accountSelector`, `networkSelector`, `getAccount`, ...):

   ```ts
   const store = useStore();
   const network = networkSelector(store());
   ```

   Prefer this over the React `useGet*` hooks.
4. **Login** — the connect button opens sdk-dapp's `UnlockPanelManager`, which lists all available providers.
5. **Transactions** — `src/helpers/signAndSendTransactions.ts` is the single choke point: `getAccountProvider()` → `refreshAccount()` → `provider.signTransactions()` → `TransactionManager.send()` → `.track()`. Feature hooks like `src/hooks/transactions/useSendPingPongTransaction.ts` build the `Transaction` objects (raw, ABI factory, or service) and delegate to it.

## Other templates

The same template dApp is implemented across several frameworks. If another stack suits your project better, start from one of these instead:

| Template | Stack | Repository |
| --- | --- | --- |
| React (TypeScript) | React 18 · TypeScript · Vite | [mx-template-dapp](https://github.com/multiversx/mx-template-dapp) |
| React (JavaScript) | React 19 · JSX · Vite | [mx-template-dapp-reactjs](https://github.com/multiversx/mx-template-dapp-reactjs) |
| Next.js | Next.js 16 (App Router) · TypeScript | [mx-template-dapp-nextjs](https://github.com/multiversx/mx-template-dapp-nextjs) |
| SolidJS **← this repo** | SolidJS · TypeScript · Vite | [mx-template-dapp-solidjs](https://github.com/multiversx/mx-template-dapp-solidjs) |
| Vue | Vue 3 · TypeScript · Vite | [mx-template-dapp-vue](https://github.com/multiversx/mx-template-dapp-vue) |
| Angular | Angular 20 · TypeScript | [mx-template-dapp-angular](https://github.com/multiversx/mx-template-dapp-angular) |
| React Native | React Native | [mx-template-dapp-react-native](https://github.com/multiversx/mx-template-dapp-react-native) |

## Links

- [@multiversx/sdk-dapp on GitHub](https://github.com/multiversx/mx-sdk-dapp) · [on npm](https://www.npmjs.com/package/@multiversx/sdk-dapp)
- [MultiversX developer docs](https://docs.multiversx.com/)
- [SolidJS documentation](https://www.solidjs.com/)
