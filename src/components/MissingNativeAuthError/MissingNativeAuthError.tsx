import { OutputContainer } from '../OutputContainer';

// prettier-ignore
const styles = {
  errorContainer: 'error-container flex items-center gap-1',
  emphasizedText: 'emphasized-text text-red-500 font-bold',
  nativeAuthText: 'native-auth-text font-bold italic leading-none text-primary transition-all duration-200 ease-out'
} satisfies Record<string, string>;

export const MissingNativeAuthError = () => (
  <OutputContainer>
    <div class={styles.errorContainer}>
      <p>
        Information could
        <span class={styles.emphasizedText}> NOT </span>
        be displayed because
        <span class={styles.nativeAuthText}> nativeAuth </span>
        is not active
      </p>
    </div>
  </OutputContainer>
);
