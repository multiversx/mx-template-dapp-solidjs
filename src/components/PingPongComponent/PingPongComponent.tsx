import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { TokenLoginType } from '@multiversx/sdk-dapp/out/types/login.types';
import moment from 'moment';

import Fa from 'solid-fa';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import { Label, OutputContainer, PingPongOutput } from 'components';
import { contractAddress } from 'config';
import { getCountdownSeconds, setTimeRemaining } from 'helpers';
import {
  ACCOUNTS_ENDPOINT,
  MvxDataWithExplorerLink,
  getPendingTransactions,
  getStore,
  MvxButton,
  Transaction
} from 'lib';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

// prettier-ignore
const styles = {
  pingPongContainer: 'ping-pong-container flex flex-col gap-6',
  infosContainer: 'infos-container flex flex-col gap-2',
  addressComponent: 'address-component flex w-full justify-between',
  timeRemaining: 'text-red-600',
  buttonsContainer: 'buttons-container flex flex-col gap-2',
  buttons: 'buttons flex justify-start gap-2',
  buttonContent: 'button-content text-sm font-normal'
} satisfies Record<string, string>;

interface PingPongComponentPropsType {
  id: ItemsIdentifiersEnum;
  sendPingTransaction: (amount: any) => Promise<any>;
  sendPongTransaction: (transaction?: any) => Promise<any>;
  getTimeToPong: () => Promise<number | null | undefined>;
  pingAmount?: string;
  getPingTransaction?: () => Promise<Transaction | null>;
  getPongTransaction?: () => Promise<Transaction | null>;
  tokenLogin?: TokenLoginType | null;
}

export const PingPongComponent = ({
  id,
  sendPingTransaction,
  sendPongTransaction,
  getTimeToPong,
  pingAmount
}: PingPongComponentPropsType) => {
  const store = getStore();
  const [transactions, setTransactions] = createSignal(
    getPendingTransactions()
  );
  const unsubscribe = store.subscribe(() => {
    setTransactions(getPendingTransactions());
  });

  onCleanup(() => unsubscribe());
  const hasPendingTransactions = () => transactions().length > 0;

  const [hasPing, setHasPing] = createSignal<boolean>(true);
  const [secondsLeft, setSecondsLeft] = createSignal<number>(0);

  const setSecondsRemaining = async () => {
    const secondsRemaining = await getTimeToPong();
    const { canPing, timeRemaining } = setTimeRemaining(secondsRemaining);

    setHasPing(canPing);
    if (timeRemaining !== undefined && timeRemaining >= 0) {
      setSecondsLeft(timeRemaining);
    }
  };

  const onSendPingTransaction = async () => {
    await sendPingTransaction(pingAmount);
  };

  const onSendPongTransaction = async () => {
    await sendPongTransaction();
  };

  const timeRemaining = () =>
    moment()
      .startOf('day')
      .seconds(secondsLeft() ?? 0)
      .format('mm:ss');

  const pongAllowed = () => secondsLeft() === 0;

  createEffect(() => {
    getCountdownSeconds({ secondsLeft: secondsLeft(), setSecondsLeft });
  });

  createEffect(() => {
    hasPing();
    hasPendingTransactions();
    setSecondsRemaining();
  });

  return (
    <div id={id} class={styles.pingPongContainer}>
      <div class={styles.infosContainer}>
        <Label>Contract: </Label>

        <OutputContainer>
          {!hasPendingTransactions() && (
            <>
              <MvxDataWithExplorerLink
                withTooltip={true}
                data={contractAddress}
                class={styles.addressComponent}
                explorerLink={`/${ACCOUNTS_ENDPOINT}/${contractAddress}`}
              />

              {!pongAllowed() && (
                <p>
                  <Label>Time remaining: </Label>
                  <span class={styles.timeRemaining}>{timeRemaining()}</span>

                  <span> until able to pong</span>
                </p>
              )}
            </>
          )}

          <PingPongOutput
            transactions={transactions()}
            pongAllowed={pongAllowed()}
            timeRemaining={timeRemaining()}
          />
        </OutputContainer>
      </div>

      <div class={styles.buttonsContainer}>
        <div class={styles.buttons}>
          <MvxButton
            disabled={!hasPing() || hasPendingTransactions()}
            onClick={onSendPingTransaction}
            size='small'
            variant='primary'
          >
            <Fa icon={faArrowUp} class={styles.buttonContent} />

            <span class={styles.buttonContent}>Ping</span>
          </MvxButton>

          <MvxButton
            disabled={!pongAllowed() || hasPing() || hasPendingTransactions()}
            onClick={onSendPongTransaction}
            size='small'
            variant='primary'
          >
            <Fa icon={faArrowDown} class={styles.buttonContent} />

            <span class={styles.buttonContent}>Pong</span>
          </MvxButton>
        </div>
      </div>
    </div>
  );
};
