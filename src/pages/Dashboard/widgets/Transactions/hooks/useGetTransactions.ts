import { createSignal, createMemo, createEffect } from 'solid-js';
import { apiTimeout, transactionSize } from 'config';
import {
  accountSelector,
  getState,
  networkSelector,
  getTransactions,
  ServerTransactionType
} from 'lib';
import { TransactionsPropsType } from '../types';

interface TransactionState {
  data: ServerTransactionType[];
  isLoading: boolean;
  error: Error | null;
}

export const useGetTransactions = ({ receiver }: TransactionsPropsType) => {
  const [state, setState] = createSignal<TransactionState>({
    data: [],
    isLoading: false,
    error: null
  });

  const store = createMemo(() => getState());
  const network = createMemo(() => networkSelector(store()));
  const account = createMemo(() => accountSelector(store()));

  const fetchTransactions = async () => {
    if (!account().address || !network().apiAddress) {
      console.warn(
        'Cannot fetch transactions: missing account or network info'
      );

      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const { data } = await getTransactions({
        apiAddress: network().apiAddress,
        sender: account().address,
        receiver,
        condition: receiver ? 'must' : undefined,
        transactionSize,
        apiTimeout
      });

      const transactions = Array.isArray(data) ? data : [];

      setState((prev) => ({
        ...prev,
        data: transactions,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setState((prev) => ({
        ...prev,
        data: [],
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error))
      }));
    }
  };

  createEffect(() => {
    if (account().address && network().apiAddress) {
      fetchTransactions();
    }
  });

  return {
    transactions: () => state().data,
    isLoading: () => state().isLoading,
    error: () => state().error,
    getTransactions: fetchTransactions
  };
};
