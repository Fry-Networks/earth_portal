import { Provider, useWallet } from "@txnlab/use-wallet";
import React, { useState } from "react";
import { AmbientModal } from "./KeyModal/AmbientModal";
import { EcowittModal } from "./KeyModal/EcowittModal";
import OpenButton from "./OpenButton";

// Define styles for the buttons and select
const elementStyle = {
  backgroundColor: '#4CAF50',
  border: '1px solid #ffff',
  color: 'white',
  padding: '15px 32px',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '12px',
};

interface ButtonProps {
  provider: Provider;
  style: React.CSSProperties;
  activeAccount?: any;
}

const DisconnectButton = ({ provider, style }: ButtonProps) => (
  <button
    onClick={provider.disconnect}
    disabled={!provider.isConnected}
    style={{
      ...style,
      backgroundColor: 'red',
    }}
  >
    Disconnect
  </button>
);

const ConnectButton = ({ provider, style }: ButtonProps) => (
  <button style={style} onClick={provider.connect}>
    Connect
  </button>
);

const AccountSelect = ({ provider, style, activeAccount }: ButtonProps) => (
  <select
    style={{
      ...style,
      maxWidth: '300px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }}
    value={activeAccount ? activeAccount.address : "Address"}
    onChange={(e) => provider.setActiveAccount(e.target.value)}
  >
    <option value="Address" disabled>Address</option>
    {provider.accounts.map((account) => (
      <option
        key={"account-" + account.address}
        value={account.address}
      >
        {account.address}
      </option>
    ))}
  </select>
);

export default function Connect() {
  const { providers, activeAccount } = useWallet();
  const [isAmbientModalOpen, setIsAmbientModalOpen] = useState(false);
  const [isEcowittModalOpen, setIsEcowittModalOpen] = useState(false);

  const showAmbientModal = () => {
    setIsAmbientModalOpen(true);
  };

  const showEcowittModal = () => {
    setIsEcowittModalOpen(true);
  };

  const anyConnected = providers?.some(provider => provider.isConnected);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: '15px',
      paddingBottom: '25px',
      marginTop: '30px',
      marginBottom: '30px',
      marginRight: '60px',
      marginLeft: '60px',
      borderRadius: '20px',
      backgroundColor: '#84808a',
    }}>
      {providers?.map((provider) => (
        (provider.isConnected || !anyConnected) && (
          <div key={"provider-" + provider.metadata.id} style={{
            margin: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            flexBasis: 'auto',
            marginBottom: '20px',
          }}>
            <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img width={30} height={30} alt="" src={provider.metadata.icon} style={{ marginRight: '10px' }} />
              {provider.metadata.name} {provider.isActive && "[active]"}
            </h4>
            {!anyConnected && <ConnectButton provider={provider} style={elementStyle} />}
            {provider.isConnected && provider.isActive && provider.accounts.length && (
              <AccountSelect
                provider={provider}
                style={elementStyle}
                activeAccount={activeAccount}
              />
            )}
            {provider.isConnected && <DisconnectButton provider={provider} style={elementStyle} />}
            {/* Show the modals after the DisconnectButton if a wallet is connected */}
            {provider.isConnected && (
              <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              <OpenButton
                showModal={showEcowittModal}
                text="Ambient"
                logo="/ambient.png"
              />
              <AmbientModal isOpen={isEcowittModalOpen} setOpen={setIsEcowittModalOpen} />
              <OpenButton
                showModal={showAmbientModal}
                text="Ecowitt"
                logo="/ecowitt.png"
              />
              <EcowittModal isOpen={isAmbientModalOpen} setOpen={setIsAmbientModalOpen} />
              </div>
            </div>
            )}
          </div>
        )
      ))}
    </div>
  );
}
