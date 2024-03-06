    'use client';

    import { Button } from "./button";
    import Image from "next/image";
    import {
        reconnectProviders,
        useInitializeProviders,
        WalletProvider,
        PROVIDER_ID,
        algosigner,
        useWallet,
    } from "@txnlab/use-wallet";

    import { DeflyWalletConnect } from '@blockshake/defly-connect'
    import { PeraWalletConnect } from '@perawallet/connect'
    import { DaffiWalletConnect } from '@daffiwallet/connect'
    import { WalletConnectModalSign } from "@walletconnect/modal-sign-html";


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
        function daffiConnect() {
            console.log("daffiConnect")

        }
        function deflyConnect() {
            console.log("deflyConnect")

        }
        function peraConnect() {
            console.log("peraConnect")

        }
        function walletConnect() {
            console.log("walletConnect")

        }
        return (
            <section id="wallet_section" className="block mx-auto px-4 sm:px-6 py-4">
                <nav id="wallet_nav" className="max-w-sm mx-auto mt-4">
                    <p className="text-center">Please connect a wallet.</p>
                    <ul id="wallets_list" className="list-none pt-3">
                        <li>
                            <Button href="/connect/daffi" label="Connect to Daffi" onClick={daffiConnect}>
                                <Image src="/img/daffi-logo.png" width={24} height={24} className="inline-block relative" alt="Connect to Daffi" /> Daffi
                            </Button>
                        </li>
                        <li>
                            <Button href="/connect/defly" label="Connect to Defly" onClick={deflyConnect}>
                                <Image src="/svg/defly-logo.svg" width={24} height={24} className="inline-block relative" alt="Connect to Defly" /> Defly
                            </Button>
                        </li>
                        <li>
                            <Button href="/connect/pera" label="Connect to Pera" onClick={peraConnect}>
                                <Image src="/svg/pera-logo.svg" width={24} height={24} className="inline-block relative" alt="Connect to Defly" /> Pera
                            </Button>
                        </li>
                        <li>
                            <Button href="/connect/walletconnect" label="Connect to WalletConnect" onClick={walletConnect}>
                                <Image src="/svg/walletconnect-logo.svg" width={24} height={24} className="inline-block relative" alt="Connect to WalletConnect" /> WalletConnect
                            </Button>
                        </li>
                    </ul>
                </nav>
            </section>
        )
    }
