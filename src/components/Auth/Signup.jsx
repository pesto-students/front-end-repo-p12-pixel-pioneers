import React, { useState } from "react";
import { Input } from "@mui/base";
import axios from "axios";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
//import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        "https://quizzify-4.onrender.com/api/users/register",
        { email: data.email, password: data.password }
      );
      //console.log(response.data.message);
      //   console.log("User registered successfully", response);
      const token = response?.data?.token;
      AuthHelpers.login(token);
      setLoader(false);
      // toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      console.log("User registation  unsuccessfull");
      setLoader(false);
      //toast.error(error.response.data.message);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleChange = (key, val) => {
    setData({ ...data, [key]: val });
  };

  return (
    <div className="relative py-4 h-[96vh] flex justify-center items-center bg-gradient-to-r from-white-900 to-white-500">
      <div className="container mx-auto w-96 border shadow-xl rounded-xl p-8">
        <div className="max-w-md mx-auto my-0">
          <h1 className="my-3 px-4 py-2 text-5xl table mx-auto font-semibold text-white  text-center bg-[#B9FF66]">
            Quizzify
          </h1>
          <h4 className="my-1 font-medium text-2xl  text-black text-center ">
            Register
          </h4>
          <div className="mb-2 flex justify-center py-2"></div>
          <hr className="w-[90%] m-auto h-[0.05rem] bg-gray-500 border-0" />
          <div className="m-7">
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-6 mt-6">
                {/* <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Email Address
                </label> */}
                <Input
                  id="email"
                  required
                  value={data.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@company.com"
                  fullWidth
                  className={`shadow-lg my-8  p-0 h-9 w-full `}
                  slotProps={{
                    input: {
                      className: `w-full border text-sm font-sans  font-normal leading-5 p-4  m-0
               rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
               `,
                    },
                  }}
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                {/* <label
                  htmlFor="password"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Password
                </label> */}
                <Input
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  placeholder="Your Password"
                  fullWidth
                  className={`shadow-lg my-8  p-0 h-9 w-full `}
                  slotProps={{
                    input: {
                      className: `w-full border text-sm font-sans  font-normal leading-5 p-4  m-0
               rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
               `,
                    },
                  }}
                />
                <Input
                  type="confirm password"
                  id="confirm_password"
                  value={data.confirm_password}
                  onChange={(e) =>
                    handleChange("confirm_password", e.target.value)
                  }
                  required
                  placeholder="Confirm Password"
                  fullWidth
                  className={`shadow-lg my-8  p-0 h-9 w-full `}
                  slotProps={{
                    input: {
                      className: `w-full border text-sm font-sans  font-normal leading-5 p-4  m-0
               rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
               `,
                    },
                  }}
                />
              </div>

              {/* Register Button */}
              <div className="mb-2">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-black bg-green rounded-xl focus:bg-lime-600 focus:outline-none"
                >
                  {loader ? (
                    <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full dark">
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>

              {/* Login Link */}

              <Link
                className="text-md text-center text-gray-400 mt-4"
                to={APP_ROUTES.LOGIN}
              >
                Already a user,
                <span className="mx-3 text-gray-500">Login</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
