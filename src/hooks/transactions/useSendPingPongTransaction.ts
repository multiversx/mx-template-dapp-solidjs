import { Transaction, TransactionPayload } from '@multiversx/sdk-core/out';
import { contractAddress } from 'config';
import { useStore } from 'hooks/useStore';
import {
  getAccount,
  getAccountProvider,
  getState,
  networkSelector,
  TransactionManager
} from 'lib/sdkDappCore';

export const useSendPingPongTransaction = () => {
  const network = networkSelector(getState());
  const store = useStore();
  const provider = getAccountProvider();

  const sendPingTransaction = async (amount: string) => {
    const { address, nonce } = getAccount(store());

    const pingTransaction = new Transaction({
      value: amount,
      data: new TransactionPayload('ping'),
      receiver: address,
      gasLimit: 60000000,
      gasPrice: 1000000000,
      chainID: network.chainId,
      nonce,
      sender: address,
      version: 1
    });

    const signedTransactions = await provider.signTransactions([
      pingTransaction as any
    ]);

    const txManager = TransactionManager.getInstance();
    const sessionId = await txManager.send(signedTransactions);

    console.log('Session id: ', sessionId);
  };

  const sendPongTransaction = async () => {
    const { address, nonce } = getAccount(store());

    const pongTransaction = new Transaction({
      value: '0',
      data: new TransactionPayload('pong'),
      receiver: contractAddress,
      gasLimit: 60000000,
      gasPrice: 1000000000,
      chainID: network.chainId,
      nonce: nonce,
      sender: address,
      version: 1
    });
    // TODO: send here
  };

  return {
    sendPingTransaction,
    sendPongTransaction
  };
};
