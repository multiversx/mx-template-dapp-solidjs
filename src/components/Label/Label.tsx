import { IPropsWithChildren } from 'types';

// prettier-ignore
const styles = {
  labelContainer: 'label-container text-secondary transition-all duration-200 ease-out text-sm font-normal'
} satisfies Record<string, string>;

export const Label = ({ children }: IPropsWithChildren) => (
  <label class={styles.labelContainer}>{children}</label>
);
