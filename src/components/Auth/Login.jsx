import React, { useState } from "react";
import { Button, Input } from "@mui/base";
import quizzifyLogo from "../Home/images/heroImg.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
import { AuthHelpers } from "../../helpers";
import { GoogleLogin } from "@react-oauth/google";
import Icon from "./images/login.png";
//import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email.length <= 0 || !emailRegex.test(form.email)) {
      setErrors({
        ...errors,
        email: true,
      });
      if (!emailRegex.test(form.email)) {
        toast.error("Please enter a valid email");
      }
      return;
    } else if (!form.password.length) {
      toast.error("Please enter password");
      setErrors({
        ...errors,
        email: false,
        password: true,
      });
      return;
    }
    setLoader(true);
    try {
      const response = await axios.post(
        "https://quizzify-4.onrender.com/api/users/login",
        form
      );
      const token = response?.data?.token;
      AuthHelpers.login(token);
      //   console.log("Logged In", response);
      //console.log(response?.data?.message);
      toast.success("Logged in");
      navigate(APP_ROUTES.QUIZZES);
      setLoader(false);
      //history.push(APP_ROUTES.HOME);
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error?.response?.data?.message);
      setLoader(false);
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormChange = (key, e) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className="container w-full h-[96vh] flex justify-center items-center">
      <div className="relative  gap-2 py-4 h-[90%] flex justify-center items-center bg-gradient-to-r from-white-900 to-white-500">
        <div className="mx-auto  h-full w-1/2  rounded-lg ">
          <h1
            onClick={() => navigate(APP_ROUTES.HOME)}
            className="mb-3 py-2 text-4xl font-normal   text-start "
          >
            Quizzify.in
          </h1>
          <h2 className="my-1 font-semibold text-[50px]  text-black text-start ">
            Welcome to Quizzify 👋
          </h2>
          <div className="w-[80%] my-4" background-color="#B9FF66">
            {/* <form onSubmit={handleSubmit}> */}
            <Input
              type="email"
              value={form.email}
              onChange={(e) => handleFormChange("email", e)}
              placeholder="you@company.com"
              className={`shadow-lg my-8  p-0  w-full `}
              slotProps={{
                input: {
                  className: `w-full border text-sm font-sans  font-normal leading-5 p-4  m-0
               rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
               ${errors.email && "border border-error"}
               `,
                },
              }}
              fullwidth
              //   style={{ bgcolor: "#B9FF66" }}
            />
            <Input
              type="password"
              value={form.password}
              onChange={(e) => handleFormChange("password", e)}
              placeholder="Your Password"
              className={`shadow-lg my-3  p-0  w-full `}
              slotProps={{
                input: {
                  className: `w-full border text-sm font-sans  font-normal leading-5 p-4  m-0
               rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0  ${
                 errors.password && "border border-error"
               }
               `,
                },
              }}
              fullwidth
            />
            {/* <button
              type="submit"
              className="w-full px-3 py-4 text-black bg-green rounded-xl focus:bg-lime-600 focus:outline-none"
            >
              Send
            </button> */}
            {/* <Link
              className="text-md  block w-full text-end text-blue-700"
              // to={APP_ROUTES.FORGOT_PASSWORD}
            >
              Forgot Password
            </Link> */}
            <Button
              onClick={handleSubmit}
              disabled={loader}
              className="w-full my-2  px-3 py-4 text-white bg-navyblue rounded-xl focus:bg-lime-600 focus:outline-none"
            >
              {loader ? (
                <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full dark">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
            <Link
              className="text-md  text-end block w-full text-gray-700 mt-2"
              to={APP_ROUTES.REGISTER}
            >
              Don't have an Account?
              <span className="mx-3 text-blue-700">Signup</span>
            </Link>
            {/* </form> */}
          </div>

          {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
        </div>
        <div className="bg-green h-full  w-1/2 flex justify-center items-center ">
          <img src={Icon} className="aspect-square object-contain h-[350px]" />
        </div>
      </div>
    </div>
  );
};

export default Login;
