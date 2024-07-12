'use client';
import { useEffect, useState } from "react";

import {
  PROVIDER_ID,
  reconnectProviders,
  useInitializeProviders,
  useWallet,
  WalletProvider,
} from "@txnlab/use-wallet";

import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { DaffiWalletConnect } from '@daffiwallet/connect';
import { PeraWalletConnect } from '@perawallet/connect';
import { WalletConnectModalSign } from "@walletconnect/modal-sign-html";
import { AmbientModal } from "./KeyModal/AmbientModal";
import { EcowittModal } from "./KeyModal/EcowittModal";
import OpenButton from "./OpenButton";
import WalletProviders from "./wallet-providers";

export default function ConnectWallet() {
  const [isAmbientModalOpen, setIsAmbientModalOpen] = useState(false);
  const [isEcowittModalOpen, setIsEcowittModalOpen] = useState(false);

  const showAmbientModal = () => {
    setIsAmbientModalOpen(true);
  };

  const showEcowittModal = () => {
    setIsEcowittModalOpen(true);
  };

    const walletProviders = useInitializeProviders({
        providers: [
          { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
          { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
          { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
          {
            id: PROVIDER_ID.WALLETCONNECT,
            clientStatic: WalletConnectModalSign,
            clientOptions: {
              projectId: "74761852c2f607c540bb116a1bc9f011",
              metadata: {
                name: "Fry Foundation",
                description: "Authenticate yourself",
                url: "https://soil.fryfoundation.com",
                icons: ["https://walletconnect.com/walletconnect-logo.png"],
              },
            },
          },
        ],
      });
    const { providers, activeAccount } = useWallet();
    const anyConnected = providers?.some(provider => provider.isConnected);

    useEffect(() => {
        if (walletProviders !== null) {
            reconnectProviders(walletProviders);
        }
    }, []);
    
    // return (
    //     <WalletProvider value={walletProviders}>
    //         <WalletProviders />
    //     </WalletProvider>
    // )

    return (
      <div className="flex justify-center items-center text-center text-white w-[90vw] bg-[#201c1c] m-auto p-5">
        <WalletProvider value={walletProviders}>
          <div className="flex flex-col p-5 bg-[#84808a] rounded-[10px] w-[100vw] shadow-md">
          <WalletProviders />
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
          </div>
        </WalletProvider>
      </div>
    );
}
