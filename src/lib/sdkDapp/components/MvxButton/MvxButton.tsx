import { IPropsWithClass } from 'types';

interface MvxButtonPropsType extends IPropsWithClass {
  disabled?: boolean;
  size?: 'small' | 'large';
  variant?: 'primary' | 'secondary' | 'neutral';
  'data-testid'?: string;
  onClick?: (event: MouseEvent) => void;
  children?: any;
}

export const MvxButton = (props: MvxButtonPropsType) => {
  return (
    <mvx-button
      class={props.class}
      data-testid={props['data-testid']}
      disabled={props.disabled}
      size={props.size}
      variant={props.variant}
      onClick={props.onClick}
    >
      {props.children}
    </mvx-button>
  );
};
