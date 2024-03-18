import { Button, Input, Modal, Option, Select } from "@mui/base";
import React, { useEffect, useState } from "react";
import { AI_difficulty_level } from "./constants";
import OptionComponent from "./Option";
import { NumberInput } from "@mui/base/Unstable_NumberInput/NumberInput";
import RenderOption from "./RenderOption";
import { toast } from "react-toastify";
import axios from "axios";
import { Quiz_Services } from "../../redux/services";

const AI_Modal = ({ open, handleClose, updateQues }) => {
  const [form, setForm] = useState({
    keywords: [""],
    topic: "",
    difficultyLevel: AI_difficulty_level.EASY,
    noOfQuestions: 3,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    topic: false,
  });
  const updateForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };
  const submitForm = async () => {
    if (!form.topic.length) {
      toast.error("Please enter a topic");
      setErrors({
        ...errors,
        topic: true,
      });
      return;
    }
    try {
      setLoading(true);
      const data = await Quiz_Services.generateWithAI(form);
      //   console.log(data?.questions, "ketan");
      //   const questions = data?.questions?.map((question, index) => {
      //     question.question_title = question.question;
      //     question.options = question.choices;
      //     question.correct_answer = question.choices.indexOf(question.answer);
      //     delete question.question;
      //     delete question.choices;
      //     delete question.answer;
      //     return question;
      //   });
      updateQues(data?.questions);
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
    // console.log(data, "KETAN");
    setErrors({
      ...errors,
      topic: false,
    });
  };
  useEffect(() => {
    return () => {
      setErrors({
        ...errors,
        topic: false,
      });
      setForm({
        ...form,
        keywords: [],
        topic: "",
      });
    };
  }, []);
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
          <div className="my-4 w-5/6 mr-auto flex gap-8 flex-col items-center justify-start">
            <fieldset className="w-full">
              <label className="text-xl mb-8 text-start w-full font-medium">
                Enter Topic
              </label>
              <Input
                value={form.topic}
                className={`shadow-lg p-0 h-10 w-full `}
                slotProps={{
                  input: {
                    className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
                rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
                ${errors.topic && "border border-error"}`,
                  },
                }}
                aria-label="Enter your topic"
                // onBlur={() =>
                //   currQuestion.question.length <= 0 &&
                //   setErrors({ ...errors, question: true })
                // }
                placeholder="Enter your topic"
                onChange={(e) => updateForm("topic", e.target.value)}
              />
            </fieldset>
            <div className="grid grid-cols-2 gap-8 w-full">
              <fieldset className="w-full">
                <label className="text-xl mb-9 text-start w-full  font-medium">
                  Select difficulty level
                </label>
                <Select
                  value={form.difficultyLevel}
                  className="w-full relative  text-start p-2 rounded-lg px-4 shadow-lg"
                  slotProps={{
                    //   root: {
                    //     className: `z-50`,
                    //   },
                    popup: {
                      className: `z-50`,
                    },
                  }}
                  onChange={(_, newValue) =>
                    updateForm("difficultyLevel", newValue)
                  }
                >
                  <div className="container w-[350px] z-50 bg-white cursor-pointer shadow-lg py-4 px-0 ">
                    <>
                      {Object.keys(AI_difficulty_level).map((level) => (
                        <Option
                          className="hover:bg-slate-200 py-2 pl-4"
                          value={AI_difficulty_level[level]}
                        >
                          {AI_difficulty_level[level]}
                        </Option>
                      ))}
                    </>
                  </div>
                </Select>
              </fieldset>
              <fieldset className="w-full">
                <label className="text-xl mb-8 text-start w-full font-medium">
                  Enter Number of questions
                </label>
                <NumberInput
                  value={form.noOfQuestions}
                  min={3}
                  max={30}
                  slotProps={{
                    input: {
                      className:
                        "w-full pl-3 rounded-lg h-full focus:outline-none",
                    },
                  }}
                  onChange={(event, val) => updateForm("noOfQuestions", val)}
                  // onChange={(e) => console.log("number", e.target)}
                  className={`shadow-lg rounded-lg h-10 w-full focus:outline-none`}
                />
              </fieldset>
            </div>
            <fieldset className="w-full">
              <label className="text-xl mb-8 text-start w-full font-medium">
                Enter keywords if any
              </label>
              <div className="flex flex-row flex-wrap gap-4">
                {form.keywords.map((keyword, index) => (
                  <OptionComponent
                    key={index}
                    option={keyword}
                    placeholder={"Enter Keyword"}
                    // error={errors.options[index]}
                    onChange={(val) => {
                      setForm({
                        ...form,
                        keywords: form.keywords.map((keyword, ind) => {
                          if (ind === index) {
                            return val;
                          }
                          return keyword;
                        }),
                      });
                    }}
                  />
                ))}
                <div
                  onClick={() =>
                    setForm({
                      ...form,
                      keywords: [...form.keywords, ""],
                    })
                  }
                  className="w-48 flex items-center text-5xl justify-center shadow-lg  box-border  h-10 "
                >
                  +
                </div>
                {/* <OptionComponent
                  option={"+"}
                  onClick={() =>
                    setForm({
                      ...form,
                      keywords: [...form.keywords, ""],
                    })
                  }
                /> */}
              </div>
              {/* <RenderOption option={"+"} /> */}
            </fieldset>
          </div>
          <div className=" flex items-center  justify-start w-full ">
            <Button
              onClick={handleClose}
              className="mr-2 border rounded-lg px-4 py-2 border-black"
            >
              Cancel
            </Button>
            <Button
              className=" px-4 py-2 w-60 rounded-lg bg-black text-white border-black"
              //   onClick={() => deleteQues(question_num - 1)}
              // variant="contained"
              onClick={submitForm}
              // color="primary"
            >
              {loading ? (
                <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AI_Modal;
