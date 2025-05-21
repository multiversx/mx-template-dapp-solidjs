import { createEffect, createMemo } from 'solid-js';
import { FormatAmountController } from 'lib';
import { FormatAmountSDKPropsType } from 'lib/sdkDappUI/sdkDappUI.types';
import { DECIMALS, DIGITS } from 'lib/sdkDappUtils/sdkDappUtils.constants';
import { IPropsWithClass } from 'types';

interface FormatAmountPropsType
  extends Partial<FormatAmountSDKPropsType>,
    IPropsWithClass {
  egldLabel?: string;
  value: string;
}

export const FormatAmount = (props: FormatAmountPropsType) => {
  let elementRef: Partial<FormatAmountSDKPropsType> | undefined;

  const formatData = createMemo(() =>
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: props.egldLabel,
      input: props.value
    })
  );
  createEffect(() => {
    const data = formatData();

    if (!elementRef) {
      return;
    }

    Object.assign(elementRef, props, data);
  });

  return <mvx-format-amount ref={elementRef} />;
};
