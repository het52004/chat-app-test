import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { editSchema } from "../lib/zodCongfig";
import toast from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";

function EditAccount() {
  const { userData } = useAuthStore();
  const { editAccount, isUpdatingAccount } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState({
    userName: userData?.userName || "",
    uniqueName: userData?.uniqueName || "",
    password: "",
    preview: userData?.photoPath || "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    const d = {
      userName: data.userName,
      uniqueName: data.uniqueName,
      password: data.password,
    };
    const result = editSchema.safeParse(d);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(err.message);
      });
    } else {
      editAccount({
        userName: data.userName,
        uniqueName: data.uniqueName,
        password: data.password,
        avatar: avatar,
      });
    }
  }
  function handleChange(e) {
    setAvatar(e.target.files[0]);
    setData({
      ...data,
      preview: URL.createObjectURL(e.target.files[0]) || userData?.photoPath,
    });
  }
  function handleClear() {
    setAvatar(null);
    setData({ ...data, preview: userData?.photoPath || "" });
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="mb-3 mt-4">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div className="modal-action flex flex-wrap items-center justify-between gap-3">
            <form method="dialog">
              <button className="btn btn-primary">Set avatar</button>
            </form>
            <form method="dialog">
              <button className="btn btn-primary" onClick={handleClear}>
                Clear
              </button>
            </form>
            <form method="dialog">
              <button className="btn btn-primary">Back</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
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
                type={showPassword ? "text" : "password"}
                className="grow"
                placeholder="Enter password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
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
            </label>
          </div>
          <div className="modal-action flex gap-3">
            <form method="dialog">
              {isUpdatingAccount ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </form>
            <form method="dialog">
              <button className="btn btn-primary">Back</button>
            </form>
          </div>
        </div>
      </dialog>
      <form className="mt-2 max-w-md w-[700px] xs:w-50 mx-auto p-5 border-3 border-primary border-500 rounded-lg">
        <div className="avatar flex flex-col items-center justify-center">
          <div className="w-24 rounded-full">
            <img src={data.preview} />
          </div>
          <Link
            className="link link-primary link-hover"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Edit avatar?
          </Link>
        </div>
        <div className="relative z-0 w-full mt-4 mb-5 group">
          <input
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={data.userName}
            onChange={(e) => setData({ ...data, userName: e.target.value })}
          />
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            UserName
          </label>
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <input
            type="text"
            name="floating_uname"
            id="floating_uname"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={data.uniqueName}
            onChange={(e) => setData({ ...data, uniqueName: e.target.value })}
          />
          <label
            htmlFor="floating_uname"
            className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6
              peer-focus:dark:text-blue-500 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            UniqueName
          </label>
        </div>
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("my_modal_2").showModal();
            }}
          >
            Submit
          </button>
        </div>
        <Link className="link link-primary link-hover ml-2" to="/profile">
          Back to profile?
        </Link>
      </form>
    </div>
  );
}

export default EditAccount;
