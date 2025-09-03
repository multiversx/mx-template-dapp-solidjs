import classNames from 'classnames';

import { Loader } from 'components';
import { IPropsWithChildren, IPropsWithClass } from 'types';

// prettier-ignore
const styles = {
  outputContainer: 'output-container text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl'
} satisfies Record<string, string>;

type OutputContainerPropsType = IPropsWithChildren &
  IPropsWithClass & {
    isLoading?: boolean;
  };

export const OutputContainer = ({
  children,
  isLoading = false,
  class: className = 'p-4',
  'data-testid': dataTestId
}: OutputContainerPropsType) => (
  <div
    data-testid={dataTestId}
    class={classNames(styles.outputContainer, className)}
  >
    {isLoading ? <Loader /> : children}
  </div>
);
