import { AccountType, trimUsernameDomain } from 'lib';
import { getUserHerotag } from '../hooks';

// prettier-ignore
const styles = {
  usernameContainer: 'username-container flex gap-0.5',
  herotag: 'herotag text-accent transition-all duration-200 ease-out'
} satisfies Record<string, string>;

export const Username = (props: {
  account?: AccountType | null;
  address: string;
}) => {
  const { address } = props;

  const [herotag] = getUserHerotag(address);

  return (
    <p class={styles.usernameContainer}>
      <span class={styles.herotag}>{herotag() ? '@' : ''}</span>

      <span data-testid='heroTag'>
        {herotag() ? trimUsernameDomain(herotag()) : 'N/A'}
      </span>
    </p>
  );
};
