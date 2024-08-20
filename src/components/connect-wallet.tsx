'use client';
import { useEffect } from "react";

import {
  PROVIDER_ID,
  reconnectProviders,
  useInitializeProviders,
  WalletProvider
} from "@txnlab/use-wallet";

import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { DaffiWalletConnect } from '@daffiwallet/connect';
import { PeraWalletConnect } from '@perawallet/connect';
import { WalletConnectModalSign } from "@walletconnect/modal-sign-html";
import WalletProviders from "./wallet-providers";

export default function ConnectWallet() {

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

    useEffect(() => {
        if (walletProviders !== null) {
            reconnectProviders(walletProviders);
        }
    }, []);
    
    return (
        <WalletProvider value={walletProviders}>
            <WalletProviders />
        </WalletProvider>
    )
}
