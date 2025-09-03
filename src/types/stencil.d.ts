import {
  ExplorerLink,
  FormatAmount,
  TransactionsTable,
  MvxTrim,
  MvxButton,
  MvxDataWithExplorerLink
} from '@multiversx/sdk-dapp-core-ui/dist/types/components';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'mvx-format-amount': FormatAmount;
      'mvx-explorer-link': ExplorerLink;
      'mvx-transactions-table': TransactionsTable;
      'mvx-trim': MvxTrim;
      'mvx-data-with-explorer-link': MvxDataWithExplorerLink;
      'mvx-button': MvxButton;
    }
  }
}
