"use client";

import Loading from "@/components/ui/loading";
import React, { useState, useEffect } from 'react';


import Hero from "@/components/ui/hero";
import { PROVIDER_ID, Provider, useWallet, Account, useInitializeProviders } from "@txnlab/use-wallet";
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { WalletConnectModalSign } from "@walletconnect/modal-sign-html";

const SettingsHero = () => {
    return (
        <section>
            <Hero title="Settings">
                Edit your Soil Collection Configuration
            </Hero>
        </section>
    )
}

const Settings: React.FC = () => {
    const [Loaded, setLoaded] = useState(false);
    const [hasAccount, setAccount] = useState(false);

    const { providers, activeAccount } = useWallet();

    const anyConnected = providers?.some(provider => provider.isConnected);

    useEffect(() => {
        const anyConnected = providers?.some(provider => provider.isConnected);

        // Based on the connection status, update the account and loaded states.
        setAccount(anyConnected !== null);
        setLoaded(true); // Assuming you want to set it to true regardless of account status.
    }, [providers]); // This effect depends on `providers` and will re-run when it changes.


    if (!Loaded) {
        return (
            <>
                <SettingsHero />
                <Loading />
            </>
        )
    } else {
        if (hasAccount) {

            return (
                <>
                    <SettingsHero />
                    <section>
                        <div className="max-w-md mx-auto">
                            <p>You have an account</p>

                            <dl id="account_info" className="p-4 w-max-sm">
                                <dt>Address:</dt>
                                <dd id="account_address">{activeAccount?.address}</dd>
                                <dt>Account Name:</dt>
                                <dd>{activeAccount?.name}</dd>
                                <dt>Account Email:</dt>
                                <dd>{activeAccount?.email}</dd>
                            </dl>
                        </div>
                    </section>
                </>
            )

        } else {
            return (
                <>
                    <SettingsHero />
                    <section>
                        <div>
                            <p>Sorry, you have not configured your Soil Miner.</p>
                        </div>
                    </section>
                </>
            )
        }
    }
}

export default Settings;