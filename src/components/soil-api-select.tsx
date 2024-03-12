import React, { useState } from 'react';
import { Button, ButtonSecondary } from "./button";
import { TitleMd } from "./title";

const SoilAPISelect = () => {
    const [selectedApi, setSelectedApi] = useState('');
    const [inputs, setInputs] = useState({
        apiKey: '',
        appKey: '',
        email: '',
        password: ''
    });

    const handleSelect = (api) => {
        setSelectedApi(api);
        // Reset inputs when switching between APIs
        setInputs({
            apiKey: '',
            appKey: '',
            email: '',
            password: ''
        });
    };

    const handleInputChange = (event) => {
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
                App Key
            </label>
            <input
                type="text"
                id="app_key"
                name="appKey"
                value={inputs.appKey}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="App Key..."
            />
        </>
    );

    const renderWeatherXMInput = () => (
        <>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Email
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Email..."
            />
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Password
            </label>
            <input
                type="password"
                id="password"
                name="password"
                value={inputs.password}
                onChange={handleInputChange}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Password..."
            />
        </>
    );

    const renderApiInput = () => {
        switch (selectedApi) {
            case 'AmbientWeather':
                return renderAmbientWeatherInput();
            case 'EcoWitt':
                return renderEcoWittInput();
            case 'WeatherXM':
                return renderWeatherXMInput();
            default:
                return null;
        }
    };

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
                            <Button label="Connect to WeatherXM" onClick={() => handleSelect('WeatherXM')}>
                                WeatherXM
                            </Button>
                        </div>

                    </div>
                </div>
            ) : (
                <div id="api_input_container" className="block max-w-md mx-auto py-4 px-6">
                    <TitleMd>{selectedApi}</TitleMd>
                    <p>Please enter the required information for {selectedApi}.</p>
                    <br />
                    {renderApiInput()}
                    <Button label="Submit" onClick={() => console.log('Inputs:', inputs)}>
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
};

export default SoilAPISelect;
