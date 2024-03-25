"use client";

import Loading from "@/components/ui/loading";
import React, { useState, useEffect } from 'react';
import { TitleMd } from "@/components/ui/title";
import Hero from "@/components/ui/hero";
import { PROVIDER_ID, Provider, useWallet, Account, useInitializeProviders } from "@txnlab/use-wallet";
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { WalletConnectModalSign } from "@walletconnect/modal-sign-html";
import { CookiesProvider, useCookies } from 'react-cookie'
import Link from "next/link";
const FinishHero = () => {
    return (
        <section>
            <Hero title="Success">
                You Successully Finished Registering in the Soil Portal!
            </Hero>
        </section>
    )
}

const ApiInfo: React.FC = () => {
    const [cookies, setCookie] = useCookies(['email', 'soilAPI', 'apiKey', 'appKey', 'mac', 'address'])
    let content = null;

    switch (cookies.soilAPI) {
        case 'AmbientWeather':
            content = (
                <>
                    <TitleMd>AmbientWeather</TitleMd>
                    <dl id="account_info" className="w-max-sm">
                        <dt>API Key</dt>
                        <dd>{cookies.apiKey}</dd>
                        <dt>Application Key:</dt>
                        <dd>{cookies.appKey}</dd>
                        <dt>Mac</dt>
                        <dd>{cookies.mac}</dd>
                    </dl>
                </>
            );
            break;
        case 'EcoWitt':
            content = (
                <>
                    <TitleMd>EcoWitt</TitleMd>
                    <dl id="account_info" className="w-max-sm">
                        <dt>API Key</dt>
                        <dd>{cookies.apiKey}</dd>
                        <dt>Application Key:</dt>
                        <dd>{cookies.appKey}</dd>
                    </dl>
                </>
            );
            break;
        default:
            content = <p>No API selected</p>;
    }

    return content;
};

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
                <FinishHero />
                <Loading />
            </>
        )
    } else {
        if (hasAccount) {

            return (
                <>
                    <FinishHero />
                    <section>
                        <div className="max-w-sm mx-auto p-4">
                            <TitleMd>Congrats! 🥳🎉</TitleMd>
                            <p>
                                Go to <Link href="https://www.fryfoundation.com/hardware-high-end-weather-miner-registration" alt="High-End Weather Miner Registration">High-End Weather Miner Registration</Link> to complete your registration process.
                            </p>
                        </div>
                    </section>
                    {/* <section>
                        <div className="flex flex-col">
                            <div className="max-w-lg mx-auto p-4">
                                <TitleMd>
                                    Wallet Info
                                </TitleMd>

                                <dl id="account_info" className="w-max-sm">
                                    <dt>Address:</dt>
                                    <dd id="account_address">{activeAccount?.address}</dd>
                                    <dt>Account Name:</dt>
                                    <dd>{activeAccount?.name}</dd>
                                    <dt>Account Email:</dt>
                                    <dd>{activeAccount?.email}</dd>
                                </dl>

                            </div>
                            <div className="max-w-lg mx-auto p-4">
                                <ApiInfo />
                            </div>
                        </div>
                    </section> */}
                </>
            )

        } else {
            return (
                <>
                    {/* <SettingsHero /> */}
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