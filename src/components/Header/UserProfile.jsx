import { Button, Input, Modal, Option, Select } from "@mui/base";
import React, { useEffect, useState } from "react";

const UserProfile = ({ open, handleClose, updateQues }) => {
  //   const [form, setForm] = useState({
  //     keywords: [""],
  //     topic: "",
  //     noOfQuestions: 3,
  //   });
  //   const [t, setForm] = useState({
  //     keywords: [""],
  //     topic: "",
  //     noOfQuestions: 3,
  //   });
  return (
    <>
      <Modal
        className="border z-10 bg-white flex items-center  justify-center top-0 absolute w-[100vw] h-[100vh]"
        open={open}
        onClose={handleClose}
      >
        <div className=" py-6 px-4 pl-10 rounded-lg border gap-2 flex items-center  justify-between flex-col border-black bg-white  h-[600px] w-[800px] ">
          <h1 className="text-2xl pl-2 pr-4 mr-auto table bg-green leading-[5rem]  font-medium  text-start">
            Generate quiz with AI
          </h1>
        </div>
      </Modal>
    </>
  );
};

export default UserProfile;
