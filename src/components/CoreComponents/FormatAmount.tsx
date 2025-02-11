import { FormatAmountController } from 'lib/sdkDappCore';
import { DECIMALS, DIGITS } from 'localConstants/sdkDappUtilsConstants';
import { IPropsWithClass } from 'types';

interface FormatAmountPropsType extends IPropsWithClass {
  egldLabel?: string;
  value: string;
}

export const FormatAmount = (props: FormatAmountPropsType) => {
  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      ...props,
      input: props.value,
    });

  return (
    <format-amount
      class={props.class}
      data-testid={props['data-testid']}
      isValid={isValid}
      label={label}
      valueDecimal={valueDecimal}
      valueInteger={valueInteger}
    />
  );
};
