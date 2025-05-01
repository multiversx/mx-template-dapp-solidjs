import { IPropsWithChildren } from 'types';

export const Label = ({ children }: IPropsWithChildren) => {
  return <label class='text-gray-500'>{children}</label>;
};
