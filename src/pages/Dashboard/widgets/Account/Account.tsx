import { Label } from "components/Label";
import { OutputContainer } from "components/OutputContainer";
import { getAccount, getState, networkSelector } from "lib/sdkDappCore";
import { Username } from "./components";

export const Account = () => {
  const network = networkSelector(getState());
  const account = getAccount();

  return (
    <OutputContainer>
      <div class="flex flex-col text-black" data-testid="topInfo">
        <p class="truncate">
          <Label>Address: </Label>
          <span data-testid="accountAddress"> {account.address}</span>
        </p>

        <Username account={account} />
        <p>
          <Label>Shard: </Label> {account.shard}
        </p>

        <p>
          <Label>Balance: </Label>
          <span>
            {account.balance} {network.egldLabel}
          </span>
          {/* <FormatAmount
            value={account.balance}
            egldLabel={network.egldLabel}
            data-testid="balance"
          /> */}
        </p>
      </div>
    </OutputContainer>
  );
};
