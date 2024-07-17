import {
  faFileSignature,
  faBroom,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { createSignal } from "solid-js";
import { Button } from "components/Button";
import { OutputContainer } from "components/OutputContainer";
import { SignFailure, SignSuccess } from "./components";
import { signMessage } from "lib/sdkDappCore";
import Fa from "solid-fa";

export const SignMessage = () => {
  // const { sessionId, signMessage, onAbort } = useSignMessage();

  const [message, setMessage] = createSignal("");
  const [state, setState] = createSignal<"pending" | "success" | "error">(
    "pending"
  );
  const [signatrue, setSignatrue] = createSignal("");

  const isSuccess = state() === "success";
  const isError = state() === "error";

  const handleSubmit = async () => {
    try {
      const signedMessage = await signMessage({
        message: message(),
      });
      console.log(signedMessage?.toJSON());
      setState("success");
      setMessage("");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div class="flex flex-col gap-6">
      <div class="flex gap-2 items-start">
        <Button data-testid="signMsgBtn" onClick={handleSubmit}>
          <>
            <Fa icon={faFileSignature} class="mr-1" />
            Sign
          </>
        </Button>
        <p>{message()}</p>

        {(isSuccess || isError) && (
          <Button
            data-testid="closeTransactionSuccessBtn"
            id="closeButton"
            onClick={handleClear}
          >
            <>
              <Fa icon={isSuccess ? faBroom : faArrowsRotate} class="mr-1" />
              {isError ? "Try again" : "Clear"}
            </>
          </Button>
        )}
      </div>
      <OutputContainer>
        {!isSuccess && !isError && (
          <textarea
            placeholder="Write message here1"
            class="resize-none w-full h-32 rounded-lg focus:outline-none focus:border-blue-500"
            onChange={(event) => {
              setMessage(event.currentTarget.value);
            }}
            onKeyUp={(event) => {
              setMessage(event.currentTarget.value);
            }}
          />
        )}

        {isSuccess && (
          <SignSuccess messageToSign={message()} signature={signatrue()} />
        )}

        {isError && <SignFailure />}
      </OutputContainer>
    </div>
  );
};
