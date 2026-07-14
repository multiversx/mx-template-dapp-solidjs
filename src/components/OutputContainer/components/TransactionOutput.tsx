import { createMemo } from 'solid-js';
import { Label } from 'components';
import { useStore } from 'hooks';
import {
  ACCOUNTS_ENDPOINT,
  DECIMALS,
  DIGITS,
  FormatAmount,
  FormatAmountController,
  getAccount,
  getExplorerLink,
  MvxDataWithExplorerLink,
  networkSelector,
  SignedTransactionType,
  TRANSACTIONS_ENDPOINT
} from 'lib';

// prettier-ignore
const styles = {
  transactionContainer: 'transaction-container flex flex-col',
  transactionElementContainer: 'transaction-elem-container flex gap-2',
  transactionElement: 'transaction-elem flex justify-between w-full',
  buttons: 'buttons flex gap-3',
  dataContainer: 'data-container whitespace-nowrap'
} satisfies Record<string, string>;

export const TransactionOutput = (props: {
  transaction: SignedTransactionType;
}) => {
  const store = useStore();
  const network = createMemo(() => networkSelector(store()));
  const account = createMemo(() => getAccount(store()));

  const amount = createMemo(() =>
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: network().egldLabel,
      input: account().balance
    })
  );

  const decodedData = createMemo(() =>
    props.transaction.data
      ? Buffer.from(props.transaction.data, 'base64').toString('ascii')
      : 'N/A'
  );

  const hashExplorerLink = createMemo(() =>
    getExplorerLink({
      to: `/${TRANSACTIONS_ENDPOINT}/${props.transaction.hash}`,
      explorerAddress: network().explorerAddress
    })
  );
  const receiverExplorerLink = createMemo(() =>
    getExplorerLink({
      to: `/${ACCOUNTS_ENDPOINT}/${props.transaction.receiver}`,
      explorerAddress: network().explorerAddress
    })
  );

  return (
    <div class={styles.transactionContainer}>
      <div class={styles.transactionElementContainer}>
        <Label>Hash:</Label>

        <MvxDataWithExplorerLink
          withTooltip={true}
          data={props.transaction.hash}
          explorerLink={hashExplorerLink()}
        />
      </div>

      <div class={styles.transactionElementContainer}>
        <Label>Receiver:</Label>

        <MvxDataWithExplorerLink
          withTooltip={true}
          data={props.transaction.receiver}
          explorerLink={receiverExplorerLink()}
        />
      </div>

      <p>
        <Label>Amount: </Label>
        <FormatAmount
          isValid={amount().isValid}
          valueInteger={amount().valueInteger}
          valueDecimal={amount().valueDecimal}
          label={amount().label}
          data-testid='balance'
          decimalClass='opacity-70'
          labelClass='opacity-70'
        />
      </p>
      <p>
        <Label>Gas price: </Label>
        {props.transaction.gasPrice}
      </p>
      <p>
        <Label>Gas limit: </Label>
        {props.transaction.gasLimit}
      </p>
      <p class={styles.dataContainer}>
        <Label>Data: </Label> {decodedData()}
      </p>
    </div>
  );
};
