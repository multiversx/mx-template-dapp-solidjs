import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import Fa from 'solid-fa';
import { Label } from 'components';
import { useStore } from 'hooks';
import {
  ACCOUNTS_ENDPOINT,
  FormatAmount,
  getAccount,
  getExplorerLink,
  getState,
  networkSelector,
  // MvxCopyButton,
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

        <div class={styles.transactionElement}>
          {transaction.hash}

          <div class={styles.buttons}>
            {/* <MvxCopyButton text={transaction.hash} /> */}

            <a href={hashExplorerLink} target='_blank' rel='noreferrer'>
              <Fa icon={faArrowUpRightFromSquare} />
            </a>
          </div>
        </div>
      </div>

      <div class={styles.transactionElementContainer}>
        <Label>Receiver:</Label>
        <div class={styles.transactionElement}>
          {transaction.receiver}

          <div class={styles.buttons}>
            {/* <MvxCopyButton text={transaction.receiver} /> */}

            <a href={receiverExplorerLink} target='_blank' rel='noreferrer'>
              <Fa icon={faArrowUpRightFromSquare} />
            </a>
          </div>
        </div>
      </div>

      <p>
        <Label>Amount: </Label>
        <FormatAmount value={account.balance} />
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
