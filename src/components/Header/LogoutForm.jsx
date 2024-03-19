import React from "react";
import { APP_ROUTES, AuthHelpers } from "../../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/base";

const LogoutForm = () => {
  const navigate = useNavigate();
  const logout = (params) => {
    AuthHelpers.logout();
    toast.success("Logged out successfully");
    navigate(APP_ROUTES.LOGIN);
  };
  return (
    <div className="px-4 pt-4   h-[250px] w-full ">
      <Button
        onClick={() => {
          logout();
          //   clearForm();
          //   handleClose();
        }}
        className="mr-2 h-11 border rounded-lg px-4 py-2 border-black"
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutForm;
