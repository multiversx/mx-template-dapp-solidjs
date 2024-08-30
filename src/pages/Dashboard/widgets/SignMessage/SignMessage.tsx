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

type SignedMessageObjectType = {
  address: string;
  message: string;
  signature: string;
  signer: string;
  version: number;
};

export const SignMessage = () => {
  const [message, setMessage] = createSignal("");
  const [state, setState] = createSignal<"pending" | "success" | "error">(
    "pending"
  );
  const [signatrue, setSignatrue] = createSignal("");

  const handleSubmit = async () => {
    try {
      const signedMessage = await signMessage({
        message: message(),
      });
      const signedObject = signedMessage?.toJSON() as SignedMessageObjectType;
      setState("success");
      setSignatrue(signedObject.signature);
      setMessage("");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSignatrue("");
    setState("pending");
  };

  return (
    <div class="flex flex-col gap-6">
      <div class="flex gap-2 items-start">
        {["success", "error"].includes(state()) ? (
          <Button
            data-testid="closeTransactionSuccessBtn"
            id="closeButton"
            onClick={handleClear}
          >
            <>
              <Fa
                icon={state() === "success" ? faBroom : faArrowsRotate}
                class="mr-1"
              />
              {state() === "error" ? "Try again" : "Clear"}
            </>
          </Button>
        ) : (
          <Button data-testid="signMsgBtn" onClick={handleSubmit}>
            <>
              <Fa icon={faFileSignature} class="mr-1" />
              Sign
            </>
          </Button>
        )}
      </div>
      <OutputContainer>
        {!["success", "error"].includes(state()) && (
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

        {state() === "success" && (
          <SignSuccess messageToSign={message()} signature={signatrue()} />
        )}

        {state() === "error" && <SignFailure />}
      </OutputContainer>
    </div>
  );
};
