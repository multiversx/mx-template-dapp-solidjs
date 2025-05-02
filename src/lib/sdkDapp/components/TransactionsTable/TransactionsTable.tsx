import { createEffect, createMemo } from 'solid-js';
import { useStore } from 'hooks';
import {
  TransactionsTableController,
  networkSelector,
  accountSelector
} from 'lib';
import {
  ITransactionsTableRow,
  TransactionsTableSDKPropsType
} from 'lib/sdkDappCoreUI/sdkDappCoreUI.types';
import { IPropsWithClass } from 'types';
import { ServerTransactionType } from 'types/sdkDappCoreTypes';

interface TransactionsTablePropsType extends IPropsWithClass {
  transactions?: ServerTransactionType[];
}

export const TransactionsTable = (props: TransactionsTablePropsType) => {
  let elementRef: Partial<TransactionsTableSDKPropsType> | undefined;

  const store = useStore();
  const network = createMemo(() => networkSelector(store()));
  const account = createMemo(() => accountSelector(store()));

  createEffect(async () => {
    if (!elementRef) {
      return;
    }

    const data = await TransactionsTableController.processTransactions({
      address: account().address,
      egldLabel: network().egldLabel,
      explorerAddress: network().explorerAddress,
      transactions: props.transactions || []
    });

    Object.assign(elementRef, props, {
      transactions: data as ITransactionsTableRow[]
    });
  });

  return <mvx-transactions-table ref={elementRef} />;
};
