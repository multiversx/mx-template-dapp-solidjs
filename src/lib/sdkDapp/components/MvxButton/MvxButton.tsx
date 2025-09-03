import { IPropsWithClass } from 'types';

interface MvxButtonPropsType extends IPropsWithClass {
  disabled?: boolean;
  size?: 'small' | 'large';
  variant?: 'primary' | 'secondary' | 'neutral';
  'data-testid'?: string;
  onClick?: (event: MouseEvent) => void;
  children?: any;
}

export const MvxButton = ({
  class: className,
  'data-testid': dataTestId,
  disabled,
  size,
  variant,
  onClick,
  children
}: MvxButtonPropsType) => {
  return (
    <mvx-button
      class={className}
      data-testid={dataTestId}
      disabled={disabled}
      size={size}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </mvx-button>
  );
};
