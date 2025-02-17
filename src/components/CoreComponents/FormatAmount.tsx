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
  let elementRef: FormatAmountElement | undefined;

  // Reactive state
  const value = createMemo(() => props.value);
  const label = createMemo(() => props.egldLabel);

  // Format data processor
  const formatData = createMemo(() =>
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: label(),
      input: value()
    })
  );

  // Web component update handler
  const updateElement = (data: ReturnType<typeof formatData>) => {
    if (!elementRef) return;

    elementRef.isValid = data.isValid;
    elementRef.label = data.label || "";
    elementRef.valueDecimal = data.valueDecimal;
    elementRef.valueInteger = data.valueInteger;

    if (props.class) {
      elementRef.setAttribute("class", props.class);
    }
    if (props["data-testid"]) {
      elementRef.setAttribute("data-testid", props["data-testid"]);
    }
  };

  // Update web component when data changes
  createEffect(() => {
    updateElement(formatData());
  });

  return <format-amount ref={elementRef} />;
};
