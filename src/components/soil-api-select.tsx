import React, { useState, useEffect } from 'react';
import { Button, ButtonSecondary } from "./ui/button";
import { TitleMd } from "./ui/title";
import { Account } from '@txnlab/use-wallet';
import Image from 'next/image';
import axios from 'axios';
import { AmbientLinkKey } from '@/server/submitAmbientKey';
import { EcowittLinkKey } from '@/server/submitEcoKey';
import WalletProviders from "./wallet-providers";
import { useRouter } from 'next/navigation'
import { CookiesProvider, useCookies } from 'react-cookie'


interface SoilAPISelectProps {
    account?: Account;
}

const logos = [
    {
        "name": "AmbientWeather",
        "src": "/img/ambient-logo.png"
    },
    {
        "name": "EcoWitt",
        "src": "/img/ecowitt-logo.png"
    }
    // {
    //     "name": "WeatherXM",
    //     "src": "/img/weatherxm-logo.png"
    // }
];

const SoilAPISelect: React.FC<SoilAPISelectProps> = ({ account }) => {
    const router = useRouter()
    const [selectedApi, setSelectedApi] = useState('');
    const [formSubmitSuccess, setformSubmitSuccess] = useState(false);
    const [inputs, setInputs] = useState({
        appKey: "",
        key: "",
        address: account?.address
    });
    const [validationText, setValidationText] = useState('');

    const [responseData, setresponseData] = useState({});
    const [cookies, setCookie] = useCookies(['soilAPI', 'appKey', 'key', 'address'])
    useEffect(() => {
        // if (cookies.soilAPI !== null) {
        //     setformSubmitSuccess(true);
        // }
    });
    const handleSelect = (api: string) => {
        setSelectedApi(api);
        setInputs({
            appKey: "",
            key: "",
            address: account?.address,
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleFormValidation = (message : string) => {
        console.log("message",message);
        if (message.startsWith("Successfully")) {
            setValidationText(message);
            setformSubmitSuccess(true);
            router.push("/finish", { scroll: false })
        } else {
            setValidationText(message);
            setformSubmitSuccess(false);
        }
    }

    const handleSoilAPISubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        try {
            if (selectedApi === 'EcoWitt' && inputs.appKey && inputs.key && inputs.address) {
                // const data = await EcowittLinkKey(inputs.apiKey, inputs.appKey, inputs.address);
                // setformSubmitSuccess(data.verified);
                
                const data = await EcowittLinkKey(inputs.appKey, inputs.key, inputs.address)
                
                if (data.data.message === 'Successfully linked your API Key to your wallet address!\nWe will soon begin to retreive data from your soil stations/devices.') {

                    setCookie('soilAPI', selectedApi, { path: '/finish' });
                    setCookie('appKey', inputs.appKey, { path: '/finish' });
                    setCookie('key', inputs.key, { path: '/finish' });
                    setCookie('address', inputs.address, { path: '/finish' });
                } 
                handleFormValidation(data.data.message);

            } else if (selectedApi === 'AmbientWeather' && inputs.key && inputs.address) {
                
                const data = await AmbientLinkKey(inputs.key, inputs.address);

                

                if (data.data.message === 'Successfully linked your API Key to your wallet address!\nWe will soon begin to retreive data from your soil stations/devices.') {
                    setCookie('soilAPI', selectedApi, { path: '/finish' });
                    setCookie('key', inputs.key, { path: '/finish' });
                    setCookie('appKey', inputs.appKey, { path: '/finish' });
                    
                } 
                handleFormValidation(data.data.message);
            } else {
                throw new Error("No API selected or address is missing");
            }
        } catch (error) {
            console.error("Submission error", error);
            setValidationText("Error submitting form. Please try again.");
            setformSubmitSuccess(false); // Indicate failure
        }
    };

    const renderAmbientWeatherInput = () => (
        <>
            <label htmlFor="key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Key
            </label>
            <input
                required={true}
                type="text"
                id="key"
                name="key"
                value={inputs.key}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Key..."
            />
            <label htmlFor="address" className="hidden block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Address
            </label>
            <input
            
                required={true}
                type="text"
                id="address"
                name="address"
                value={inputs.address}
                onChange={handleInputChange}
                disabled={true}
                className="hidden mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Application Key..."
            />
        </>
    );

    const renderEcoWittInput = () => (
        <>
            <label htmlFor="key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                App Key
            </label>
            <input
                type="text"
                id="appKey"
                name="appKey"
                value={inputs.appKey}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="App Key..."
            />
            <label htmlFor="key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Key
            </label>
            <input
                type="text"
                id="key"
                name="key"
                value={inputs.key}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Key..."
            />
        </>
    );

    const apiLogo = logos.find(logo => logo.name === selectedApi);

    const renderAPIInput = () => {
        if (selectedApi == 'AmbientWeather') {
            return renderAmbientWeatherInput()
        } else {
            return renderEcoWittInput()
        }
    }

    const handleChangeAPI = () => {
        setformSubmitSuccess(false);
        setSelectedApi('');
    }

    return (    
        <>
            <section id="soil_api_select" className="p-4">
                <span id="validation_text" className="text-error">{validationText}</span>
                {!selectedApi ? (
                    <div id="soil_api_btn_container" className="mx-auto mt-4 bg-brand-black p-4">
                        <TitleMd>Step 2: Select a Soil API</TitleMd>
                        <div className="max-w-sm mx-auto mt-4">
                            {logos.map(logo => (
                                <Button key={logo.name} label={`Connect to ${logo.name}`} onClick={() => handleSelect(logo.name)}>
                                    {logo.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div id="api_input_container" className="mx-auto py-4 px-6 mt-4 bg-brand-black">
                        {apiLogo && (
                            <div className="flex justify-center mb-4">
                                <Image src={apiLogo.src} alt={`${selectedApi} logo`} width={160} height={160} />
                            </div>
                        )}
                        <TitleMd>{selectedApi}</TitleMd>
                        <form onSubmit={handleSoilAPISubmit}>
                            {renderAPIInput()}
                            <Button label="Submit" type="submit">
                                Submit
                            </Button>
                        </form>
                        <ButtonSecondary label="Change API" onClick={handleChangeAPI}>
                            Change Soil API
                        </ButtonSecondary>
                    </div>
                )}
            </section>
        </>

    );

};

export default SoilAPISelect;
