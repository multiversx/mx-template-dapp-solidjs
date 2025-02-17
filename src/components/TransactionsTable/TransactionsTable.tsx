import { createEffect, createMemo, createSignal } from "solid-js";
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
}

export const TransactionsTable = ({
  transactions = [],
  class: className
}: TransactionsTablePropsType) => {
  let elementRef: TransactionsTableElement | undefined;
  const [processedData, setProcessedData] = createSignal<
    TransactionsTableRowType[]
  >([]);

  // Reactive state
  const store = createMemo(() => getState());
  const network = createMemo(() => networkSelector(store()));
  const account = createMemo(() => accountSelector(store()));
  const currentTransactions = createMemo(() => transactions);

  // Web component update handler
  const updateElement = (data: TransactionsTableRowType[]) => {
    if (!elementRef) return;
    elementRef.transactions = [...data];
    if (className) {
      elementRef.setAttribute("class", className);
    }
  };

  // Process transactions
  const processTransactions = async (params: {
    transactions: ServerTransactionType[];
    account: { address: string };
    network: { egldLabel: string; explorerAddress: string };
  }) => {
    if (transactions.length === 0) return [];

    try {
      const processed = await TransactionsTableController.processTransactions({
        address: params.account.address,
        egldLabel: params.network.egldLabel,
        explorerAddress: params.network.explorerAddress,
        transactions
      });
      return processed || [];
    } catch (error) {
      console.error("Error processing transactions:", error);
      return [];
    }
  };

  // Process transactions when dependencies change
  createEffect(async () => {
    const data = await processTransactions({
      transactions: currentTransactions(),
      account: account(),
      network: network()
    });
    setProcessedData(data);
  });

  // Update web component when processed data changes
  createEffect(() => {
    const data = processedData();
    console.log("Updating transactions table with:", data.length, "items");
    updateElement(data);
  });

  return <transactions-table ref={elementRef} />;
};
