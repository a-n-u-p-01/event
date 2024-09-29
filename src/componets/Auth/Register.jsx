import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { APP_URL } from "../util";
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Import an icon for the checkmark

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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordValidationError, setPasswordValidationError] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false); 
    const [isPasswordMatched,setIsPasswordMatched] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "password") {
            validatePassword(value);
        }
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasUppercase = /[A-Z]/;
        const hasLowercase = /[a-z]/;
        const hasSpecialChar = /[!@#$%^&*]/;
        let errorMsg = "";

        if (password.length < minLength) {
            errorMsg = "Password must be at least 8 characters long.";
        } else if (!hasNumber.test(password)) {
            errorMsg = "Password must contain at least one number.";
        } else if (!hasUppercase.test(password)) {
            errorMsg = "Password must contain at least one uppercase letter.";
        } else if (!hasLowercase.test(password)) {
            errorMsg = "Password must contain at least one lowercase letter.";
        } else if (!hasSpecialChar.test(password)) {
            errorMsg = "Password must contain at least one special character.";
        }

        setPasswordValidationError(errorMsg);
        setIsPasswordValid(errorMsg === ""); // Set validity based on error message
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (passwordValidationError) {
            alert(passwordValidationError);
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

    const handleGoogleLogin = () => {
        // Redirect to backend OAuth2 Google login
        window.location.href = `${APP_URL}/oauth2/authorization/google`;
      };

    return (
        <motion.div className="bg-white font-thin w-full h-full flex justify-center p-36">
            <div className="h-full px-4 w-full lg:w-[45%] flex flex-col items-center">
                <button onClick={handleGoHome} className="font-semibold">Go Home</button>

                {error && <p className="text-red-500">{error}</p>} 
                {passwordValidationError && <p className="text-red-500">{passwordValidationError}</p>}

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700">Name</label>
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
                        <label htmlFor="email" className="block text-gray-700">Email</label>
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
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Your password"
                                className="w-full h-[40px] border border-gray-300 rounded-md px-2"
                                required
                            />
                            <button 
                                type="button" 
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                            {isPasswordValid && (
                                <AiOutlineCheckCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full h-[40px] border border-gray-300 rounded-md px-2"
                                required
                            />
                            <button 
                                type="button" 
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
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
                            {" "}Login
                        </button>
                    </div>
                </form>
                    {/* Google OAuth Login */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-96 h-[40px] gap-2 bg-white text-black rounded-md hover:bg-gray-200 flex items-center justify-center"
          >
             <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
            Continue with Google
          </button>
        </div>
    
            </div>
        </motion.div>
    );
};

export default Register;
