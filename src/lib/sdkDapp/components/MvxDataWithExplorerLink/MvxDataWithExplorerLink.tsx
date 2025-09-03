import { IPropsWithClass } from 'types';

interface MvxDataWithExplorerLinkPropsType extends IPropsWithClass {
  data: string;
  explorerLink: string;
  withTooltip?: boolean;
  showExplorerButton?: boolean;
  showCopyButton?: boolean;
  'data-testid'?: string;
}

export const MvxDataWithExplorerLink = ({
  data,
  explorerLink,
  class: className,
  'data-testid': dataTestId,
  withTooltip,
  showExplorerButton,
  showCopyButton
}: MvxDataWithExplorerLinkPropsType) => {
  return (
    <mvx-data-with-explorer-link
      data={data}
      explorerLink={explorerLink}
      class={className}
      data-testid={dataTestId}
      withTooltip={withTooltip}
      showExplorerButton={showExplorerButton}
      showCopyButton={showCopyButton}
    />
  );
};
