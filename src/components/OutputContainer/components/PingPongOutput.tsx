import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import Fa from 'solid-fa';
import { Label } from 'components';
import { contractAddress } from 'config';
import { useStore } from 'hooks';
import {
  ACCOUNTS_ENDPOINT,
  getExplorerLink,
  networkSelector,
  // MvxCopyButton,
  SignedTransactionType
} from 'lib';

import { TransactionsOutput } from './TransactionsOutput';

// prettier-ignore
const styles = {
  pingPongAddressContainer: 'ping-pong-address-container flex justify-between mb-4',
  pingPongButtons: 'ping-pong-buttons flex gap-3',
  timeRemaining: 'time-remaining text-red-600'
} satisfies Record<string, string>;

type PingPongOutputType = {
  timeRemaining: string;
  pongAllowed: boolean;
  transactions?: SignedTransactionType[] | null;
};

export const PingPongOutput = ({
  timeRemaining,
  pongAllowed,
  transactions
}: PingPongOutputType) => {
  const store = useStore();
  const network = networkSelector(store());

  if (!transactions || transactions?.length === 0) {
    return null;
  }

  const explorerAddress = network.explorerAddress;
  const explorerLink = getExplorerLink({
    to: `/${ACCOUNTS_ENDPOINT}/${contractAddress}`,
    explorerAddress
  });

  return (
    <>
      <div class={styles.pingPongAddressContainer}>
        {contractAddress}

        <div class={styles.pingPongButtons}>
          {/* <MvxCopyButton text={contractAddress} /> */}

          <a href={explorerLink} target='_blank' rel='noreferrer'>
            <Fa icon={faArrowUpRightFromSquare} />
          </a>
        </div>
      </div>

      <TransactionsOutput transactions={transactions} />

      {!pongAllowed && (
        <p>
          <Label>Time remaining: </Label>
          <span class={styles.timeRemaining}>{timeRemaining}</span> until able
          to pong
        </p>
      )}
    </>
  );
};
