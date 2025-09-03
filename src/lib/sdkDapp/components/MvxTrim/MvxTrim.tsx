import { IPropsWithClass } from 'types';

interface MvxTrimPropsType extends IPropsWithClass {
  text: string;
  shouldTrim?: boolean;
  trimFontSize?: string;
  'data-testid'?: string;
}

export const MvxTrim = ({
  text,
  class: className,
  'data-testid': dataTestId,
  shouldTrim,
  trimFontSize
}: MvxTrimPropsType) => {
  return (
    <mvx-trim
      text={text}
      class={className}
      data-testid={dataTestId}
      shouldTrim={shouldTrim}
      trimFontSize={trimFontSize}
    />
  );
};
