import React from 'react';

const Menu = ({ currentOption, handleSetOption }) => {
    return (
        <div className="relative flex h-[calc(100vh-20rem)] w-full max-w-[20rem] flex-col rounded-xl bg-white p-4 text-gray-700">
            <div className="p-4 mb-2">
                <h5 className="block font-sans text-xl font-semibold text-blue-gray-900">
                    Event Dashboard
                </h5>
            </div>
            <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                {['profile', 'hosting', 'booked', 'hostEvent','hosted'].map((option) => (
                    <div
                        key={option}
                        role="button"
                        className={`menu-item flex items-center w-full p-3 rounded-lg ${
                            currentOption === option ? 'bg-red-400 text-white' : ' hover:text-red-600'
                        }`}
                        onClick={() => handleSetOption(option)}
                    >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Menu;
