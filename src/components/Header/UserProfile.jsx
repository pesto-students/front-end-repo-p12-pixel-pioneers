import { Button, Input, Modal, Option, Select } from "@mui/base";
import React, { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import LogoutForm from "./LogoutForm";

const UserProfile = ({ open, handleClose, updateQues }) => {
  const tabConst = {
    Profile: 1,
    "Change Password": 2,
    Logout: 3,
  };

  const [tabs, setTabs] = useState(tabConst.Profile);
  const renderRightSide = (tabs) => {
    switch (tabs) {
      case tabConst.Profile:
        return <ProfileForm />;
        break;
      case tabConst["Change Password"]:
        return <ChangePasswordForm />;
        break;
      case tabConst.Logout:
        return <LogoutForm />;
        break;

      default:
        break;
    }
  };
  return (
    <>
      <Modal
        className="border z-10 bg-white flex items-center  justify-center top-0 absolute w-[100vw] h-[100vh]"
        open={open}
        onClose={handleClose}
      >
        <div className=" py-6 px-4 pl-10 rounded-lg border gap-2 flex items-center  justify-between flex-col border-black bg-white  h-[350px] w-[800px] ">
          <div className="grid grid-cols-5">
            <div className="col-span-1 pr-2 flex flex-col items-start justify-start  border-r-2 border-black">
              {Object.keys(tabConst).map((key) => (
                <p
                  className={`leading-8 cursor-pointer ${
                    tabs === tabConst[key] && "text-blue-700"
                  }`}
                  onClick={() => setTabs(tabConst[key])}
                >
                  {key}
                </p>
              ))}
              <Button
                onClick={() => {
                  //   clearForm();
                  handleClose();
                }}
                className="mr-2 h-11 mt-auto border rounded-lg px-4 py-2 border-black"
              >
                Cancel
              </Button>
            </div>
            <div className="col-span-4">{renderRightSide(tabs)}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserProfile;
