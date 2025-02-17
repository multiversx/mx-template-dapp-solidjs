import { Show, createMemo } from "solid-js";
import { FormatAmount } from "components/CoreComponents/FormatAmount";
import { Label } from "components/Label";
import { OutputContainer } from "components/OutputContainer/OutputContainer";
import { useStore } from "hooks";
import { getAccount, networkSelector } from "lib/sdkDappCore";
import { Username } from "./components";

export const Account = () => {
  const store = useStore();
  const network = createMemo(() => networkSelector(store()));
  const account = createMemo(() => getAccount(store()));

  return (
    <OutputContainer>
      <div class="flex flex-col text-black" data-testid="topInfo">
        <Show when={store()}>
          <p class="truncate">
            <Label>Address: </Label>
            <span data-testid="accountAddress">{account().address}</span>
          </p>

          <Username account={account()} />
          <p>
            <Label>Shard: </Label> {account().shard}
          </p>

          <p>
            <Label>Balance: </Label>
            <FormatAmount
              value={account().balance}
              egldLabel={network().egldLabel}
              data-testid="balance"
            />
          </p>
        </Show>
      </div>
    </OutputContainer>
  );
};
