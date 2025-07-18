import { ContractAddress } from 'components/ContractAddress';
import { Label } from 'components/Label';
import { SignedTransactionType } from 'lib';
import { TransactionsOutput } from './TransactionsOutput';

type PingPongOutputType = {
  timeRemaining: string;
  pongAllowed: boolean;
  transactions?: SignedTransactionType[];
};

export const PingPongOutput = ({
  timeRemaining,
  pongAllowed,
  transactions
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
          <span class='text-red-600'>{timeRemaining}</span> until able to pong
        </p>
      )}
    </>
  );
};
