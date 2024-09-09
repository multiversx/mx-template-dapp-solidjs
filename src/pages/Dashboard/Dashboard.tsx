import { Account, PingPongRaw, SignMessage } from "./widgets";
import { Widget } from "./components";
import { WidgetType } from "types";

const WIDGETS: WidgetType[] = [
  {
    title: "Account",
    widget: Account,
    description: "Connected account details",
    reference: "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account",
  },
  {
    title: "Ping & Pong (Manual)",
    widget: PingPongRaw,
    description:
      "Smart Contract interactions using manually formulated transactions",
    reference:
      "https://docs.multiversx.com/sdk-and-tools/indices/es-index-transactions/",
    anchor: "ping-pong-manual",
  },
  {
    title: "Sign message",
    widget: SignMessage,
    description: "Message signing using the connected account",
    reference: "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account-1",
    anchor: "sign-message",
  },
];

export const Dashboard = () => {
  return (
    <div class="flex flex-col gap-6 max-w-3xl w-full">
      {WIDGETS.map((element) => (
        <Widget {...element} />
      ))}
    </div>
  );
};
