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
  getState,
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

export const TransactionOutput = ({
  transaction
}: {
  transaction: SignedTransactionType;
}) => {
  const store = useStore();
  const network = networkSelector(getState());
  const account = getAccount(store());
  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: network.egldLabel,
      input: account.balance
    });
  const decodedData = transaction.data
    ? Buffer.from(transaction.data, 'base64').toString('ascii')
    : 'N/A';

  const explorerAddress = network.explorerAddress;
  const hashExplorerLink = getExplorerLink({
    to: `/${TRANSACTIONS_ENDPOINT}/${transaction.hash}`,
    explorerAddress
  });
  const receiverExplorerLink = getExplorerLink({
    to: `/${ACCOUNTS_ENDPOINT}/${transaction.receiver}`,
    explorerAddress
  });

  return (
    <div class={styles.transactionContainer}>
      <div class={styles.transactionElementContainer}>
        <Label>Hash:</Label>

        <MvxDataWithExplorerLink
          withTooltip={true}
          data={transaction.hash}
          explorerLink={hashExplorerLink}
        />
      </div>

      <div class={styles.transactionElementContainer}>
        <Label>Receiver:</Label>
        <div class={styles.transactionElement}>
          {transaction.receiver}

          <MvxDataWithExplorerLink
            withTooltip={true}
            data={transaction.receiver}
            explorerLink={receiverExplorerLink}
          />
        </div>
      </div>

      <p>
        <Label>Amount: </Label>
        <FormatAmount
          isValid={isValid}
          valueInteger={valueInteger}
          valueDecimal={valueDecimal}
          label={label}
          data-testid='balance'
          decimalClass='opacity-70'
          labelClass='opacity-70'
        />
      </p>
      <p>
        <Label>Gas price: </Label>
        {transaction.gasPrice}
      </p>
      <p>
        <Label>Gas limit: </Label>
        {transaction.gasLimit}
      </p>
      <p class={styles.dataContainer}>
        <Label>Data: </Label> {decodedData}
      </p>
    </div>
  );
};
