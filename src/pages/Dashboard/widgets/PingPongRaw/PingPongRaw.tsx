import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Button } from "components/Button";
import { ContractAddress } from "components/ContractAddress";
import { Label } from "components/Label";
import { SignedTransactionType, WidgetProps } from "types";
import { useGetTimeToPong, useGetPingAmount } from "./hooks";
import { getCountdownSeconds, setTimeRemaining } from "helpers";
import { OutputContainer } from "components/OutputContainer/OutputContainer";
import { PingPongOutput } from "components/OutputContainer/components";
import { createSignal } from "solid-js";

// Raw transaction are being done by directly requesting to API instead of calling the smartcontract
export const PingPongRaw = ({ callbackRoute }: WidgetProps) => {
  const getTimeToPong = useGetTimeToPong();
  const hasPendingTransactions = false; // TODO: Implement this somewhere
  const { sendPingTransaction, sendPongTransaction, transactionStatus } =
    useSendPingPongTransaction({
      type: SessionEnum.rawPingPongSessionId,
    });
  const pingAmount = useGetPingAmount();

  const [stateTransactions, setStateTransactions] = createSignal<
    SignedTransactionType[] | null
  >(null);
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
    await sendPingTransaction({ amount: pingAmount, callbackRoute });
  };

  const onSendPongTransaction = async () => {
    await sendPongTransaction({ callbackRoute });
  };

  const timeRemaining = moment()
    .startOf("day")
    .seconds(secondsLeft() ?? 0)
    .format("mm:ss");

  const pongAllowed = secondsLeft() === 0;

  getCountdownSeconds({ secondsLeft: secondsLeft(), setSecondsLeft });

  if (transactionStatus.transactions) {
    setStateTransactions(transactionStatus.transactions);
  }

  setSecondsRemaining();

  return (
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <div class="flex justify-start gap-2">
          <Button
            disabled={!hasPing || hasPendingTransactions}
            onClick={onSendPingTransaction}
            data-testid="btnPingRaw"
            data-cy="transactionBtn"
          >
            <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
            Ping
          </Button>

          <Button
            disabled={!pongAllowed || hasPing() || hasPendingTransactions}
            data-testid="btnPongRaw"
            data-cy="transactionBtn"
            onClick={onSendPongTransaction}
          >
            <FontAwesomeIcon icon={faArrowDown} className="mr-1" />
            Pong
          </Button>
        </div>
      </div>

      <OutputContainer>
        {!stateTransactions && (
          <>
            <ContractAddress />
            {!pongAllowed && (
              <p>
                <Label>Time remaining: </Label>
                <span class="text-red-600">{timeRemaining}</span> until able to
                pong
              </p>
            )}
          </>
        )}
        <PingPongOutput
          transactions={stateTransactions()}
          pongAllowed={pongAllowed}
          timeRemaining={timeRemaining}
        />
      </OutputContainer>
    </div>
  );
};
