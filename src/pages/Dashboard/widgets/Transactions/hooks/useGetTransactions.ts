import { createSignal, createMemo, createEffect } from "solid-js";
import { apiTimeout, transactionSize } from "config";
import { getTransactions } from "lib/sdkDappCore";
import { accountSelector, getState, networkSelector } from "lib/sdkDappCore";
import { ServerTransactionType } from "types/sdkDappCoreTypes";
import { TransactionsPropsType } from "../types";

export const useGetTransactions = (props: TransactionsPropsType) => {
  const [transactions, setTransactions] = createSignal<ServerTransactionType[]>(
    []
  );
  const [isLoading, setIsLoading] = createSignal(false);

  const store = createMemo(() => getState());
  const network = createMemo(() => networkSelector(store()));
  const account = createMemo(() => accountSelector(store()));

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const { data } = await getTransactions({
        apiAddress: network().apiAddress,
        sender: account().address,
        receiver: props.receiver,
        condition: props.receiver ? "must" : undefined,
        transactionSize,
        apiTimeout
      });

      if (Array.isArray(data) && data.length > 0) {
        console.log(`Fetched ${data.length} transactions`);
        setTransactions(data);
      } else {
        console.log("No transactions returned from API");
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch when account or network changes
  createEffect(() => {
    const currentAccount = account();
    const currentNetwork = network();

    if (currentAccount?.address && currentNetwork?.apiAddress) {
      fetchTransactions();
    }
  });

  return {
    transactions,
    isLoading,
    getTransactions: fetchTransactions
  };
};
