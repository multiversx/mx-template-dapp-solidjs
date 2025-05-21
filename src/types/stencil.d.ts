import {
  ExplorerLink,
  FormatAmount,
  TransactionsTable
} from '@multiversx/sdk-dapp-core-ui/dist/types/components';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'mvx-format-amount': FormatAmount;
      'mvx-explorer-link': ExplorerLink;
      'mvx-transactions-table': TransactionsTable;
    }
  }
}
