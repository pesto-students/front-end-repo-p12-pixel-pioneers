import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
const BackIcon = ({ className }) => {
  let navigate = useNavigate();
  console.log(navigate);
  const goBackOrRedirect = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate(APP_ROUTES.HOME);
    }
  };
  return (
    <div>
      <IoArrowBack
        className={"ml-4 w-8 h-8 cursor-pointer" + className}
        onClick={goBackOrRedirect}
      />
    </div>
  );
};

export default BackIcon;
