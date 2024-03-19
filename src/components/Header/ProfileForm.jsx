import { Button, Input } from "@mui/base";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AUTH_TOKEN, DOMAIN, phoneNumberRegex } from "../../utils";
import axios from "axios";
import ComponentLoader from "../Loader/ComponentLoader";

const ProfileForm = ({}) => {
  const profileFormInit = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
  };
  const errorsInit = {
    fname: false,
    lname: false,
    phone: false,
    email: false,
  };
  const [form, setForm] = useState({
    ...profileFormInit,
  });
  const [errors, setErrors] = useState(errorsInit);
  const [loading, setLoading] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  console.log(form, "profileFormInit");
  const updateForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const submitForm = async () => {
    if (!form.email.length) {
      toast.error("Email required");
      setErrors({
        ...errors,
        email: true,
      });
      return;
    } else if (!phoneNumberRegex.test(form.phone)) {
      toast.error("Enter a proper phone number ");
      setErrors({
        ...errors,
        email: false,
        phone: true,
      });
      return;
    } else if (!form.fname.length) {
      toast.error("First name required");
      setErrors({
        ...errors,
        email: false,
        phone: false,
        fname: true,
      });
      return;
    } else if (!form.lname) {
      toast.error("Last name required");
      setErrors({
        ...errors,
        email: false,
        phone: false,
        fname: false,
        lname: true,
      });
      return;
    }
    setErrors({
      ...errors,
      email: false,
      phone: false,
      fname: false,
      lname: false,
    });
    const dataToSend = {
      newFields: {
        first_name: form.fname,
        last_name: form.lname,
        phoneNumber: form.phone,
      },
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    };
    console.log(options, "option");
    try {
      setLoading(true);
      const data = await axios.post(
        `${DOMAIN}/users/update-user`,
        dataToSend,
        options
      );
      toast.success(data?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const getData = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    };
    console.log(options, "option");
    try {
      setDataLoader(true);
      const data = await axios.get(`${DOMAIN}/users/profile`, options);
      setForm({
        ...form,
        email: data?.data?.email,
        fname: data?.data?.first_name,
        lname: data?.data?.last_name,
        phone: data?.data?.phoneNumber,
      });
      setDataLoader(false);
    } catch (error) {
      setDataLoader(false);
      toast.error(error?.response?.data?.message);
    }
    return () => {
      setForm({ ...profileFormInit });
    };
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {dataLoader ? (
        <ComponentLoader />
      ) : (
        <div className="grid px-4 pt-4 grid-cols-2  h-[250px] gap-4 gap-y-12">
          <Input
            value={form.fname}
            className={`shadow-lg p-0 h-10 w-full `}
            slotProps={{
              input: {
                className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
                rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
                ${errors.fname && "border border-error"}`,
              },
            }}
            aria-label="Enter your first name"
            // onBlur={() =>
            //   currQuestion.question.length <= 0 &&
            //   setErrors({ ...errors, question: true })
            // }
            placeholder="Enter your first name"
            onChange={(e) => updateForm("fname", e.target.value)}
          />
          <Input
            value={form.lname}
            className={`shadow-lg p-0 h-10 w-full `}
            slotProps={{
              input: {
                className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
                rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
                ${errors.lname && "border border-error"}`,
              },
            }}
            aria-label="Enter your last name"
            // onBlur={() =>
            //   currQuestion.question.length <= 0 &&
            //   setErrors({ ...errors, question: true })
            // }
            placeholder="Enter your last name"
            onChange={(e) => updateForm("lname", e.target.value)}
          />
          <Input
            value={form.phone}
            type="number"
            className={`shadow-lg p-0 h-10 w-full `}
            slotProps={{
              input: {
                className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
                rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
                ${errors.phone && "border border-error"}`,
              },
            }}
            aria-label="Enter your 10 digit phone number"
            // onBlur={() =>
            //   currQuestion.question.length <= 0 &&
            //   setErrors({ ...errors, question: true })
            // }
            placeholder="Enter your 10 digit phone number"
            onChange={(e) => updateForm("phone", e.target.value)}
          />
          <Input
            value={form.email}
            disabled
            className={`shadow-lg p-0 pb-[3.3rem] h-10 w-full `}
            slotProps={{
              input: {
                className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
                rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
                ${errors.email && "border border-error"}`,
              },
            }}
            aria-label="Your email"
            // onBlur={() =>
            //   currQuestion.question.length <= 0 &&
            //   setErrors({ ...errors, question: true })
            // }
            placeholder="Your email"
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
      )}
    </>
  );
};

export default ProfileForm;
