import { PROVIDER_ID, Provider, useWallet } from "@txnlab/use-wallet"
import { Button } from "./button";
import Image from "next/image";
export default function WalletProviders() {
    const { providers, activeAccount } = useWallet();
    return (
        <section id="wallet_section" className="block mx-auto px-4 sm:px-6 py-4">
            <nav id="wallet_nav" className="max-w-sm mx-auto mt-4">
                <p className="text-center">Please connect a wallet.</p>
                <ul id="wallets_list" className="list-none pt-3">
                    {providers?.map((provider, index) => (
                        <li key={index}>
                            <Button href="/connect/daffi" label="Connect to Daffi" onClick={provider.connect}>
                                <Image src={provider.metadata.icon} width={24} height={24} className="inline-block relative" alt="Connect to Daffi" /> {provider.metadata.name}
                            </Button>
                        </li>
                    ))}

                    {/* <li>
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
                            </li> */}
                </ul>
            </nav>
        </section>
    )

    {/* {!anyConnected &&
                
            } */}
}