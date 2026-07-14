import { createMemo, Show } from 'solid-js';
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

export const PingPongOutput = (props: PingPongOutputType) => {
  const store = useStore();
  const network = createMemo(() => networkSelector(store()));

  const explorerLink = createMemo(() =>
    getExplorerLink({
      to: `/${ACCOUNTS_ENDPOINT}/${contractAddress}`,
      explorerAddress: network().explorerAddress
    })
  );

  return (
    <Show when={props.transactions?.length ? props.transactions : null}>
      {(transactions) => (
        <>
          <MvxDataWithExplorerLink
            withTooltip={true}
            data={contractAddress}
            explorerLink={explorerLink()}
          />

          <TransactionsOutput transactions={transactions()} />

          {!props.pongAllowed && (
            <p>
              <Label>Time remaining: </Label>
              <span class={styles.timeRemaining}>
                {props.timeRemaining}
              </span>{' '}
              until able to pong
            </p>
          )}
        </>
      )}
    </Show>
  );
};
