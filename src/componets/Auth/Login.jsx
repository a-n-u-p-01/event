import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import axios from 'axios'; // Make sure to import axios
import { APP_URL } from '../util';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${APP_URL}/auth/login`, formData, {
          withCredentials: true,
        });
        if (response.data?.token) {
         
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        }
      } catch (error) {
        console.log("Login Failed", error);
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

          <div className="flex flex-col justify-center items-center">
            <p className="my-1 text-sm text-gray-700">
              Enter your email and password to access your account
            </p>
          </div>

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
              >
                Login
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
