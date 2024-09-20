import React from 'react';

const Menu = ({ currentOption, handleSetOption }) => {
    return (
        <div className="relative flex h-[calc(100vh-20rem)] w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700">
            <div className="p-4 mb-2">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Event Dashboard
                </h5>
            </div>
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
               
            <div
                    role="button"
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
                        currentOption === 'profile' ? 'bg-red-400 text-white' : 'hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900'
                    }`}
                    onClick={() => handleSetOption('profile')}
                >
                    Profile
                </div>
               
                <div
                    role="button"
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
                        currentOption === 'hosting' ? 'bg-red-400 text-white' : 'hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900'
                    }`}
                    onClick={() => handleSetOption('hosting')}
                >
                    Hosting
                </div>
                <div
                    role="button"
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
                        currentOption === 'attending' ? 'bg-red-400 text-white' : 'hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900'
                    }`}
                    onClick={() => handleSetOption('attending')}
                >
                    Attending
                </div>
                <div
                    role="button"
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
                        currentOption === 'saved' ? 'bg-red-400 text-white' : 'hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900'
                    }`}
                    onClick={() => handleSetOption('saved')}
                >
                    Saved
                </div>
                <div
                    role="button"
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
                        currentOption === 'pastEvents' ? 'bg-red-400 text-white' : 'hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900'
                    }`}
                    onClick={() => handleSetOption('pastEvents')}
                >
                    Past Events
                </div>
                <div
                    role="button"
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
                        currentOption === 'hostEvent' ? 'bg-red-400 text-white' : 'hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900'
                    }`}
                    onClick={() => handleSetOption('hostEvent')}
                >
                    Host A Event
                </div>
            </nav>
        </div>
    );
};

export default Menu;
