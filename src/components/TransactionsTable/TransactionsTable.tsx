import { createSignal, onMount } from 'solid-js';
import {
  getState,
  networkSelector,
  accountSelector,
  TransactionsTableController,
} from 'lib/sdkDappCore';
import {
  ServerTransactionType,
  TransactionsTableRowType,
} from 'types/sdkDappCoreTypes';

interface TransactionsTablePropsType {
  transactions?: ServerTransactionType[];
}

export const TransactionsTable = ({
  transactions = [],
}: TransactionsTablePropsType) => {
  const [transactionsData, setTransactionsData] = createSignal<
    TransactionsTableRowType[]
  >([]);
  const network = networkSelector(getState());
  const { address } = accountSelector(getState());

  onMount(async () => {
    const data = await TransactionsTableController.processTransactions({
      address,
      egldLabel: network.egldLabel,
      explorerAddress: network.explorerAddress,
      transactions,
    });
    setTransactionsData(data);
  });

  return <transactions-table transactions={transactionsData()} />;
};
