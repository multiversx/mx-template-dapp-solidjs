import {
  faFileSignature,
  faBroom,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import { Address, Message } from '@multiversx/sdk-core';
import Fa from 'solid-fa';
import { createSignal } from 'solid-js';
import { Button } from 'components/Button';
import { OutputContainer } from 'components/OutputContainer/OutputContainer';
import { getAccount, getAccountProvider } from 'lib';
import { SignFailure, SignSuccess } from './components';

export const SignMessage = () => {
  const [message, setMessage] = createSignal('');
  const [signedMessage, setSignedMessage] = createSignal<Message | null>(null);
  const [state, setState] = createSignal<'pending' | 'success' | 'error'>(
    'pending'
  );
  const [signatrue, setSignatrue] = createSignal('');
  const address = getAccount()?.address;
  const provider = getAccountProvider();

  const handleSubmit = async () => {
    try {
      const messageToSign = new Message({
        address: new Address(address),
        data: Buffer.from(message())
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

  return (
    <div class='flex flex-col gap-6'>
      <div class='flex gap-2 items-start'>
        {['success', 'error'].includes(state()) ? (
          <Button
            data-testid='closeTransactionSuccessBtn'
            id='closeButton'
            onClick={handleClear}
          >
            <>
              <Fa
                icon={state() === 'success' ? faBroom : faArrowsRotate}
                class='mr-1'
              />
              {state() === 'error' ? 'Try again' : 'Clear'}
            </>
          </Button>
        ) : (
          <Button data-testid='signMsgBtn' onClick={handleSubmit}>
            <>
              <Fa icon={faFileSignature} class='mr-1' />
              Sign
            </>
          </Button>
        )}
      </div>
      <OutputContainer>
        {!['success', 'error'].includes(state()) && (
          <textarea
            placeholder='Write message here1'
            class='resize-none w-full h-32 rounded-lg focus:outline-none focus:border-blue-500'
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
            signature={signatrue()}
          />
        )}

        {state() === 'error' && <SignFailure />}
      </OutputContainer>
    </div>
  );
};
