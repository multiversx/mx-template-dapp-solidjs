import { IPropsWithChildren } from 'types';

export const PageWrapper = ({ children }: IPropsWithChildren) => {
  return (
    <div class='flex flex-1 rounded-xl bg-white p-6 sm:flex-row items-center justify-center'>
      {children}
    </div>
  );
};
