import { AmbientLinkKey } from "@/server/submitAmbientKey";
import { useWallet } from "@txnlab/use-wallet";


export function SubmitKeyButton({
    apiKey,
    appKey,
    updateMessage,
    disappearInput,
  }: {
    appKeyValid: boolean;
    apiKey: string;
    appKey: string;
    updateMessage: ({
      message,
      color,
    }: {
      message: string;
      color: string;
    }) => void;
    disappearInput: Function;
  }) {
    const isValidToken = /^[a-z0-9]{64}$/i.test(apiKey);
    const isValidDevice = /^[a-z0-9]{64}$/i.test(appKey);
    const isValidKeys = isValidToken && isValidDevice;
    const { activeAddress } = useWallet();
    return (
      <button
        onClick={() =>
          handleSubmit(apiKey,appKey, updateMessage, disappearInput, activeAddress!)
        }
        style={{
          ...buttonStyle,
          backgroundColor: isValidKeys ? "cyan" : "gray",
          width: "fit-content",
          alignSelf: "center",
        }}
        disabled={!isValidKeys }
      >
        Submit
      </button>
    );
  }
  
  const handleSubmit = async (
    apiKey: string,
    appKey: string,
    updateMessage: ({
      message,
      color,
    }: {
      message: string;
      color: string;
    }) => void,
    disappearInput: Function,
    activeAddress: string
  ) => {
    disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });
    const response: {
      verified: boolean;
      data: { message: string; color: string };
    } = await AmbientLinkKey(apiKey,appKey, activeAddress);
    updateMessage(response.data);
    if (!response.verified) disappearInput(false);
  };

  const buttonStyle = {
    backgroundColor: "yellow",
    border: "none",
    color: "black",
    padding: "15px 32px",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "5px",
  };
  