import {
  faArrowsRotate,
  faBroom,
  faPaste,
  faPenNib
} from '@fortawesome/free-solid-svg-icons';

import Fa from 'solid-fa';
import { createSignal } from 'solid-js';
import { OutputContainer } from 'components';
import {
  Address,
  getAccount,
  getAccountProvider,
  Message,
  MvxButton
} from 'lib';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

import { SignFailure, SignSuccess } from './components';

// prettier-ignore
const styles = {
  signMessageContainer: 'sign-message-container flex flex-col gap-6',
  signMessage: 'sign-message flex flex-col gap-2',
  signMessageLabel: 'sign-message-label text-secondary transition-all duration-200 ease-out text-sm font-normal',
  signMessageText: 'sign-message-text text-secondary transition-all duration-200 ease-out resize-none w-full h-32 rounded-lg focus:outline-none',
  signMessagePasteButtonContainer: 'sign-message-paste-button-container w-full flex justify-end',
  signMessagePasteButton: 'sign-message-paste-button text-tertiary text-sm font-semibold flex items-center bg-btn-tertiary rounded-md cursor-pointer px-1 transition-all duration-200 ease-out',
  signMessagePasteButtonText: 'sign-message-paste-button-text p-1',
  signMessageButton: 'sign-message-button flex gap-2 items-start',
  signButtonContent: 'sign-button-content text-sm font-normal'
} satisfies Record<string, string>;

export const SignMessage = () => {
  const [message, setMessage] = createSignal('');
  const [signedMessage, setSignedMessage] = createSignal<Message | null>(null);
  const [state, setState] = createSignal<'pending' | 'success' | 'error'>(
    'pending'
  );

  const [signature, setSignatrue] = createSignal('');
  const address = getAccount()?.address;
  const provider = getAccountProvider();

  const handleSubmit = async () => {
    if (message().trim().length === 0) {
      return;
    }

    try {
      const messageToSign = new Message({
        address: new Address(address),
        data: new Uint8Array(Buffer.from(message()))
      });

      const signedMessageResult = await provider.signMessage(messageToSign);

      if (!signedMessageResult?.signature) {
        setState('error');
        return;
      }

      setState('success');
      setSignatrue(Buffer.from(signedMessageResult?.signature).toString('hex'));
      setSignedMessage(signedMessageResult);
      setMessage('');
    } catch (error) {
      console.error(error);
      setState('error');
    }
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSignatrue('');
    setState('pending');
  };

  const handlePasteClick = async () => {
    const messageToSign = await navigator.clipboard.readText();

    setMessage(messageToSign);
  };

  return (
    <div
      id={ItemsIdentifiersEnum.signMessage}
      class={styles.signMessageContainer}
    >
      <div class={styles.signMessage}>
        <label class={styles.signMessageLabel}>Message</label>
        <OutputContainer>
          {!['success', 'error'].includes(state()) && (
            <textarea
              placeholder='Write message here'
              class={styles.signMessageText}
              value={message()}
              onChange={(event) => {
                setMessage(event.currentTarget.value);
              }}
              onKeyUp={(event) => {
                setMessage(event.currentTarget.value);
              }}
            />
          )}

          {state() === 'success' && signedMessage() != null && (
            <SignSuccess
              signedMessage={signedMessage()}
              signature={signature()}
              address={address}
            />
          )}

          <div class={styles.signMessagePasteButtonContainer}>
            <button
              onClick={handlePasteClick}
              class={styles.signMessagePasteButton}
            >
              <span class={styles.signMessagePasteButtonText}>Paste</span>

              <Fa icon={faPaste} class={styles.signMessagePasteButtonText} />
            </button>
          </div>

          {state() === 'error' && <SignFailure />}
        </OutputContainer>
      </div>

      <div class={styles.signMessageButton}>
        {['success', 'error'].includes(state()) ? (
          <MvxButton
            data-testid='closeTransactionSuccessBtn'
            onClick={handleClear}
            size='small'
          >
            <Fa icon={state() === 'success' ? faBroom : faArrowsRotate} />

            <span class={styles.signButtonContent}>
              {state() === 'error' ? 'Try again' : 'Clear'}
            </span>
          </MvxButton>
        ) : (
          <MvxButton
            data-testid='signMsgBtn'
            onClick={handleSubmit}
            size='small'
          >
            <Fa icon={faPenNib} />

            <span class={styles.signButtonContent}>Sign</span>
          </MvxButton>
        )}
      </div>
    </div>
  );
};
