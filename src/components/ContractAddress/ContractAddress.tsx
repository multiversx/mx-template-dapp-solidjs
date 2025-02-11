import { ACCOUNTS_ENDPOINT } from '@multiversx/sdk-dapp-core/out/apiCalls/endpoints';
import { ExplorerLink } from 'components/CoreComponents/ExplorerLink';
import { Label } from 'components/Label';
import { contractAddress } from 'config';

export const ContractAddress = () => {
  return (
    <p>
      <Label>Contract: </Label>
      <ExplorerLink
        page={`/${ACCOUNTS_ENDPOINT}/${contractAddress}`}
        class="border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800"
      >
        {contractAddress}
      </ExplorerLink>
    </p>
  );
};
