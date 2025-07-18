import { SignedTransactionType } from 'lib';
import { TransactionOutput } from './TransactionOutput';

export const TransactionsOutput = ({
  transactions
}: {
  transactions: SignedTransactionType[];
}) => {
  return (
    <div class='flex flex-col gap-4'>
      {transactions?.map((transaction) => {
        return <TransactionOutput transaction={transaction} />;
      })}
    </div>
  );
};
