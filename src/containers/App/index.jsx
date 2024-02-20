import React from "react";
import { ToastContainer } from "react-toastify";
import Routes from "./routes";

import "react-toastify/dist/ReactToastify.css";
const AppContainer = (props) => {
  return (
    <>
      <ToastContainer />
      <Routes />
    </>
  );
};

export default AppContainer;
