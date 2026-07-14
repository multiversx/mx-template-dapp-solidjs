import { IPropsWithClass } from 'types';

interface MvxDataWithExplorerLinkPropsType extends IPropsWithClass {
  data: string;
  explorerLink: string;
  withTooltip?: boolean;
  showExplorerButton?: boolean;
  showCopyButton?: boolean;
  'data-testid'?: string;
}

export const MvxDataWithExplorerLink = (
  props: MvxDataWithExplorerLinkPropsType
) => {
  return (
    <mvx-data-with-explorer-link
      data={props.data}
      explorerLink={props.explorerLink}
      class={props.class}
      data-testid={props['data-testid']}
      withTooltip={props.withTooltip}
      showExplorerButton={props.showExplorerButton}
      showCopyButton={props.showCopyButton}
    />
  );
};
