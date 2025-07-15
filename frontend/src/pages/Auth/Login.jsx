/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import { LoaderCircle } from "lucide-react";
import { validateEmail } from "@/utils/helper";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import api from "@/utils/axiosInstance";

const Login = () => {
  const { updateUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Password cannot be empty.");
      setLoading(false);
      return;
    }

    setError(null);

    try {
      const { data } = await api.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );

      const userInfo = data.user;
      const token = data.accessToken;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(userInfo);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <div className="w-3/4 h-3/4 mg:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-3 mb-6">
          Please enter your details to login
        </p>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="w-full">
            <label className="text-[14px] text-slate-800">Email</label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative w-full">
            <label className="text-sm text-slate-800 block mb-1">
              Password
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <div
              className="absolute top-[32px] right-3 cursor-pointer text-gray-500"
              onClick={togglePassword}
            >
              {showPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <Button type="submit" className={"w-full"}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Login"}
          </Button>
          <p className="text-xs text-slate-700 mt-2">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium cursor-pointer underline hover:opacity-80 transition-opacity duration-200"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
