import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { div } from 'framer-motion/client';

export const Profile = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loggingOut,setLoggingOut] = useState(false);

    const navigate = useNavigate();
    const dropdownRef = useRef(null) 

    const handleToggleDropdown = () => {
      setIsDropdownOpen(prev => !prev);
    };

    const handleGoDashboard = () => {
        setIsDropdownOpen(false);
        navigate('/dashboard');
    };

    const handleLogout = () => {
        setLoggingOut(true)
        setTimeout(() => {
            setLoggingOut(false)
            console.log( localStorage.getItem('userId'))
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('userId');
            console.log( localStorage.getItem('userId'))
            navigate('/login');
        }, 500); 
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        loggingOut ?
        <div className='font-normal'>Logging out, please wait...</div> :
        <div className="relative font-[sans-serif] w-max mx-auto" ref={dropdownRef}>
            <button
                type="button"
                id="dropdownToggle"
                className="px-4 py-2 flex items-center rounded-full text-slate-400 text-sm outline-none"
                onClick={handleToggleDropdown}
               
            >
                <CgProfile className="w-5 h-5 mr-1 rounded-full shrink-0 text-red-600" />
                {localStorage.getItem("userName")}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-700 inline ml-3" viewBox="0 0 24 24">
                    <path
                        fillRule="evenodd"
                        d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/*Dropdown menu list*/}
            {isDropdownOpen && (
                <ul
                    id="dropdownMenu"
                    className="absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto"
                >
                    <li
                        className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                        onClick={handleGoDashboard}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3" viewBox="0 0 512 512">
                            <path
                                d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                            />
                        </svg>
                        Dashboard
                    </li>
                    <li
                        className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                        onClick={handleLogout}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3" viewBox="0 0 512 512">
                            <path
                                d="M444 32H68c-13.3 0-24 10.7-24 24v400c0 13.3 10.7 24 24 24h376c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24zM68 16h376c22.1 0 40 17.9 40 40v400c0 22.1-17.9 40-40 40H68c-22.1 0-40-17.9-40-40V56c0-22.1 17.9-40 40-40zm251.8 135.8l-66.6 66.7c-3.1 3.1-8.1 3.1-11.3 0-3.1-3.1-3.1-8.1 0-11.3l55.2-55.2H38c-4.4 0-8 3.6-8 8s3.6 8 8 8h226.6l-55.2 55.2c-3.1 3.1-3.1 8.1 0 11.3 3.1 3.1 8.1 3.1 11.3 0l66.6-66.7c3.1-3.1 3.1-8.1 0-11.3l-66.6-66.7c-3.1-3.1-8.1-3.1-11.3 0z"
                            />
                        </svg>
                        Logout
                    </li>
                </ul>
            )}

        </div>
    );
};
