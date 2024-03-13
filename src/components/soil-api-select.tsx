import React, { useState } from 'react';
import { Button, ButtonSecondary } from "./ui/button";
import { TitleMd } from "./ui/title";
import Image from 'next/image';
import { Account } from '@txnlab/use-wallet';

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
    },
    {
        "name": "WeatherXM",
        "src": "/img/weatherxm-logo.png"
    }
];

const SoilAPISelect = ({ account }: SoilAPISelectProps) => {
    console.log(account)
    const [selectedApi, setSelectedApi] = useState('');
    const [apiFieldsSubmitted, setapiFieldsSubmitted] = useState(false);
    const [inputs, setInputs] = useState({
        apiKey: '',
        appKey: '',
        email: '',
        password: '',
        mac: '',
        address: account?.address
    });

    const handleSelect = (api: any) => {
        setSelectedApi(api);
        // Reset inputs when switching between APIs
        setInputs({
            apiKey: '',
            appKey: '',
            email: '',
            password: '',
            mac: '',
            address: account?.address
        });
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
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
                value={inputs.apiKey}
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

    // const renderWeatherXMInput = () => (
    //     <>
    //         <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
    //             Email
    //         </label>
    //         <input
    //             type="email"
    //             id="email"
    //             name="email"
    //             value={inputs.email}
    //             onChange={handleInputChange}
    //             className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    //             placeholder="Email..."
    //         />
    //         <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
    //             Password
    //         </label>
    //         <input
    //             type="password"
    //             id="password"
    //             name="password"
    //             value={inputs.password}
    //             onChange={handleInputChange}
    //             className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    //             placeholder="Password..."
    //         />
    //     </>
    // );

    const renderApiInput = () => {
        if (account !== null) {
            switch (selectedApi) {
                case 'AmbientWeather':
                    return renderAmbientWeatherInput();
                case 'EcoWitt':
                    return renderEcoWittInput();
                // case 'WeatherXM':
                //     return renderWeatherXMInput();
                default:
                    return null;
            }
        } else {
            return <span>Account is null</span>
        }
    };

    const apiLogo = logos.find(logo => logo.name === selectedApi);

    const handleSoilAPISubmit = async () => {
        // Example validation (very basic, consider more thorough validation based on your needs)
        if (!inputs.apiKey || (selectedApi === 'EcoWitt' && !inputs.appKey)) {
            alert('Please fill in the required fields.');
            return;
        }

        try {
            // Replace 'https://your-backend-service.com/api/config' with your actual endpoint
            if (selectedApi == 'EcoWitt') {
                const response = await fetch('http://localhost:666/api/submitEcokey', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        apiType: selectedApi,
                        ...inputs,

                    }),
                });

                if (response.ok) {
                    // Handle success
                    const data = await response.json();
                    console.log('Submission successful', data);
                    alert('API configuration saved successfully!');

                    // Optionally reset form or redirect user
                    setSelectedApi('');
                    setInputs({
                        apiKey: '',
                        appKey: '',
                        email: '',
                        password: '',
                        mac: '',
                        address: account?.address
                    });
                    setapiFieldsSubmitted(false); // or true, based on your flow

                } else {
                    // Handle server errors or invalid responses
                    throw new Error('Failed to save API configuration.');
                }
            } else if (selectedApi == 'AmbientWeather') {

                const response = await fetch('http://localhost:666/api/submitAmbientKey', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        apiType: selectedApi,
                        ...inputs,

                    }),
                });

                if (response.ok) {
                    // Handle success
                    const data = await response.json();
                    console.log('Submission successful', data);
                    alert('API configuration saved successfully!');

                    // Optionally reset form or redirect user
                    setSelectedApi('');
                    setInputs({
                        apiKey: '',
                        appKey: '',
                        email: '',
                        password: '',
                        mac: '',
                        address: account?.address
                    });
                    setapiFieldsSubmitted(false); // or true, based on your flow

                } else {
                    throw Error("response not okay.");
                }


            } else {
                throw Error("no selectedApi");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred. Please try again.');
        }
        console.log(selectedApi)
        if (account !== null) {
            return (
                <section id="soil_api_select" className="p-4">
                    {!selectedApi ? (
                        <div id="soil_api_btn_container" className="mx-auto mt-4 bg-brand-black p-4">
                            <div className="mx-auto">
                                <TitleMd>Step 2: Select a Soil API</TitleMd>
                                <br />
    
                                <div className="max-w-sm mx-auto">
                                    <Button label="Connect to Ambient Weather" onClick={() => handleSelect('AmbientWeather')}>
                                        AmbientWeather
                                    </Button>
                                    <Button label="Connect to EcoWitt" onClick={() => handleSelect('EcoWitt')}>
                                        EcoWitt
                                    </Button>
                                    {/* <Button label="Connect to WeatherXM" onClick={() => handleSelect('WeatherXM')}>
                                    WeatherXM
                                </Button> */}
                                </div>
    
                            </div>
                        </div>
                    ) : (
                        <div id="api_input_container" className="block mx-auto py-4 px-6 bg-brand-black">
                            {apiLogo && (
                                <div className="flex justify-center mb-4">
                                    <Image
                                        src={apiLogo.src}
                                        alt={`${selectedApi} logo`}
                                        width={160} // Set these values based on your layout needs
                                        height={160}
                                    />
                                </div>
                            )}
                            <TitleMd>{selectedApi}</TitleMd>
                            <p>Please enter the required information for {selectedApi}.</p>
                            <br />
                            {renderApiInput()}
                            <Button label="Submit" onClick={handleSoilAPISubmit}>
                                Submit
                            </Button>
                            <br />
                            <ButtonSecondary label="Change API" onClick={() => setSelectedApi('')}>
                                Change Soil API
                            </ButtonSecondary>
                        </div>
                    )}
                </section>
            );
        } else {
            return (
                <span>
                    account null
                </span>
            )
        }
    };
}
export default SoilAPISelect;
