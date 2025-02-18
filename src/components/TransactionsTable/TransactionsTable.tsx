import { createEffect, createMemo } from "solid-js";
import {
  TransactionsTableController,
  getState,
  networkSelector,
  accountSelector
} from "lib/sdkDappCore";
import { IPropsWithClass } from "types";
import { ServerTransactionType } from "types/sdkDappCoreTypes";

interface TransactionsTablePropsType extends IPropsWithClass {
  transactions?: ServerTransactionType[];
}

export const TransactionsTable = (props: TransactionsTablePropsType) => {
  let elementRef: HTMLElement | undefined;

  const store = createMemo(() => getState());
  const network = createMemo(() => networkSelector(store()));
  const account = createMemo(() => accountSelector(store()));

  createEffect(async () => {
    if (!elementRef) {
      return;
    }

    const processed = await TransactionsTableController.processTransactions({
      address: account().address,
      egldLabel: network().egldLabel,
      explorerAddress: network().explorerAddress,
      transactions: props.transactions || []
    });

    Object.assign(elementRef, {
      transactions: processed,
      class: props.class
    });
  });

  return <transactions-table ref={elementRef} />;
};
