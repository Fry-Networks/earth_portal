import Hero from "@/components/ui/hero";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ConnectWallet from "@/components/connect-wallet";
export default function Home() {

  return (
    <>

      <Hero title="Soil Portal">
        <p>Get started earning $FRY while gathering soil data.</p>
        {/* <ButtonPrimary href="/connect/" label="Learn More">
          Connect Your Wallet
        </ButtonPrimary> */}
      </Hero>

      <ConnectWallet/>
    </>
  );
}
