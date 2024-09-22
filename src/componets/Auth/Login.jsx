import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import axios from 'axios';
import { APP_URL } from '../util';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        setError(""); // Reset any previous error
        try {
            const response = await axios.post(`${APP_URL}/auth/login`, formData, {
                withCredentials: true,
            });

            // Simulating a delay for the loading effect
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userName", response.data.userName);
                navigate("/dashboard");
            }
        } catch (error) {
            setError("Login failed. Please check your credentials.");
            console.log("Login Failed", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleGoRegister = () => {
        navigate('/register');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <motion.div className='bg-white w-full h-full flex justify-center p-36'>
            <div className="h-full px-4 w-full lg:w-[45%] flex flex-col items-center">
                <button onClick={handleGoHome}>Home</button>

                {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

                {loading && <p className="text-gray-700">Logging in, please wait...</p>} {/* Loading message */}

                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Your email"
                            className="w-full h-[40px] border border-gray-300 rounded-md px-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Your password"
                            className="w-full h-[40px] border border-gray-300 rounded-md px-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full h-[40px] bg-red-600 text-white rounded-md hover:bg-red-500"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Logging in...' : 'Login'} {/* Change button text */}
                        </button>
                    </div>

                    <div className='font-thin'>
                        New to Event Community?
                        <button onClick={handleGoRegister} className='text-blue-600'> Register</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default Login;
