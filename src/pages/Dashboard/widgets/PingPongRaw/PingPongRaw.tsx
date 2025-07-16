import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Fa from 'solid-fa';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import { Button } from 'components/Button';
import { PingPongOutput } from 'components/OutputContainer/components';
import { OutputContainer } from 'components/OutputContainer/OutputContainer';
import { getCountdownSeconds, setTimeRemaining } from 'helpers';
import { useSendPingPongTransaction } from 'hooks/transactions/useSendPingPongTransaction';
import { getPendingTransactions, getStore } from 'lib';
import { useGetTimeToPong, useGetPingAmount } from './hooks';
import { ContractAddress } from 'components/ContractAddress';
import { Label } from 'components';

// Raw transaction are being done by directly requesting to API instead of calling the smartcontract
export const PingPongRaw = () => {
  const getTimeToPong = useGetTimeToPong();
  const store = getStore();
  const [transactions, setTransactions] = createSignal(
    getPendingTransactions()
  );
  const unsubscribe = store.subscribe(() => {
    setTransactions(getPendingTransactions());
  });

  onCleanup(() => unsubscribe());

  const hasPendingTransactions = transactions().length > 0;
  const { sendPingTransaction, sendPongTransaction } =
    useSendPingPongTransaction();
  const pingAmount = useGetPingAmount();

  const [hasPing, setHasPing] = createSignal<boolean>(true);
  const [secondsLeft, setSecondsLeft] = createSignal<number>(0);

  const setSecondsRemaining = async () => {
    const secondsRemaining = await getTimeToPong();
    const { canPing, timeRemaining } = setTimeRemaining(secondsRemaining);

    setHasPing(canPing);
    if (timeRemaining && timeRemaining >= 0) {
      setSecondsLeft(timeRemaining);
    }
  };

  const onSendPingTransaction = async () => {
    await sendPingTransaction(pingAmount());
  };

  const onSendPongTransaction = async () => {
    await sendPongTransaction();
  };

  const timeRemaining = moment()
    .startOf('day')
    .seconds(secondsLeft() ?? 0)
    .format('mm:ss');

  const pongAllowed = () => secondsLeft() === 0;

  createEffect(() => {
    getCountdownSeconds({ secondsLeft: secondsLeft(), setSecondsLeft });
  });

  createEffect(() => {
    setSecondsRemaining();
  });

  return (
    <div class='flex flex-col gap-6'>
      <div class='flex flex-col gap-2'>
        <div class='flex justify-start gap-2'>
          <Button
            disabled={!hasPing() || hasPendingTransactions}
            onClick={onSendPingTransaction}
            data-testid='btnPingRaw'
            data-cy='transactionBtn'
          >
            <Fa icon={faArrowUp} size='sm' class='mr-1' />
            Ping
          </Button>

          <Button
            disabled={!pongAllowed || hasPing() || hasPendingTransactions}
            data-testid='btnPongRaw'
            data-cy='transactionBtn'
            onClick={onSendPongTransaction}
          >
            <Fa icon={faArrowDown} size='sm' class='mr-1' />
            Pong
          </Button>
        </div>
      </div>

      <OutputContainer>
        <PingPongOutput
          transactions={transactions}
          pongAllowed={pongAllowed()}
          timeRemaining={timeRemaining}
        />
      </OutputContainer>
    </div>
  );
};
