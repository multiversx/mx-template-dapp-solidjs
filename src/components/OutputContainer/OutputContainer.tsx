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

export const OutputContainer = (props: OutputContainerPropsType) => (
  <div
    data-testid={props['data-testid']}
    class={classNames(styles.outputContainer, props.class ?? 'p-4')}
  >
    {props.isLoading ? <Loader /> : props.children}
  </div>
);
