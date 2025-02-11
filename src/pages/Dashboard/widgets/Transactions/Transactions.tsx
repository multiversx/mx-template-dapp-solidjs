import { createEffect } from 'solid-js';
import { OutputContainer, TransactionsTable } from 'components';
import { getActiveTransactionsStatus } from 'lib/sdkDappCore';
import { useGetTransactions } from './hooks';
import { TransactionsPropsType } from './types';

export const Transactions = (props: TransactionsPropsType) => {
  const { isLoading, transactions, getTransactions } =
    useGetTransactions(props);
  const { success } = getActiveTransactionsStatus();

  createEffect(() => {
    if (success) {
      getTransactions();
    }
  });

  createEffect(() => {
    getTransactions();
  });

  if (!isLoading && transactions.length === 0) {
    return (
      <OutputContainer>
        <p class="text-gray-400">No transactions found</p>
      </OutputContainer>
    );
  }

  return (
    <div class="flex flex-col">
      <OutputContainer isLoading={isLoading} class="p-0">
        <div class="w-full h-full overflow-x-auto bg-white shadow rounded-lg">
          <TransactionsTable transactions={transactions} />
        </div>
      </OutputContainer>
    </div>
  );
};
