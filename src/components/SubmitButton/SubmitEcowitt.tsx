import { EcowittLinkKey } from "@/server/submitEcoKey";
import { useWallet } from "@txnlab/use-wallet";

export function SubmitKeyButton({
    appKey,
    apiKey,
    updateMessage,
    disappearInput,
  }: {
    appKey: string;
    apiKey: string;
    updateMessage: ({
      message,
      color,
    }: {
      message: string;
      color: string;
    }) => void;
    disappearInput: Function;
  }) {
    const { activeAddress } = useWallet();
    const isValidToken = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(apiKey);
    const isValidDevice = /^[0-9a-f]{32}$/i.test(appKey);
    const isValidKeys = isValidToken && isValidDevice;

    return (
      <button
        onClick={() =>
          handleEcowittSubmit(
            apiKey,
            appKey,
            updateMessage,
            disappearInput,
            activeAddress!
          )
        }
        style={{
          ...buttonStyle,
          backgroundColor: isValidKeys ? "cyan" : "gray",
          width: "fit-content",
          alignSelf: "center",
        }}
        disabled={!isValidKeys}
      >
        Submit
      </button>
    );
  }
  
  const handleEcowittSubmit = async (
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
    // disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });
    const response: {
      verified: boolean;
      data: { message: string; color: string };
    } = await EcowittLinkKey(apiKey, appKey, activeAddress);
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
  