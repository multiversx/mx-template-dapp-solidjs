import { Show } from 'solid-js';
import { FormatAmount } from 'components/CoreComponents/FormatAmount';
import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer/OutputContainer';
import { useStore } from 'hooks';
import { getAccount, getState, networkSelector } from 'lib/sdkDappCore';
import { Username } from './components';

export const Account = () => {
  const network = networkSelector(getState());
  const store = useStore();

  return (
    <OutputContainer>
      <div class="flex flex-col text-black" data-testid="topInfo">
        <p class="truncate">
          <Label>Address: </Label>
          <span data-testid="accountAddress">
            {getAccount(store()).address}
          </span>
        </p>

        <Username account={getAccount(store())} />
        <p>
          <Label>Shard: </Label> {getAccount(store()).shard}
        </p>

        <p>
          <Label>Balance: </Label>

          <Show when={store()} keyed>
            {(currStore) => (
              <FormatAmount
                value={getAccount(currStore).balance}
                egldLabel={network.egldLabel}
                data-testid="balance"
              />
            )}
          </Show>
        </p>
      </div>
    </OutputContainer>
  );
};
