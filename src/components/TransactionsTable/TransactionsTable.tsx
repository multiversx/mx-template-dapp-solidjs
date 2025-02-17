import { createEffect, createMemo } from "solid-js";
import {
  TransactionsTableController,
  getState,
  networkSelector,
  accountSelector
} from "lib/sdkDappCore";
import { IPropsWithClass } from "types";
import {
  ServerTransactionType,
  TransactionsTableRowType
} from "types/sdkDappCoreTypes";

interface TransactionsTablePropsType extends IPropsWithClass {
  transactions?: ServerTransactionType[];
}

interface TransactionsTableElement extends HTMLElement {
  transactions?: TransactionsTableRowType[];
  class?: string;
}

export const TransactionsTable = ({
  transactions = [],
  class: className
}: TransactionsTablePropsType) => {
  let elementRef: TransactionsTableElement | undefined;

  const store = createMemo(() => getState());
  const network = createMemo(() => networkSelector(store()));
  const account = createMemo(() => accountSelector(store()));

  const processedTransactions = createMemo(async () => {
    if (transactions.length === 0) {
      return [];
    }

    try {
      const data = await TransactionsTableController.processTransactions({
        address: account().address,
        egldLabel: network().egldLabel,
        explorerAddress: network().explorerAddress,
        transactions
      });

      return data || [];
    } catch (error) {
      console.error("Error processing transactions:", error);
      return [];
    }
  });

  const setRef = (el: TransactionsTableElement) => {
    elementRef = el;
  };

  // Update web component when transactions are processed
  createEffect(async () => {
    if (elementRef) {
      const processed = await processedTransactions();
      elementRef.transactions = processed;

      if (className) {
        elementRef.class = className;
      }
    }
  });

  return <transactions-table ref={setRef} />;
};
