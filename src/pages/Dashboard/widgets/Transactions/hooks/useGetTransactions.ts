import { createSignal } from "solid-js";
import { apiTimeout, transactionSize } from "config";
import { getTransactions, getInterpretedTransaction } from "lib/sdkDappCore";
import { accountSelector, getState, networkSelector } from "lib/sdkDappCore";
import { InterpretedTransactionType } from "types/sdkDappCoreTypes";
import { TransactionsPropsType } from "../types";

export const useGetTransactions = (props: TransactionsPropsType) => {
  const [transactions, setTransactions] = createSignal<
    InterpretedTransactionType[]
  >([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const { address } = accountSelector(getState());
  const network = networkSelector(getState());

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const { data } = await getTransactions({
        apiAddress: network.apiAddress,
        sender: address,
        receiver: props.receiver,
        condition: props.receiver ? "must" : undefined,
        transactionSize,
        apiTimeout
      });

      const interpretedTransactions = data.map((transaction) =>
        getInterpretedTransaction({
          transaction,
          address,
          explorerAddress: network.explorerAddress
        })
      );

      setTransactions(interpretedTransactions);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    transactions: transactions(),
    isLoading: isLoading(),
    getTransactions: fetchTransactions
  };
};
