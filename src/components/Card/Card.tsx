import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';
import { IPropsWithChildren, IPropsWithClass } from 'types';

// prettier-ignore
const styles = {
  cardContainer: 'card-container flex flex-col gap-4 flex-1 rounded-xl bg-primary transition-all duration-200 ease-out p-6 lg:p-10 justify-center border border-secondary',
  cardTitle: 'card-title flex justify-between items-center text-2xl font-medium group text-primary transition-all duration-200 ease-out',
  cardRef: 'card-ref text-link hover:text-primary transition-all duration-200 ease-out flex items-center',
  cardRefIcon: 'max-w-3.5 max-h-3.5',
  cardDescription: 'card-description text-secondary transition-all duration-200 ease-out mb-6 text-lg font-medium'
} satisfies Record<string, string>;

interface CardType extends IPropsWithChildren, IPropsWithClass {
  title: string;
  description?: string;
  reference: string;
  anchor?: string;
}

export const Card = ({
  title,
  children,
  description,
  reference,
  anchor,
  'data-testid': dataTestId
}: CardType) => (
  <div id={anchor} class={styles.cardContainer} data-testid={dataTestId}>
    <h2 class={styles.cardTitle}>
      {title}
      <a href={reference} target='_blank' class={styles.cardRef}>
        <Fa icon={faInfoCircle} class={styles.cardRefIcon} />
      </a>
    </h2>

    {description && <p class={styles.cardDescription}>{description}</p>}
    {children}
  </div>
);
