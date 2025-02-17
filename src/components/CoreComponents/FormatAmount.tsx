import { createEffect, createMemo } from "solid-js";
import { FormatAmountController } from "lib/sdkDappCore";
import { DECIMALS, DIGITS } from "localConstants/sdkDappUtilsConstants";
import { IPropsWithClass } from "types";

interface FormatAmountPropsType extends IPropsWithClass {
  egldLabel?: string;
  value: string;
}

interface FormatAmountElement extends HTMLElement {
  isValid?: boolean;
  label?: string;
  valueDecimal?: string;
  valueInteger?: string;
}

export const FormatAmount = (props: FormatAmountPropsType) => {
  const formatData = createMemo(() =>
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      ...props,
      input: props.value
    })
  );

  let elementRef: FormatAmountElement | undefined;

  const setRef = (el: FormatAmountElement) => {
    elementRef = el;
  };

  createEffect(() => {
    const { isValid, valueDecimal, valueInteger, label } = formatData();

    if (elementRef) {
      // Set properties directly instead of using attributes
      elementRef.isValid = isValid;
      elementRef.label = label || "";
      elementRef.valueDecimal = valueDecimal;
      elementRef.valueInteger = valueInteger;
    }
  });

  return (
    <format-amount
      ref={setRef}
      class={props.class}
      data-testid={props["data-testid"]}
    />
  );
};
