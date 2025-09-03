import { IPropsWithChildren } from 'types';

// prettier-ignore
const styles = {
  linkAddress: 'link-address underline hover:text-primary transition-all duration-200'
} satisfies Record<string, string>;

interface LinkComponentPropsType extends IPropsWithChildren {
  linkAddress: string;
}

export const LinkComponent = ({
  linkAddress,
  children
}: LinkComponentPropsType) => (
  <a
    href={linkAddress}
    target='_blank'
    rel='noreferrer'
    class={styles.linkAddress}
  >
    {children}
  </a>
);
