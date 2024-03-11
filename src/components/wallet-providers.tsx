import { PROVIDER_ID, Provider, useWallet } from "@txnlab/use-wallet"
import { Button, ButtonSecondary } from "./button";
import { TitleMd, TitleSm } from "./title";
import Image from "next/image";
import SoilAPISelect from "./soil-api-select";

interface AccountSelectProps {
    provider: Provider;
    activeAccount?: any;
}





const AccountSelect = ({ provider, activeAccount }: AccountSelectProps) => (
    <section id="account_select">
        <label htmlFor="account_select" className="font-semibold">
            Select Account:
        </label>
        <select id="account_select" value={activeAccount ? activeAccount.address : "Address"} onChange={(e) => provider.setActiveAccount(e.target.value)}
            className="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value={""}>
                --Please Choose an Address--
            </option>
            {provider.accounts.map((account, index) => (
                <option key={index} value={account.address}>
                    {account.address}
                </option>
            ))}
        </select>
    </section>
);

export default function WalletProviders() {
    const { providers, activeAccount } = useWallet();

    const anyConnected = providers?.some(provider => provider.isConnected);

    return (
        <>

            <div className="flex flex-col md:flex-row md:justify-center">
                <section id="wallet_providers">
                    <nav id="wallet_nav" className="mx-auto mt-4 max-w-lg mx-auto">
                        {!anyConnected && <p className="text-center text-lg"><b>Step 1:</b> Please connect a wallet.</p>}
                        <ul id="wallets_list" className="list-none pt-3 flex flex-col p-4">
                            {providers?.map((provider, index) => {
                                if (anyConnected && activeAccount) {
                                    // console.log("provider:", provider.metadata.name, "active:", activeAccount.providerId)
                                    if (provider.metadata.name.toLocaleLowerCase() == activeAccount.providerId) {
                                        return (
                                            <section id="wallet_connected" className="flex flex-col md:flex-row align-top bg-brand-black">
                                                <div id="wallet-ui-img" className="flex flex-col flex-col-reverse max-w-sm md:p-4 mx-auto">
                                                    <TitleMd className="mb-4 text-success text-center">Connected to {provider.metadata.name}!</TitleMd>
                                                    <Image alt={provider.metadata.name + " wallet is Connected"} src={provider.metadata.icon} width={320} height={320} className="mx-auto max-w-sm w-full mb-4" />
                                                </div>
                                                <div id="wallet_info" className="block max-w-sm p-4 mx-auto">
                                                    <TitleSm>Wallet Info</TitleSm>
                                                    <div className="mt-4">
                                                        <b>Name: </b>
                                                        <span>
                                                            {activeAccount.name}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <b>ProviderId: </b><span>{activeAccount.providerId}</span>
                                                    </div>

                                                    <br />
                                                    <AccountSelect provider={provider} activeAccount={activeAccount} />
                                                    <br />
                                                    <hr />
                                                    <br />
                                                    <div>
                                                        <ButtonSecondary label={`Disconnect from ${provider.metadata.name}`} onClick={provider.disconnect}>
                                                            Disconnect from {provider.metadata.name}
                                                        </ButtonSecondary>
                                                    </div>
                                                </div>

                                            </section>
                                        )
                                    }
                                } else {
                                    return (
                                        <li key={provider.metadata.id}>
                                            <Button onClick={provider.connect} label={`Connect to ${provider.metadata.name}`}>
                                                <Image src={provider.metadata.icon} width={24} height={24} className="inline-block relative" alt="Connect to Daffi" /> {provider.metadata.name}
                                            </Button>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </nav>
                </section>
                {anyConnected && <SoilAPISelect />}
            </div>
        </>

    )

}

