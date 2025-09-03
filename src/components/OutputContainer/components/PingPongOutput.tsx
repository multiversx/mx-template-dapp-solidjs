import { Label } from 'components';
import { contractAddress } from 'config';
import { useStore } from 'hooks';
import {
  ACCOUNTS_ENDPOINT,
  getExplorerLink,
  MvxDataWithExplorerLink,
  networkSelector,
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
      <MvxDataWithExplorerLink
        withTooltip={true}
        data={contractAddress}
        explorerLink={explorerLink}
      />

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
