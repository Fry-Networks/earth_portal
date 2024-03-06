import Hero from "@/components/hero";
import Image from "next/image";
import {Button, ButtonPrimary} from "@/components/button";

export default function Home() {
  return (
    <>
      <Hero title="Soil Portal">
        <p>Your soil info gateway.</p>
        {/* <ButtonPrimary href="/connect/" label="Learn More">
          Connect Your Wallet
        </ButtonPrimary> */}
      </Hero>
      <section id="wallet_section" className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <nav id="wallet_nav" className="max-w-1xl mx-auto mt-4">
          <p className="text-center">Please connect a wallet.</p>
          <ul id="wallets_list" className="list-none pt-3">
            <li>
              <Button href="/connect/daffi" label="Connect to Daffi">
                <Image src="/img/daffi-logo.png" width={24} height={24} className="inline-block relative" alt="Connect to Daffi" /> Daffi
              </Button>
            </li>
            <li>
              <Button href="/connect/defly" label="Connect to Defly">
                <Image src="/svg/defly-logo.svg" width={24} height={24} className="inline-block relative" alt="Connect to Defly" /> Defly
              </Button>
            </li>
            <li>
              <Button href="/connect/pera" label="Connect to Defly">
                <Image src="/svg/pera-logo.svg" width={24} height={24} className="inline-block relative" alt="Connect to Defly" /> Pera
              </Button>
            </li>
            <li>
              <Button href="/connect/myalgo" label="Connect to MyAlgo">
                <Image src="/svg/myalgo-logo.svg" width={24} height={24} className="inline-block relative" alt="Connect to MyAlgo" /> MyAlgo
              </Button>
            </li>
            <li>
              <Button href="/connect/walletconnect" label="Connect to WalletConnect">
                <Image src="/svg/walletconnect-logo.svg" width={24} height={24} className="inline-block relative" alt="Connect to WalletConnect" /> WalletConnect
              </Button>
            </li>
          </ul>
        </nav>
  
      </section>
    </>
  );
}
