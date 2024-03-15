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
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();

    setLoader(true);
    try {
      const response = await axios.post(
        "https://quizzify-4.onrender.com/api/users/login",
        { email, password }
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className="relative gap-2 py-4 h-[96vh] flex justify-center items-center bg-gradient-to-r from-white-900 to-white-500">
      <div className="mx-auto border h-full w-1/2  rounded-lg ">
        <h1 className="mb-3 py-2 text-4xl font-normal   text-start ">
          Quizzify.in
        </h1>
        <h2 className="my-1 font-semibold text-[50px]  text-black text-start ">
          Welcome to Quizzify 👋
        </h2>
        <div className="mb-2 flex justify-center py-2">
          {/* <Button
              variant="contained"
              color="primary"
              startIcon={<FcGoogle />}
              className="my-4"
              // onClick={handleGoogleLogin}
            >
              Login with Google
            </Button> */}
        </div>
        <div className="mx-10 my-4" background-color="#B9FF66">
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              value={email}
              required
              onChange={handleEmailChange}
              placeholder="you@company.com"
              className={`shadow-lg my-8  p-0  w-full `}
              slotProps={{
                input: {
                  className: `w-full border text-sm font-sans  font-normal leading-5 p-4  m-0
               rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
               `,
                },
              }}
              fullwidth
              //   style={{ bgcolor: "#B9FF66" }}
            />
            <Input
              type="password"
              value={password}
              required
              onChange={handlePasswordChange}
              placeholder="Your Password"
              className={`shadow-lg my-6  p-0  w-full `}
              slotProps={{
                input: {
                  className: `w-full border text-sm font-sans  font-normal leading-5 p-4  m-0
               rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
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
            <Button
              onClick={handleSubmit}
              className="w-full my-2 px-3 py-4 text-black bg-green rounded-xl focus:bg-lime-600 focus:outline-none"
            >
              {loader ? (
                <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full dark">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
            <p>
              <Link
                className="text-md  text-center text-gray-400 mt-8"
                to={APP_ROUTES.REGISTER}
              >
                Don't have an Account?
                <span className="mx-3 text-gray-500">Signup</span>
              </Link>
            </p>
            <p>
              <Link
                className="text-md  text-center text-gray-400 mt-8"
                to={APP_ROUTES.FORGOT_PASSWORD}
              >
                Forgot Password
              </Link>
            </p>
          </form>
        </div>

        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
      <div className="bg-green h-full  w-1/2 flex justify-center items-center ">
        <img
          src={Icon}
          className="w-full aspect-square object-contain h-[500px]"
        />
      </div>
    </div>
  );
};

export default Login;
