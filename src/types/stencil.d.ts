import {
  ExplorerLink,
  FormatAmount,
  TransactionsTable,
} from '@multiversx/sdk-dapp-core-ui/dist/types/components';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'format-amount': FormatAmount;
      'explorer-link': ExplorerLink;
      'transactions-table': TransactionsTable;
    }
  }
}
