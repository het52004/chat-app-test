import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";
import { loginSchema } from "../lib/zodCongfig";
import { Link } from "react-router-dom";

function Login() {
  const [uniqueName, setUniquename] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, login } = useAuthStore();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { uniqueName, password };
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(err.message);
      });
    } else {
      login({ uniqueName, password });
    }
  }
  return (
    <div className="flex items-center justify-center h-full">
      <form className="max-w-md mx-auto border-3 border-primary border-500 p-5 rounded-lg">
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setUniquename(e.target.value)}
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              UniqueName
            </label>
          </div>
          <div className="relative z-0 flex items-center w-full mb-5 group">
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
        </div>
        <div className="flex items-center mb-4">
          {!isLoggingIn ? (
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
        </div>
        New to LetsChat?
        <Link className="link link-primary link-hover ml-2" to="/signup">
          Create a new account
        </Link>
      </form>
    </div>
  );
}

export default Login;
