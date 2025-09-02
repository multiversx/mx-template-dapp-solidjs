import { IPropsWithChildren, IPropsWithClass } from 'types';

interface ButtonType extends IPropsWithClass, IPropsWithChildren {
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  dataCy?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  id,
  class:
    className = 'flex items-center justify-center rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-btn-primary text-btn-primary font-bold cursor-pointer',
  ...otherProps
}: ButtonType) => {
  return (
    <button
      id={id}
      data-testid={otherProps['data-testid']}
      disabled={disabled}
      onClick={onClick}
      class={className}
      type={type}
    >
      {children}
    </button>
  );
};
