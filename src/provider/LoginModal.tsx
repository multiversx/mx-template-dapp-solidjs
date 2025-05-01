import { onCleanup } from 'solid-js';
import { render } from 'solid-js/web';
import { Button } from 'components';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '8px',
    marginTop: '5px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '15px'
  }
} as const;

export class LoginModal {
  private static instance: LoginModal;
  private modalContainer: HTMLDivElement;
  private cleanup: (() => void) | null = null;

  private constructor() {
    this.modalContainer = document.createElement('div');
    document.body.appendChild(this.modalContainer);
  }

  public static getInstance(): LoginModal {
    if (!LoginModal.instance) {
      LoginModal.instance = new LoginModal();
    }
    return LoginModal.instance;
  }

  public showModal(options?: { needsAddress: boolean }): Promise<{
    privateKey: string;
    address: string;
  }> {
    return new Promise((resolve) => {
      const Modal = () => {
        let privateKeyInput: HTMLInputElement | undefined;
        let addressInput: HTMLInputElement | undefined;

        const handleSubmit = (e: Event) => {
          e.preventDefault();
          const privateKey = privateKeyInput?.value || '';
          const address = addressInput?.value || '';

          if ((options?.needsAddress && !address) || !privateKey) {
            alert(
              `Please enter ${
                options?.needsAddress ? 'address and' : ''
              } private key`
            );
            return;
          }

          resolve({ privateKey, address });
          if (this.cleanup) {
            this.cleanup();
          }
        };

        const handleClose = () => {
          resolve({ privateKey: '', address: '' });
          if (this.cleanup) {
            this.cleanup();
          }
        };

        onCleanup(() => {
          if (this.cleanup) {
            this.cleanup();
            this.cleanup = null;
          }
        });

        return (
          <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
              <h2>Authenticate</h2>
              <form onSubmit={handleSubmit} style={modalStyles.form}>
                {options?.needsAddress && (
                  <div>
                    <label>
                      Address
                      <input
                        style={modalStyles.input}
                        type='text'
                        ref={addressInput}
                        autofocus
                        required
                      />
                    </label>
                  </div>
                )}
                <div>
                  <label>
                    Private Key
                    <input
                      style={modalStyles.input}
                      type='text'
                      ref={privateKeyInput}
                      autofocus={!options?.needsAddress}
                      required
                    />
                  </label>
                </div>
                <div style={modalStyles.buttonGroup}>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type='submit'>Submit</Button>
                </div>
              </form>
            </div>
          </div>
        );
      };

      this.cleanup = render(() => <Modal />, this.modalContainer);
    });
  }
}
