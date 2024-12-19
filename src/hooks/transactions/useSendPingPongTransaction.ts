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
    const { address, accounts } = store().account;
    const nonce = accounts[address].nonce;

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

    const secondTx = Transaction.fromPlainObject(
      pingTransaction.toPlainObject()
    );
    secondTx.setNonce(nonce + 1);
    secondTx.setValue(Number(amount) + Number(amount));

    const signedTransactions = await provider.signTransactions([
      pingTransaction,
      secondTx
    ]);

    const transactionManager = TransactionManager.getInstance();
    const txHashes = await transactionManager.send(signedTransactions);

    console.log('Ping transaction hashes: ', txHashes);
  };

  const sendMultitransfer = async (amount: string) => {
    const { address, accounts } = store().account;
    const nonce = accounts[address].nonce;

    const pingTransaction = new Transaction({
      value: amount,
      data: new TransactionPayload('wrapEgld'),
      receiver:
        'erd1qqqqqqqqqqqqqpgqpv09kfzry5y4sj05udcngesat07umyj70n4sa2c0rp',
      gasLimit: 4200000,
      gasPrice: 1000000000,
      chainID: network.chainId,
      nonce,
      sender: address,
      version: 1
    });

    const multiTransaction = new Transaction({
      value: amount,
      data: new TransactionPayload(
        'MultiESDTNFTTransfer@0000000000000000050081dd0ec1164a8a2c9d9d9ab14f48f4f8ec09bc0a7ceb@02@48544d2d323361316461@@18fae27693b40000@5745474c442d613238633539@@02ad422041e59773@6372656174654d6574617374616b696e67506f7346726f6d54776f546f6b656e73@0000000000000000050047708fe10495086cfb4cc34294f86fc5f4b087327ceb@18baef8efdbf0000@02a667dd5ff53736'
      ),
      receiver: address,
      gasLimit: 100000000,
      gasPrice: 1000000000,
      chainID: network.chainId,
      nonce: nonce + 1,
      sender: address,
      version: 1
    });

    const signedTransactions = await provider.signTransactions([
      pingTransaction,
      multiTransaction
    ]);

    const transactionManager = TransactionManager.getInstance();
    const txHashes = await transactionManager.send(signedTransactions);

    console.log('Multitransfer transaction hashes: ', txHashes);
  };

  const sendSFTNFT = async () => {
    const { address, accounts } = store().account;
    const nonce = accounts[address].nonce;

    const sendSFT = new Transaction({
      value: '0',
      data: new TransactionPayload(
        'ESDTNFTTransfer@434f4e4e4e2d616266376663@01@02@c2b5214f2077d386b403cbe92bd23f9ec92a4ce5552cf1f91805ba1b8d519cc3'
      ),
      receiver: address,
      gasLimit: 1_000_000,
      gasPrice: 1000000000,
      chainID: network.chainId,
      nonce,
      sender: address,
      version: 1
    });

    const sendNFT = new Transaction({
      value: '0',
      data: new TransactionPayload(
        'ESDTNFTTransfer@434f524f2d303361383932@02@01@c2b5214f2077d386b403cbe92bd23f9ec92a4ce5552cf1f91805ba1b8d519cc3'
      ),
      receiver: address,
      gasLimit: 1_000_000,
      gasPrice: 1000000000,
      chainID: network.chainId,
      nonce: nonce + 1,
      sender: address,
      version: 1
    });

    const signedTransactions = await provider.signTransactions([
      sendSFT,
      sendNFT
    ]);

    console.log('NFT SFT signedTransactions: ', signedTransactions);
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
    sendPongTransaction,
    sendSFTNFT,
    sendMultitransfer
  };
};
