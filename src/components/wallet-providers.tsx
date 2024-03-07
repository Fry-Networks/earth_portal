import { PROVIDER_ID, Provider, useWallet } from "@txnlab/use-wallet"
import { Button } from "./button";
import { TitleMd } from "./title";
import Image from "next/image";
interface AccountSelectProps {
    provider: Provider;
    activeAccount?: any;
  }
const AccountSelect = ({ provider, activeAccount }: AccountSelectProps) => (
    <select value={activeAccount ? activeAccount.address : "Address"} onChange={(e) => provider.setActiveAccount(e.target.value)} className="w-max-sm">
        <option value={"Address"}>
            Address
        </option>
      {provider.accounts.map((account) => (
        <option key={"account-" + account.address} value={account.address}>
          {account.address}
        </option>
      ))}
    </select>
  );

export default function WalletProviders() {
    const { providers, activeAccount } = useWallet();
    const anyConnected = providers?.some(provider => provider.isConnected);

    return (
        <section id="wallet_section" className="block mx-auto px-4 sm:px-6 py-4">
            <nav id="wallet_nav" className="max-w-sm mx-auto mt-4">
                <p className="text-center">Please connect a wallet.</p>
                <ul id="wallets_list" className="list-none pt-3">
                    {providers?.map((provider, index) => {
                        if (anyConnected && activeAccount) {
                            console.log("provider:", provider.metadata.name, "active:", activeAccount.providerId )
                            if (provider.metadata.name.toLocaleLowerCase() == activeAccount.providerId) {
                                return (
                                    <section id="wallet_connected">
                                        <TitleMd>Connected to {activeAccount?.name}</TitleMd>
                                        <AccountSelect provider={provider} activeAccount={activeAccount}/>
                                        <Button label={`Disconnect from ${provider.metadata.name}`} onClick={provider.disconnect}>
                                            Disconnect from {provider.metadata.name}
                                        </Button>                                
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

    )

}

