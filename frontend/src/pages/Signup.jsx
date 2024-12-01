import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { schema } from "../lib/zodCongfig";
import { Eye, EyeClosed } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [userName, setUsername] = useState();
  const [uniqueName, setUniquename] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [otp, setOtp] = useState();
  const { signup, isSigningUp, verifyOtp, showOtpInput, setShowOtpInput } =
    useAuthStore();

  function handleSubmit(e) {
    e.preventDefault();
    const data = { userName, uniqueName, email, password };
    const result = schema.safeParse(data);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(err.message);
      });
    } else {
      signup({ userName, uniqueName, password, email, avatar });
    }
  }
  function handleChange(e) {
    setAvatar(e.target.files[0]);
  }
  return (
    <div className="flex items-center justify-center h-screen">
      {!showOtpInput ? (
        <form className="mt-5 max-w-md w-[700px] xs:w-50 mx-auto p-5 border-3 border-primary border-500 rounded-lg">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              UserName
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_uname"
              id="floating_uname"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setUniquename(e.target.value)}
            />
            <label
              htmlFor="floating_uname"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6
              peer-focus:dark:text-blue-500 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              UniqueName
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 flex items-center w-full group">
            <input
              type={showPassword ? "text" : "password"}
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            />
            {!showPassword ? (
              <EyeClosed
                className="cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            )}
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="mb-3 mt-4">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            {!isSigningUp ? (
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <span className="loading loading-dots loading-lg"></span>
            )}
            <button
              className="link link-primary"
              onClick={() => setShowOtpInput(true)}
            >
              Already have OTP?
            </button>
          </div>
          Already a user?
          <Link className="link link-primary link-hover ml-2" to="/">
            Login
          </Link>
        </form>
      ) : (
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Enter your OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>
          <div className="flex flex-col items-center">
            <button
              className="link link-primary mt-3 mb-3"
              onClick={() => setShowOtpInput(false)}
            >
              Back to signup
            </button>
            {!isSigningUp ? (
              <button
                type="submit"
                className="btn btn-primary h-[9px] w-[130px] mt-3"
                onClick={() => verifyOtp(otp)}
              >
                Submit OTP
              </button>
            ) : (
              <span className="loading loading-dots loading-lg mt-3"></span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
