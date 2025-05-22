import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Fa from 'solid-fa';
import { createEffect, createSignal } from 'solid-js';
import { Button } from 'components/Button';
import { PingPongOutput } from 'components/OutputContainer/components';
import { OutputContainer } from 'components/OutputContainer/OutputContainer';
import { getCountdownSeconds, setTimeRemaining } from 'helpers';
import { useSendPingPongTransaction } from 'hooks/transactions/useSendPingPongTransaction';
import { useStore } from 'hooks/useStore';
import {
  pendingTransactionsSessionsSelector,
  transactionsSliceSelector
} from 'lib/sdkDapp/sdkDapp.selectors';
import { useGetTimeToPong, useGetPingAmount } from './hooks';
// Raw transaction are being done by directly requesting to API instead of calling the smartcontract
export const PingPongRaw = () => {
  const getTimeToPong = useGetTimeToPong();
  const hasPendingTransactions = false; // TODO: Implement this somewhere
  const { sendPingTransaction, sendPongTransaction, sendContactTransaction } =
    useSendPingPongTransaction();
  const pingAmount = useGetPingAmount();
  const store = useStore();

  const [hasPing, setHasPing] = createSignal<boolean>(true);
  const [secondsLeft, setSecondsLeft] = createSignal<number>(0);
  const [sessionId, setSessionId] = createSignal<string>('');

  const setSecondsRemaining = async () => {
    const secondsRemaining = await getTimeToPong();
    const { canPing, timeRemaining } = setTimeRemaining(secondsRemaining);

    setHasPing(canPing);
    if (timeRemaining && timeRemaining >= 0) {
      setSecondsLeft(timeRemaining);
    }
  };

  const onSendContactTransaction = async () => {
    const session = await sendContactTransaction();
    setSessionId(session);
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

  const pongAllowed = secondsLeft() === 0;

  getCountdownSeconds({ secondsLeft: secondsLeft(), setSecondsLeft });

  setSecondsRemaining();

  createEffect(() => {
    const pendingSessions = pendingTransactionsSessionsSelector(store());
    const allTransactionSessions = transactionsSliceSelector(store());

    const isSessionIdPending =
      Object.keys(pendingSessions).includes(sessionId());

    const currentSession = allTransactionSessions[sessionId()];

    const currentSessionStatus = currentSession?.status;

    const currentTransaction = currentSession?.transactions?.[0];

    const currentTransactionStatus = currentTransaction?.status;

    console.log({
      isSessionIdPending,
      currentSessionStatus,
      currentTransactionStatus
    });
  });

  return (
    <div class='flex flex-col gap-6'>
      <div class='flex flex-col gap-2'>
        <div class='flex justify-start gap-2'>
          <Button
            disabled={!hasPing() || hasPendingTransactions}
            onClick={onSendContactTransaction}
            data-testid='btnPingRaw'
            data-cy='transactionBtn'
          >
            <Fa icon={faArrowUp} size='sm' class='mr-1' />
            Send to contact
          </Button>
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
          transactions={[]}
          pongAllowed={pongAllowed}
          timeRemaining={timeRemaining}
        />
      </OutputContainer>
    </div>
  );
};
