import { Transaction } from '@multiversx/sdk-core/out';
import {
  getAccountProvider,
  refreshAccount,
  TransactionManager,
} from 'lib/sdkDappCore';

interface TransactionsDisplayInfoType {
  processingMessage: string;
  errorMessage: string;
  successMessage: string;
}

interface SignAndSendTransactionsProps {
  transactions: Transaction[];
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
}

export const signAndSendTransactions = async ({
  transactions,
}: SignAndSendTransactionsProps) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  await refreshAccount();

  const signedTransactions = await provider.signTransactions(transactions);
  const sentTransactions = await txManager.send(signedTransactions);
  await txManager.track(sentTransactions);
};
