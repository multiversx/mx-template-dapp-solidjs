import classNames from 'classnames';
import { Loader } from 'components/Loader';
import { IPropsWithChildren, IPropsWithClass } from 'types';

type OutputContainerPropsType = IPropsWithChildren &
  IPropsWithClass & {
    isLoading?: boolean;
  };

export const OutputContainer = (props: OutputContainerPropsType) => {
  const { children, isLoading = false, class: className = 'p-4' } = props;

  return (
    <div
      class={classNames(
        'text-sm border border-gray-200 rounded overflow-auto',
        className
      )}
      data-testid={props['data-testid']}
    >
      {isLoading ? <Loader /> : children}
    </div>
  );
};
