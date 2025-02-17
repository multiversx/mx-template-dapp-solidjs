import { createSignal, createMemo, createEffect } from "solid-js";
import { apiTimeout, transactionSize } from "config";
import { getTransactions } from "lib/sdkDappCore";
import { accountSelector, getState, networkSelector } from "lib/sdkDappCore";
import { ServerTransactionType } from "types/sdkDappCoreTypes";
import { TransactionsPropsType } from "../types";

// Types for internal state management
interface TransactionState {
  data: ServerTransactionType[];
  isLoading: boolean;
  error: Error | null;
}

export const useGetTransactions = (props: TransactionsPropsType) => {
  // Reactive state with proper typing
  const [state, setState] = createSignal<TransactionState>({
    data: [],
    isLoading: false,
    error: null
  });

  // Memoized selectors
  const store = createMemo(() => getState());
  const network = createMemo(() => networkSelector(store()));
  const account = createMemo(() => accountSelector(store()));

  // Helper to check if we can fetch transactions
  const canFetchTransactions = (params: {
    account: ReturnType<typeof accountSelector>;
    network: ReturnType<typeof networkSelector>;
  }) => params.account?.address && params.network?.apiAddress;

  // Fetch transactions with proper error handling
  const fetchTransactions = async () => {
    if (!canFetchTransactions({ account: account(), network: network() })) {
      console.warn(
        "Cannot fetch transactions: missing account or network info"
      );
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const { data } = await getTransactions({
        apiAddress: network().apiAddress,
        sender: account().address,
        receiver: props.receiver,
        condition: props.receiver ? "must" : undefined,
        transactionSize,
        apiTimeout
      });

      const transactions = Array.isArray(data) ? data : [];
      console.log(`Fetched ${transactions.length} transactions`);

      setState((prev) => ({
        ...prev,
        data: transactions,
        isLoading: false
      }));
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setState((prev) => ({
        ...prev,
        data: [],
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error))
      }));
    }
  };

  // Watch for account/network changes
  createEffect(() => {
    if (canFetchTransactions({ account: account(), network: network() })) {
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
