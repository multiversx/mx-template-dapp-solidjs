import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';

// prettier-ignore
const styles = {
  connectCardContainer: 'connect-card-container bg-secondary p-8 lg:p-10 flex flex-col gap-10 rounded-2xl lg:rounded-3xl transition-all duration-200 ease-out',
  connectCardText: 'connect-card-text flex flex-col gap-4 flex-1',
  connectCardTitle: 'connect-card-title text-3xl text-primary font-medium tracking-[-0.96px] leading-[1] transition-all duration-200 ease-out',
  connectCardDescription: 'connect-card-description text-secondary text-xl tracking-[-0.21px] leading-[1.5] transition-all duration-200 ease-out',
  connectCardLink: 'connect-card-link text-accent hover:opacity-75 text-lg font-semibold transition-all duration-200 ease-out flex items-center',
  connectCardLinkTitle: 'connect-card-link-title p-3'
} satisfies Record<string, string>;

interface ConnectCardPropsType {
  icon: string;
  title: string;
  description: string;
  linkTitle: string;
  linkDownloadAddress: string;
}

export const ConnectCard = ({
  icon,
  title,
  description,
  linkTitle,
  linkDownloadAddress
}: ConnectCardPropsType) => {
  const IconComponent = icon;

  return (
    <div class={styles.connectCardContainer}>
      <IconComponent />

      <div class={styles.connectCardText}>
        <h2 class={styles.connectCardTitle}>{title}</h2>

        <p class={styles.connectCardDescription}>{description}</p>
      </div>

      <a
        href={linkDownloadAddress}
        target='_blank'
        class={styles.connectCardLink}
      >
        <span class={styles.connectCardLinkTitle}>{linkTitle}</span>

        <Fa icon={faArrowRightLong} />
      </a>
    </div>
  );
};
