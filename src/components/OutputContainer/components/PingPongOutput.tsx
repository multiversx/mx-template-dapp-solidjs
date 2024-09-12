import { Label } from "components/Label";
import { TransactionsOutput } from "./TransactionsOutput";
import { ContractAddress } from "components/ContractAddress";
import { SignedTransactionType } from "lib/sdkDappCore";

type PingPongOutputType = {
  timeRemaining: string;
  pongAllowed: boolean;
  transactions?: SignedTransactionType[] | null;
};

export const PingPongOutput = ({
  timeRemaining,
  pongAllowed,
  transactions,
}: PingPongOutputType) => {
  if (!transactions) {
    return null;
  }

  return (
    <>
      <ContractAddress />
      <TransactionsOutput transactions={transactions} />
      {!pongAllowed && (
        <p>
          <Label>Time remaining: </Label>
          <span class="text-red-600">{timeRemaining}</span> until able to pong
        </p>
      )}
    </>
  );
};
