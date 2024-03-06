'use client';
import { useState, useEffect } from "react";

import { Button } from "./button";
import Image from "next/image";
import {
    reconnectProviders,
    useInitializeProviders,
    WalletProvider,
    PROVIDER_ID,
    algosigner,
    useWallet,
    Provider
} from "@txnlab/use-wallet";

import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
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
                url: "https://weather.fryfoundation.com",
                icons: ["https://walletconnect.com/walletconnect-logo.png"],
              },
            },
          },
        ],
      });
    const { providers, activeAccount } = useWallet();
    const anyConnected = providers?.some(provider => provider.isConnected);

    const [isEcowittModalOpen, setIsEcowittModalOpen] = useState(false);
    const [isWeatherXMModalOpen, setIsWeatherXMModalOpen] = useState(false);
    const showEcowittModal = () => {
        setIsEcowittModalOpen(true);
    };
    const showWeatherXMModal = () => {
        setIsWeatherXMModalOpen(true);
    };

    const [isModalOpen, setModalIsOpen] = useState(false);
    function daffiConnect() {
        console.log("daffiConnect");
        setModalIsOpen(true);
    }
    function deflyConnect() {
        console.log("deflyConnect")
        setModalIsOpen(true);
    }
    function peraConnect() {
        console.log("peraConnect")
        setModalIsOpen(true);
    }
    function walletConnect() {
        console.log("walletConnect")
        setModalIsOpen(true);
    }
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
