import { useContext, useState } from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { Input } from "@/components/ui/input";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "@/utils/helper";
import axios from "axios";
import { UserContext } from "@/context/UserContext";

const Signup = () => {
  const { updateUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!fullName) {
      setError("Full name cannot be empty.");
      setLoading(false);
      return;
    }

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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/user/registration",
        { fullName, email, password },
        { withCredentials: true }
      );

      const token = data.accessToken;
      const userInfo = data.user;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(userInfo);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-[100%] h-auto mt-10 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an account</h3>
        <p className="text-xs text-slate-700 mt-3 mb-6">
          Join us today by creating an account. Fill in your details below to
          get started.
        </p>

        <form className="space-y-6" onSubmit={handleSignup}>
          <ProfilePhoto image={profileImage} setImage={setProfileImage} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
            <div className="relative col-span-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
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
            <div className="relative col-span-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />

              <div
                className="absolute top-[32px] right-3 cursor-pointer text-gray-500"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <Button type="submit" className={"w-full"}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Sign Up"}
          </Button>
          <p className="text-xs text-slate-700 mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium cursor-pointer underline hover:opacity-80 transition-opacity duration-200"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
