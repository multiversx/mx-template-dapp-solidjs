import { createEffect, createMemo, onMount, Show } from 'solid-js';
import { OutputContainer } from 'components';
import { getActiveTransactionsStatus, TransactionsTable } from 'lib';
import { useGetTransactions } from './hooks';
import { TransactionsPropsType } from './types';

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

  return (
    <Show
      when={!isLoading() && transactions().length > 0}
      fallback={
        <OutputContainer>
          <p class='text-gray-400'>No transactions found</p>
        </OutputContainer>
      }
    >
      <div class='flex flex-col'>
        <OutputContainer isLoading={isLoading()} class='p-0'>
          <div class='w-full h-full overflow-x-auto bg-white shadow rounded-lg'>
            <TransactionsTable transactions={transactions()} />
          </div>
        </OutputContainer>
      </div>
    </Show>
  );
};
