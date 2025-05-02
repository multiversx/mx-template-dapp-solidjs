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
    className = 'inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed',
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
