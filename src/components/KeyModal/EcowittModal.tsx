import { useState } from "react";
import Modal from "react-modal";
import AppKeyInput from "../Input/AppKeyInput";
import KeyInput from "../Input/EcowittInput";
import { SubmitKeyButton } from "../SubmitButton/SubmitEcowitt";

export function EcowittModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Function;
}) {
  const [apiKey, setApiKey] = useState("");
  const [appKey, setAppKey] = useState("");
  const [message, updateMessage] = useState({ message: "", color: "white" });
  const [disappear, setDisappear] = useState(false);
  const [appKeydisappear, setAppKeyDisappear] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          backgroundColor: "RGB(12, 167, 229)",
          color: "white",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          display: "grid",
        },
      }}
    >
      <button
        style={{
          fontSize: "20px",
          justifySelf: "flex-end",
          borderRadius: "50%",
          borderColor: "white",
          borderInlineColor: "white",
          borderWidth: "1px",
          borderStyle: "solid",
          boxShadow: "none",
          width: "45px",
          padding: "6px"
        }}
        onClick={() => {
          setOpen(false);
        }}
      >
        X
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "25px" }}>
          Please enter your Ecowitt Weather API and APP Key below:
        </h1>
        <p style={{ fontSize: "12px", marginBottom: "25px" }}>
          Your API/APP Keys only allows access to your devices data, nothing more.
          You can verify that{" "}
          <a
            style={{
              textDecoration: "underline",
            }}
            href="https://doc.ecowitt.net/web/#/apiv3en?page_id=1"
            target="_blank"
          >
            here
          </a>
          .
        </p>

        <KeyInput
          apiKey={apiKey}
          setApiKey={setApiKey}
          disappear={disappear}
          type="ecowitt"
        />

        <AppKeyInput
          appKey={appKey}
          setAppKey={setAppKey}
          disappear={disappear}
        />

        <SubmitKeyButton
          appKey={appKey}
          apiKey={apiKey}
          updateMessage={updateMessage}
          disappearInput={setDisappear}
        />

        <p
          style={{
            color: message.color,
            fontSize: "17px",
            marginTop: "10px",
            fontWeight: "bolder",
          }}
        >
          {message.message}
        </p>
      </div>
    </Modal>
  );
}
