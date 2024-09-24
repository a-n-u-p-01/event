import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { APP_URL } from "../util";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`${APP_URL}/auth/signup`, {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            });
            await new Promise((resolve) => setTimeout(resolve, 2000)); 

            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userName", formData.fullName); 
                localStorage.setItem("userId", response.data.userId); 
                console.log(response.data.userId);
                navigate("/dashboard");
            }
        } catch (error) {
            setError("Registration failed. Please try again."); 
            console.log("Registration Failed", error);
        } finally {
            setLoading(false); 
        }
    };

    const handleGoLogin = () => {
        navigate("/login");
    };

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <motion.div className="bg-white font-thin w-full h-full flex justify-center p-36">
            <div className="h-full px-4 w-full lg:w-[45%] flex flex-col items-center">
                <button onClick={handleGoHome} className="font-semibold">Go Home</button>

                {error && <p className="text-red-500">{error}</p>} 

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="w-full h-[40px] border border-gray-300 rounded-md px-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
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
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Your password"
                            className="w-full h-[40px] border border-gray-300 rounded-md px-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full h-[40px] border border-gray-300 rounded-md px-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full h-[40px] bg-red-600 text-white rounded-md hover:bg-red-500"
                            disabled={loading} 
                        >
                            {loading ? "Registering..." : "Register"} 
                        </button>
                    </div>
                    <div className="font-thin">
                        Already have an account?
                        <button onClick={handleGoLogin} className="text-blue-600">
                            {" "}
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default Register;
