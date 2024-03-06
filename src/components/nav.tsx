import React, { useState } from 'react';

// Define the Nav component with TypeScript
const Nav: React.FC = () => {
    // State to manage the menu visibility
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://fryfoundation.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/img/fry-logo.png" className="h-20" alt="Flowbite Logo" />
                </a>
                <button
                    onClick={() => setIsOpen(!isOpen)} // Toggle the isOpen state
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded={isOpen ? "true" : "false"} // Reflect the expanded state
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
                {/* Toggle the class based on isOpen state */}
                <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="#" className="block py-2 px-3 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                        </li>
                        {/* Add more navigation items here */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;