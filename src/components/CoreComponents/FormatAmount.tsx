import { FormatAmountController } from 'lib/sdkDappCore';
import { DECIMALS, DIGITS } from 'localConstants/sdkDappUtilsConstants';
import { FormatAmountControllerPropsType } from 'types/sdkDappCoreTypes';
import { IPropsWithClass } from 'types';

export const FormatAmount = (
  props: FormatAmountControllerPropsType & IPropsWithClass
) => {
  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      ...props
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
