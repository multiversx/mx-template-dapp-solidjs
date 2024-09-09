import classNames from "classnames";
import {
  DECIMALS,
  DIGITS,
  getState,
  networkSelector,
  ZERO,
} from "lib/sdkDappCore";
import { FormatAmountPropsType } from "./formatAmount.types";
import { getFormattedAmount } from "./getFormattedAmount";
import BigNumber from "bignumber.js";

const FormatAmountInvalid = (props: FormatAmountPropsType) => {
  const styles = props.styles ?? {};

  return (
    <span
      data-testid={props["data-testid"] || "formatAmountComponent"}
      class={props.class}
    >
      <span class={styles["int-amount"]} data-testid="formatAmountInt">
        ...
      </span>
    </span>
  );
};

const formatAmountValid = (props: FormatAmountPropsType, erdLabel: string) => {
  const { value, showLastNonZeroDecimal = false, showLabel = true } = props;
  const digits = props.digits != null ? props.digits : DIGITS;
  const decimals = props.decimals != null ? props.decimals : DECIMALS;
  const styles = props.styles ?? {};

  const formattedValue = getFormattedAmount({
    input: value,
    decimals,
    digits,
    showLastNonZeroDecimal,
    addCommas: true,
  });

  const valueParts = formattedValue.split(".");
  const hasNoDecimals = valueParts.length === 1;
  const isNotZero = formattedValue !== ZERO;

  // fill in zeros to match specific formatting
  // example: if DIGITS are 2, `0.1` will be turned into `0.10`
  // to take up the same amount of space in a right-aligned table cell
  if (digits > 0 && hasNoDecimals && isNotZero) {
    let zeros = "";

    for (let i = 1; i <= digits; i++) {
      zeros = zeros + ZERO;
    }

    valueParts.push(zeros);
  }

  return (
    <span
      data-testid={props["data-testid"] || "formatAmountComponent"}
      class={props.class}
    >
      <span class={styles["int-amount"]} data-testid={"formatAmountInt"}>
        {valueParts[0]}
      </span>
      {valueParts.length > 1 && (
        <span class={styles.decimals} data-testid={"formatAmountDecimals"}>
          .{valueParts[1]}
        </span>
      )}
      {showLabel && (
        <span
          class={classNames(styles.symbol, props.token)}
          data-testid={"formatAmountSymbol"}
        >
          {` ${props.token ?? erdLabel}`}
        </span>
      )}
    </span>
  );
};

const FormatAmountComponent = (props: FormatAmountPropsType) => {
  const { value } = props;

  const isInteger = new BigNumber(value).isInteger();

  return !isInteger
    ? FormatAmountInvalid(props)
    : formatAmountValid(props, props.egldLabel || "");
};

/**
 * @param props.egldLabel  if not provided, will fallback on **EGLD**
 */
export const FormatAmount = (props: FormatAmountPropsType) => {
  const network = networkSelector(getState());
  const egldLabel = props.egldLabel || network.egldLabel;

  const formatAmountProps = { ...props, egldLabel };

  return <FormatAmountComponent {...formatAmountProps} />;
};
