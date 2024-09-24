import { Transaction, TransactionPayload } from "@multiversx/sdk-core/out";
import { contractAddress } from "config";
import {
  getAccount,
  getState,
  networkSelector,
  sendTransactions,
  signTransactions,
} from "lib/sdkDappCore";

export const useSendPingPongTransaction = () => {
  const network = networkSelector(getState());
  const { address, nonce } = getAccount();

  const sendPingTransaction = async (amount: string) => {
    const pingTransaction = new Transaction({
      value: amount,
      data: new TransactionPayload("ping"),
      receiver: address,
      gasLimit: 60000000,
      gasPrice: 1000000000,
      chainID: network.chainId,
      nonce,
      sender: address,
      version: 1,
    });

    const signedTransactions = await signTransactions([pingTransaction]);

    const sessionId = await sendTransactions(signedTransactions);

    console.log("Session id: ", sessionId);
  };

  const sendPongTransaction = async () => {
    const pongTransaction = new Transaction({
      value: "0",
      data: new TransactionPayload("pong"),
      receiver: contractAddress,
      gasLimit: 60000000,
      gasPrice: 1000000000,
      chainID: network.chainId,
      nonce: nonce,
      sender: address,
      version: 1,
    });
    // TODO: send here
  };

  return {
    sendPingTransaction,
    sendPongTransaction,
  };
};
