# AGENTS.md — mx-template-dapp-solidjs

Guidance for AI agents (and humans) working with code in this repository.

## Overview

This is the **MultiversX dApp template ported to SolidJS** (the official template is React-based). It is a Vite + SolidJS + TypeScript + Tailwind v4 app that demonstrates wallet login, account/network state, and signing/sending transactions against the MultiversX blockchain (a Ping-Pong sample contract).

The central challenge of this codebase: `@multiversx/sdk-dapp` ships **React hooks**, but the app is SolidJS. The `src/lib/` layer bridges that gap.

## Commands

Requires **Node 24** and **pnpm 11** (there is a `pnpm-lock.yaml` — use pnpm, not npm/yarn).

- `pnpm start-devnet` / `start-testnet` / `start-mainnet` — copy the network config, then dev server. Served over HTTPS (basic-ssl plugin) on **port 3001**.
- `pnpm build-devnet` / `build-testnet` / `build-mainnet` — copy the network config, then production build to `dist/`.
- `pnpm dev` — dev server with the currently active config; `pnpm start` runs a `tsc` typecheck first.
- `pnpm start-no-tsc` — dev server, skip typecheck, force re-optimize deps.
- `pnpm serve` — preview the production build.
- `pnpm lint` — ESLint with `--fix` over `src` (Prettier rules enforced as errors: single quotes, semicolons, LF line endings).
- `pnpm exec tsc --noEmit` — typecheck only.

There is no test runner or `test` script — the project has no tests. Don't assume `pnpm test` exists.

Native build scripts for some deps (`keccak`, `protobufjs`, `unrs-resolver`, `esbuild`) are allow-listed in `pnpm-workspace.yaml` under `allowBuilds`; pnpm errors out on install if a new dep needs a build script that isn't listed there.

## Network configuration

The active network is selected by file copy: the `copy-*-config` scripts (run by every `start-*` / `build-*`) copy `src/config/config.<network>.ts` over `src/config/index.ts`.

- **`src/config/index.ts` is a generated file** — never edit it by hand; edit `config.devnet.ts` / `config.testnet.ts` / `config.mainnet.ts` or `sharedConfig.ts` instead. The committed default is devnet.
- Each per-network config exports `contractAddress`, `API_URL`, `sampleAuthenticatedDomains`, and `environment` (an `EnvironmentsEnum` value), and re-exports `sharedConfig.ts` (`walletConnectV2ProjectId`, `nativeAuth`, `BATCH_TRANSACTIONS_SC`).
- `src/initConfig.ts` imports `environment` from `./config` and passes it to `initApp` — the copy mechanism is the single source of truth for the network.

## Architecture

### The `src/lib/` SDK bridge layer (most important concept)

**Always import MultiversX SDK functionality through `src/lib/`, never directly from `@multiversx/sdk-*` packages in app code.** `src/lib/index.ts` re-exports everything; app code imports from `'lib'`.

- `lib/sdkCore.ts` — re-exports classes from `@multiversx/sdk-core` (`Address`, `Transaction`, `SmartContractTransactionsFactory`, etc.).
- `lib/sdkDapp/` — wraps `@multiversx/sdk-dapp`:
  - `sdkDapp.hooks.ts` re-exports the React hooks (`useGetAccount`, `useGetNetworkConfig`, ...). These are React hooks — prefer the selector + `useStore` pattern below in Solid components.
  - `sdkDapp.selectors.ts` re-exports framework-agnostic store accessors (`getAccount`, `getState`, `accountSelector`, `networkSelector`, `getPendingTransactions`) — **these are the Solid-friendly path** into sdk-dapp state.
  - `components/` — Solid wrappers around sdk-dapp UI (`MvxButton`, `FormatAmount`, `ExplorerLink`, `TransactionsTable`, etc.).
- `lib/sdkDappUI`, `lib/sdkDappUtils` — wrap the web-component UI kit and util packages.

### React → Solid state bridge: `src/hooks/useStore.ts`

sdk-dapp exposes a framework-agnostic store. `useStore()` subscribes to it and mirrors it into a Solid signal, cleaning up on unmount. The idiomatic pattern in components/hooks is:

```ts
const store = useStore();
const network = networkSelector(store());  // selector from 'lib'
```

Use this instead of the React `useGet*` hooks wherever possible.

### App bootstrap

`src/index.tsx` calls `initApp(config)` (from `lib/sdkDapp`) **and awaits it** before rendering — sdk-dapp must initialize the store/providers first. The config lives in `src/initConfig.ts` (`InitAppType`: environment from the active `config`, WalletConnect projectId, theme `mvx:dark-theme`, session storage).

`src/App.tsx` wraps all routes (from `src/routes/routes.ts`) in a shared `Layout` and a `Suspense`. Routes map to `pages/` via `RouteNamesEnum` in `src/localConstants/routes.ts`.

### Transactions flow

`src/helpers/signAndSendTransactions.ts` is the single choke point: `getAccountProvider()` → `refreshAccount()` → `provider.signTransactions()` → `TransactionManager.send()` → `.track()`. Feature hooks (e.g. `src/hooks/transactions/useSendPingPongTransaction.ts`) build `Transaction` objects (raw, via ABI factory, or via service) and delegate to this helper. The Ping-Pong ABI is loaded at runtime via `axios.get('src/contracts/ping-pong.abi.json')`.

## Conventions

- **Path aliases**: imports are bare from `src/` (e.g. `import { useStore } from 'hooks'`, `from 'lib'`, `from 'config'`). Configured via `tsconfig.json` `baseUrl: "src"` + `vite-tsconfig-paths`. No `@/` or `./` deep relative imports across top-level dirs.
- **Barrel files**: nearly every directory has an `index.ts`/`index.tsx` re-exporting its contents; import from the directory, not the file.
- **Component folders**: each component lives in `ComponentName/ComponentName.tsx` + `index.ts`.
- This is **SolidJS, not React** — use `createSignal`/`createEffect`/`onCleanup`, `<Show>`/`<For>`, and `class` (not `className`) via the SolidJS JSX runtime (`jsxImportSource: solid-js`). `react`/`react-dom` are only present as transitive deps of sdk-dapp.

## Gotchas

- `@multiversx/sdk-dapp-ui` is excluded from Vite dep optimization (`optimizeDeps.exclude`) — it ships web components; don't add it back.
- `vite-plugin-node-polyfills` provides `Buffer`/`global`/`process` — blockchain code relies on these browser polyfills.
- Build target is `esnext`; dev server requires accepting the self-signed HTTPS cert.

## Verification

To prove a change works, run in order:

```bash
pnpm exec tsc --noEmit   # typecheck
pnpm lint                # must pass
pnpm build-devnet        # production build must succeed
```

There are no automated tests — for login/transaction changes, start `pnpm start-devnet`, open `https://localhost:3001`, and exercise the flow manually. After `build-testnet`/`build-mainnet` runs, run `pnpm copy-devnet-config` so the committed `src/config/index.ts` shows no diff.

## Other templates

The same template dApp exists for other frameworks — useful when a task actually targets a different stack:

| Template | Stack | Repository |
| --- | --- | --- |
| React (TypeScript) | React 18 · TypeScript · Vite | [mx-template-dapp](https://github.com/multiversx/mx-template-dapp) |
| React (JavaScript) | React 19 · JSX · Vite | [mx-template-dapp-reactjs](https://github.com/multiversx/mx-template-dapp-reactjs) |
| Next.js | Next.js 16 (App Router) · TypeScript | [mx-template-dapp-nextjs](https://github.com/multiversx/mx-template-dapp-nextjs) |
| SolidJS **← this repo** | SolidJS · TypeScript · Vite | [mx-template-dapp-solidjs](https://github.com/multiversx/mx-template-dapp-solidjs) |
| Vue | Vue 3 · TypeScript · Vite | [mx-template-dapp-vue](https://github.com/multiversx/mx-template-dapp-vue) |
| Angular | Angular 20 · TypeScript | [mx-template-dapp-angular](https://github.com/multiversx/mx-template-dapp-angular) |
| React Native | React Native | [mx-template-dapp-react-native](https://github.com/multiversx/mx-template-dapp-react-native) |
