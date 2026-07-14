import { For } from 'solid-js';
import { SignedTransactionType } from 'lib';

import { TransactionOutput } from './TransactionOutput';

// prettier-ignore
const styles = {
  transactionsContainer: 'transactions-container flex flex-col gap-4'
} satisfies Record<string, string>;

export const TransactionsOutput = (props: {
  transactions: SignedTransactionType[];
}) => {
  return (
    <div class={styles.transactionsContainer}>
      <For each={props.transactions}>
        {(transaction) => <TransactionOutput transaction={transaction} />}
      </For>
    </div>
  );
};
