import React, { useState } from "react";
import { Button } from "@mui/base";
import { Input } from "@mui/base";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="relative py-4 h-[96vh] flex justify-center items-center bg-gradient-to-r from-white-900 to-white-500">
      <div className="container mx-auto w-96 border shadow-xl rounded-xl p-8">
        <div className="max-w-md mx-auto my-00">
          <h1 className="my-3 px-4 py-2 text-5xl table mx-auto font-semibold text-white  text-center bg-[#B9FF66]">
            Quizzify
          </h1>
          <h4 className="my-1 font-medium text-2xl  text-black text-center ">
            Register
          </h4>

          <hr className="w-[90%] m-auto h-[0.05rem] bg-gray-500 border-0" />

          <div className="m-7">
            <form onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="mb-6 mt-6">
                <Input
                  type="email"
                  id="email"
                  value={email}
                  required
                  onChange={handleEmailChange}
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

              {/* Submit button */}
              <div className="mb-2">
                <div className="mb-2">
                  <button
                    type="submit"
                    className="w-full px-3 py-4 text-black bg-green rounded-xl focus:bg-lime-600 focus:outline-none"
                  >
                    Send
                  </button>
                </div>
                {/* <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Send
                </Button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
