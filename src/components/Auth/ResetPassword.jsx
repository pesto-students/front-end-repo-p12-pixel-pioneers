import React, { useState } from "react";
import { Input } from "@mui/base/Input";
import { useParams } from "react-router";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your API call logic can be added here
  };

  return (
    <div
      className="relative w-screen h-screen flex flex-col justify-center items-center"
      style={{ background: "linear-gradient(to right, #29000F, #00101C)" }}
    >
      <div className="container mx-auto w-96 border-2 border-gray-500 rounded-xl">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Create New Password
            </h1>
          </div>

          <hr className="w-[90%] m-auto h-[0.05rem] bg-gray-500 border-0" />

          <div className="m-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    New Password
                  </label>
                </div>
                <Input
                  type="password"
                  id="password"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Your Password"
                  classes={{
                    root: "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-transparent dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500",
                  }}
                />
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Confirm Password
                  </label>
                </div>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  classes={{
                    root: "w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-transparent dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500",
                  }}
                />
              </div>
              <div className="mb-2">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-violet-600 rounded-xl focus:bg-violet-800 focus:outline-none"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
