import { Label } from "components/Label";

export const Username = (props: {
  account: any | "AccountType | ProfileType | null";
}) => {
  const { account } = props;

  if (!account) {
    return null;
  }

  return (
    <p>
      <Label>Herotag: </Label>
      <span daata-testid="heroTag">
        {account.username ? account.username : "N/A"}
      </span>
    </p>
  );
};
