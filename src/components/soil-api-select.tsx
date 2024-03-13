import React, { useState } from 'react';
import { Button, ButtonSecondary } from "./ui/button";
import { TitleMd } from "./ui/title";
import { Account } from '@txnlab/use-wallet';
import Image from 'next/image';
import axios from 'axios';

import { AmbientLinkKey } from '@/server/submitAmbientKey';
import { EcowittLinkKey } from '@/server/submitEcoKey';

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
    const [selectedApi, setSelectedApi] = useState('');
    const [formSubmitSuccess, setformSubmitSuccess] = useState(false);
    const [inputs, setInputs] = useState({
        apiKey: '',
        appKey: '',
        email: '',
        password: '',
        mac: '',
        address: account?.address
    });

    const handleSelect = (api: string) => {
        setSelectedApi(api);
        setInputs({
            apiKey: '',
            appKey: '',
            email: '',
            password: '',
            mac: '',
            address: account?.address 
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleSoilAPISubmit = async (event: Event) => {
        event.preventDefault(); // Prevent default form submission
    
        try {
            if (selectedApi === 'EcoWitt') {
                // Submit to EcoWitt
                if(inputs.address !== undefined) {
                    AmbientLinkKey(inputs.apiKey, inputs.address)
                } else {
                    throw Error("no address");
                }
            } else if (selectedApi === 'AmbientWeather') {
                if(inputs.address !== undefined) {
                    EcowittLinkKey(inputs.key, inputs.appKey, inputs.address)
                } else {
                    throw Error("no address");
                }
            } else {
                throw new Error("No API selected");
            }
        } catch (error) {
            console.error("Submission error", error);
            setformSubmitSuccess(false); // Indicate failure
            // Optionally, set error state here to display an error message
        }
    };

    const renderAmbientWeatherInput = () => (
        <>
            <label htmlFor="api_key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                API Key
            </label>
            <input
                type="text"
                id="api_key"
                name="apiKey"
                value={inputs.apiKey}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="API Key..."
            />
            <label htmlFor="appKey" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Application Key
            </label>
            <input
                type="text"
                id="appKey"
                name="appKey"
                value={inputs.appKey}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Application Key..."
            />
        </>
    );

    const renderEcoWittInput = () => (
        <>
            <label htmlFor="api_key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                API Key
            </label>
            <input
                type="text"
                id="api_key"
                name="apiKey"
                value={inputs.apiKey}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="API Key..."
            />
            <label htmlFor="app_key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Application Key
            </label>
            <input
                type="text"
                id="app_key"
                name="appKey"
                value={inputs.appKey}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Application Key..."
            />
            <label htmlFor="mac">
                Mac Address
            </label>
            <input
                type="text"
                id="mac"
                name="mac"
                value={inputs.mac}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Mac Address" />
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
