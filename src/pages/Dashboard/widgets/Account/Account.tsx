import { Label } from "components/Label";
import { OutputContainer } from "components/OutputContainer";

export const Account = () => {
  // const { network } = useGetNetworkConfig();
  // const { address, account } = useGetAccountInfo();

  return (
    <OutputContainer>
      <div class="flex flex-col text-black" data-testid="topInfo">
        <p class="truncate">
          <Label>Address: </Label>
          <span data-testid="accountAddress"> {"address"}</span>
        </p>

        {/* <Username account={"account"} /> */}
        <p>
          <Label>Shard: </Label> {"account.shard"}
        </p>

        <p>
          <Label>Balance: </Label>
          <span>
            {"account.balance"} {"network.egldLabel"}
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
