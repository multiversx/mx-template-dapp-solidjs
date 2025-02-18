import { createEffect, createMemo } from "solid-js";
import { FormatAmountController } from "lib/sdkDappCore";
import { FormatAmountSDKPropsType } from "lib/sdkDappCoreUI/sdkDappCoreUI.types";
import { DECIMALS, DIGITS } from "localConstants/sdkDappUtilsConstants";
import { IPropsWithClass } from "types";

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

  return <format-amount ref={elementRef} />;
};
