import { createEffect } from 'solid-js';
import { FormatAmountSDKPropsType } from 'lib/sdkDappUI/sdkDappUI.types';
import { IPropsWithClass } from 'types';

interface FormatAmountPropsType
  extends Partial<FormatAmountSDKPropsType>, IPropsWithClass {
  isValid: boolean;
  valueInteger: string;
  valueDecimal: string;
  label?: string;
  decimalClass?: string;
  labelClass?: string;
  showLabel?: boolean;
}

export const FormatAmount = (props: FormatAmountPropsType) => {
  let elementRef: Partial<FormatAmountSDKPropsType> | undefined;

  const setElementRef = (el: Partial<FormatAmountSDKPropsType>) => {
    elementRef = el;
    Object.assign(elementRef, props);
  };

  createEffect(() => {
    if (!elementRef) {
      return;
    }
    Object.assign(elementRef, props);
  });

  return <mvx-format-amount ref={setElementRef} />;
};
