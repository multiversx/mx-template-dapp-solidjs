import { createMemo, Show } from 'solid-js';
import { Label } from 'components';
import { Message } from 'lib';

import { decodeMessage } from '../helpers';

// prettier-ignore
const styles = {
  signSuccessContainer: 'sign-success-container flex flex-col gap-6',
  signSuccess: 'sign-success flex flex-col w-[calc(100%-50px)]',
  signatureContainer: 'signature-container flex flex-row w-full gap-2',
  signatureText: 'signature-text w-full resize-none outline-none bg-transparent',
  encodedMessageContainer: 'encoded-message-container flex flex-row w-full gap-2',
  decodedMessageContainer: 'decoded-message-container flex flex-row w-full gap-2',
  decodedMessageText: 'resize-none outline-none text-green-700 bg-transparent'
} satisfies Record<string, string>;

interface VerifyMessagePropsType {
  signedMessage: Message | null;
  signature: string;
  address: string;
}

export const SignSuccess = (props: VerifyMessagePropsType) => {
  const decoded = createMemo(() => {
    const message = props.signedMessage;

    if (message == null) {
      return null;
    }

    return decodeMessage({ message, signature: props.signature });
  });

  return (
    <Show when={decoded()}>
      {(decodedResult) => (
        <div class={styles.signSuccessContainer}>
          <div class={styles.signSuccess}>
            <div class={styles.signatureContainer}>
              <Label>Signature:</Label>

              <textarea
                readOnly
                class={styles.signatureText}
                rows={2}
                value={props.signature}
              />

              {/* <CopyButton text={props.signature} /> */}
            </div>

            <div class={styles.encodedMessageContainer}>
              <Label>Encoded message:</Label>

              <p>{decodedResult().encodedMessage}</p>
            </div>

            <div class={styles.decodedMessageContainer}>
              <Label>Decoded message:</Label>

              <textarea
                readOnly
                class={styles.decodedMessageText}
                rows={1}
                value={decodedResult().decodedMessage}
                placeholder='Decoded message'
              />
            </div>
          </div>
        </div>
      )}
    </Show>
  );
};
