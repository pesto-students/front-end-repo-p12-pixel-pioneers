import { Button, Input } from "@mui/base";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { AUTH_TOKEN, DOMAIN, phoneNumberRegex } from "../../utils";
import axios from "axios";

const ChangePasswordForm = ({}) => {
  const passFormInit = {
    oldPassword: "",
    newPassword: "",
  };
  const errorsInit = {
    oldPassword: false,
    newPassword: false,
  };
  const [form, setForm] = useState({
    ...passFormInit,
  });
  const [errors, setErrors] = useState(errorsInit);
  const [loading, setLoading] = useState(false);
  console.log(form, "profileFormInit");
  const updateForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };
  const submitForm = async () => {
    if (!form.oldPassword.length) {
      toast.error("Current Password required");
      setErrors({
        ...errors,
        oldPassword: true,
      });
      return;
    } else if (!form.oldPassword.length) {
      toast.error("New Password required");
      setErrors({
        ...errors,
        oldPassword: false,
        newPassword: true,
      });
      return;
    }
    setErrors({
      ...errors,
      oldPassword: false,
      newPassword: false,
    });
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    };
    try {
      setLoading(true);
      const data = await axios.post(
        `${DOMAIN}/users/change-password`,
        form,
        options
      );
      toast.success(data?.data?.message);
      setLoading(false);
      console.log(data?.data, "ketan");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex px-4 pt-4  w-4/5 h-[250px] flex-col gap-8">
      <Input
        value={form.oldPassword}
        className={`shadow-lg p-0 h-10 w-full `}
        slotProps={{
          input: {
            className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
                rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
                ${errors.oldPassword && "border border-error"}`,
          },
        }}
        aria-label="Enter your current password"
        // onBlur={() =>
        //   currQuestion.question.length <= 0 &&
        //   setErrors({ ...errors, question: true })
        // }
        placeholder="Enter your current password"
        onChange={(e) => updateForm("oldPassword", e.target.value)}
      />
      <Input
        value={form.newPassword}
        className={`shadow-lg p-0 h-10 w-full `}
        slotProps={{
          input: {
            className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
                rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
                ${errors.newPassword && "border border-error"}`,
          },
        }}
        aria-label="Enter your new password"
        // onBlur={() =>
        //   currQuestion.question.length <= 0 &&
        //   setErrors({ ...errors, question: true })
        // }
        placeholder="Enter your new password"
        onChange={(e) => updateForm("newPassword", e.target.value)}
      />
      <Button
        onClick={() => {
          submitForm();
          //   clearForm();
          //   handleClose();
        }}
        disabled={loading}
        className="mr-2 h-11 border rounded-lg px-4 py-2 border-black"
      >
        {loading ? (
          <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          "Save"
        )}
      </Button>
    </div>
  );
};

export default ChangePasswordForm;
