import { IPropsWithClass } from 'types';

interface MvxTrimPropsType extends IPropsWithClass {
  text: string;
  shouldTrim?: boolean;
  trimFontSize?: string;
  'data-testid'?: string;
}

export const MvxTrim = (props: MvxTrimPropsType) => {
  return (
    <mvx-trim
      text={props.text}
      class={props.class}
      data-testid={props['data-testid']}
      shouldTrim={props.shouldTrim}
      trimFontSize={props.trimFontSize}
    />
  );
};
