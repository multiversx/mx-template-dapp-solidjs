import { createEffect, createMemo, onMount } from 'solid-js';
import { OutputContainer } from 'components';
import { getActiveTransactionsStatus, TransactionsTable } from 'lib';
import { useGetTransactions } from './hooks';
import { TransactionsPropsType } from './types';

// prettier-ignore
const styles = {
  transactionsContainer: 'transactions-container flex flex-col border border-secondary rounded-xl transition-all duration-200 ease-out',
  transactionsTable: 'transactions-table w-full h-full overflow-x-auto shadow rounded-lg'
} satisfies Record<string, string>;

export const Transactions = (props: TransactionsPropsType) => {
  const { isLoading, transactions, getTransactions } =
    useGetTransactions(props);

  const { success } = createMemo(() => getActiveTransactionsStatus())();

  onMount(() => {
    getTransactions();
  });

  createEffect(() => {
    if (success) {
      getTransactions();
    }
  });

  if (isLoading() || transactions().length === 0) {
    return (
      <div id={props.id}>
        <OutputContainer>
          <p>No transactions found</p>
        </OutputContainer>
      </div>
    );
  }

  return (
    <div id={props.id} class={styles.transactionsContainer}>
      <OutputContainer isLoading={isLoading()} class='p-0'>
        <div class={styles.transactionsTable}>
          <TransactionsTable transactions={transactions()} />
        </div>
      </OutputContainer>
    </div>
  );
};
