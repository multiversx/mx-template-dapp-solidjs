import { A } from '@solidjs/router';
import { IPropsWithChildren, IPropsWithClass } from 'types';

interface MxLinkPropsType extends IPropsWithChildren, IPropsWithClass {
  to: string;
}

export const MxLink = ({
  to,
  children,
  class:
    className = 'inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 ml-2 mr-0'
}: MxLinkPropsType) => {
  return (
    <A href={to} class={className}>
      {children}
    </A>
  );
};
