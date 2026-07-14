import { createMemo, splitProps, Show } from 'solid-js';
import { useStore } from 'hooks';
import { ExplorerLinkSDKPropsType, networkSelector } from 'lib';
import { IPropsWithClass, IPropsWithChildren } from 'types';

interface ExplorerLinkPropsType
  extends
    Partial<ExplorerLinkSDKPropsType>,
    IPropsWithClass,
    IPropsWithChildren {
  page: string;
}

export const ExplorerLink = (props: ExplorerLinkPropsType) => {
  const [local, rest] = splitProps(props, [
    'children',
    'page',
    'class',
    'data-testid'
  ]);

  const store = useStore();
  const network = createMemo(() => networkSelector(store()));

  return (
    <mvx-explorer-link
      link={`${network().explorerAddress}${local.page}`}
      class={local.class}
      data-testid={local['data-testid']}
      {...rest}
    >
      <Show when={local.children}>
        <div>{local.children}</div>
      </Show>
    </mvx-explorer-link>
  );
};
