import { Label } from 'components/Label';
import { AccountType } from 'lib';

export const Username = ({ account }: { account: AccountType | null }) => {
  if (!account) {
    return null;
  }

  return (
    <p>
      <Label>Herotag: </Label>
      <span daata-testid='heroTag'>
        {account.username ? account.username : 'N/A'}
      </span>
    </p>
  );
};
