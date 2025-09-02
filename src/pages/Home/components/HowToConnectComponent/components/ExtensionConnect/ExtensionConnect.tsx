import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
// import { FunctionComponent, SVGProps } from 'react';

import Fa from 'solid-fa';
import ArcLogo from 'assets/img/arc-logo.svg';
import BraveLogo from 'assets/img/brave-logo.svg';
import ChromeLogo from 'assets/img/chrome-logo.svg';
// import Circles from 'assets/img/circles.svg';
import extensionImage from 'assets/img/extension-image.png';
import FirefoxLogo from 'assets/img/firefox-logo.svg';
import WalletBraveLogo from 'assets/img/wallet-brave-logo.svg';
import WalletChromeLogo from 'assets/img/wallet-chrome-logo.svg';
import WalletFirefoxLogo from 'assets/img/wallet-firefox-logo.svg';
import WalletIcon from 'assets/img/web-wallet-icon.svg';
import { getDetectedBrowser } from 'helpers/getDetectedBrowser';
import {
  BrowserEnum,
  CHROME_EXTENSION_LINK,
  FIREFOX_ADDON_LINK
} from 'localConstants';

import { BrowserFrame } from './components';

// prettier-ignore
const styles = {
  extensionCardContainer: 'extension-card-container bg-secondary p-8 lg:p-10 lg:h-115 rounded-2xl lg:rounded-3xl flex flex-col lg:flex-row justify-between gap-10 w-full transition-all duration-200 ease-out',
  extensionCardContent: 'extension-card-content flex flex-col gap-10 max-w-120',
  extensionCardText: 'extension-card-text flex flex-col gap-4',
  extensionCardTitle: 'extension-card-title text-3xl text-primary font-medium tracking-[-0.96px] leading-[1] transition-all duration-200 ease-out',
  extensionCardDescription: 'extension-card-description text-secondary text-xl tracking-[-0.21px] leading-[1.5] transition-all duration-200 ease-out',
  extensionCardDownloadSection: 'extension-card-download-section flex items-center justify-between max-w-80',
  extensionCardLink: 'extension-card-link text-accent hover:opacity-75 text-sm sm:text-lg font-semibold transition-all duration-200 ease-out flex items-center',
  extensionCardLinkTitle: 'extension-card-link-title p-2 xs:p-3',
  extensionCardLogos: 'extension-card-logos flex gap-2.5 items-center',
  extensionCardImage: 'relative max-w-100 w-full pb-10',
  extensionCardCircles: 'extension-card-circles absolute -right-22 -top-10 z-50', 
  extensionCardScreen: 'extension-card-image absolute top-10 right-4'
} satisfies Record<string, string>;

// interface BrowserLogo {
//   icon: FunctionComponent<SVGProps<SVGSVGElement>>;
// }

const browserLogos = [
  { icon: ChromeLogo },
  { icon: FirefoxLogo },
  { icon: ArcLogo },
  { icon: BraveLogo }
];

export const ExtensionConnect = () => {
  const detectedBrowser = getDetectedBrowser();
  const isFirefox = detectedBrowser === BrowserEnum.Firefox;

  const getBrowserIcon = (browser?: BrowserEnum) => {
    switch (browser) {
      case BrowserEnum.Firefox:
        return <WalletFirefoxLogo />;
      case BrowserEnum.Brave:
        return <WalletBraveLogo />;
      case BrowserEnum.Chrome:
        return <WalletChromeLogo />;
      default:
        return <WalletIcon />;
    }
  };

  const icon = getBrowserIcon(detectedBrowser);

  return (
    <div class={styles.extensionCardContainer}>
      <div class={styles.extensionCardContent}>
        {icon}

        <div class={styles.extensionCardText}>
          <h2 class={styles.extensionCardTitle}>MultiversX Wallet Extension</h2>

          <p class={styles.extensionCardDescription}>
            The MultiversX DeFi Wallet can be installed on Firefox, Chrome,
            Brave, and other chromium-based browsers. This extension is free and
            secure.
          </p>
        </div>

        <div class={styles.extensionCardDownloadSection}>
          <a
            href={isFirefox ? FIREFOX_ADDON_LINK : CHROME_EXTENSION_LINK}
            target='_blank'
            class={styles.extensionCardLink}
          >
            <span class={styles.extensionCardLinkTitle}>Get Extension</span>

            <Fa icon={faArrowRightLong} />
          </a>

          <div class={styles.extensionCardLogos}>
            {browserLogos.map(({ icon: Icon }) => (
              <Icon />
            ))}
          </div>
        </div>
      </div>

      <div class={styles.extensionCardImage}>
        {/* <Circles class={styles.extensionCardCircles} /> */}

        <BrowserFrame />

        <img src={extensionImage} class={styles.extensionCardScreen} />
      </div>
    </div>
  );
};
