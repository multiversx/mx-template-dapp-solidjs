import { IPropsWithClass, IPropsWithStyles } from "types";

export interface FormatAmountPropsType
  extends IPropsWithClass,
    IPropsWithStyles {
  value: string;
  showLastNonZeroDecimal?: boolean;
  showLabel?: boolean;
  token?: string;
  digits?: number;
  decimals?: number;
  egldLabel?: string;
  "data-testid"?: string;
}
