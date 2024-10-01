import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { APP_URL } from "../util";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${APP_URL}/auth/login`, formData, {
        withCredentials: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${APP_URL}/oauth2/authorization/google`;
  };

  const handleGoRegister = () => {
    navigate("/register");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <motion.div className="bg-white w-full h-full font-thin flex justify-center p-36">
      <div className="h-full px-4 w-full lg:w-[45%] flex flex-col items-center">
        <button onClick={handleGoHome} className="font-semibold">
          Go Home
        </button>

        {error && <p className="text-red-500">{error}</p>}

        {loading && <p className="text-gray-700">Please wait...</p>}

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="Your password"
                className="w-full h-[40px] border border-gray-300 rounded-md px-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full h-[40px] bg-red-600 text-white rounded-md hover:bg-red-500"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="font-thin">
            New to Event Community?
            <button onClick={handleGoRegister} className="text-blue-600">
              {" "}
              Register
            </button>
          </div>
        </form>

        {/* Google OAuth Login */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-[33rem] h-[40px] gap-2 bg-zinc-700/5 text-black rounded-md hover:bg-gray-200 flex items-center justify-center"
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              className="h-6 w-6"
            />
            Login with Google
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
