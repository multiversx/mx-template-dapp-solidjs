import { Account } from "./widgets";
import { useScrollToElement } from "hooks";
import { Widget } from "./components";
import { WidgetType } from "types";

const WIDGETS: WidgetType[] = [
  {
    title: "Account",
    widget: Account,
    description: "Connected account details",
    reference: "https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account",
  },
];

export const Dashboard = () => {
  // useScrollToElement();

  return (
    <div class="flex flex-col gap-6 max-w-3xl w-full">
      {/* {WIDGETS.map((element) => (
        <Widget key={element.title} {...element} />
      ))} */}
      asd
    </div>
  );
};
