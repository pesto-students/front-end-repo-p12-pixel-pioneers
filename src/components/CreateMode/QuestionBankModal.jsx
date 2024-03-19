import { Button, Input, Modal, Option, Select } from "@mui/base";
import React, { useEffect, useState } from "react";
import { AI_difficulty_level } from "./constants";
import OptionComponent from "./Option";
import { NumberInput } from "@mui/base/Unstable_NumberInput/NumberInput";
import RenderOption from "./RenderOption";
import { toast } from "react-toastify";
import axios from "axios";
import { Quiz_Services } from "../../redux/services";
import { AUTH_TOKEN, DOMAIN } from "../../utils";
import RenderQuestion from "./RenderQuestion";

const QuestionBankModal = ({ open, handleClose, updateQues, existingQues }) => {
  const [form, setForm] = useState({
    topic: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    topic: false,
  });
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState([]);
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
      const url = `${DOMAIN}/questionBank/search?q=${form.topic}`;
      const options = {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      if (options.headers) {
        Object.assign(options.headers, { Accept: "application/json" });
        if (!options.headers.Authorization) {
          options.headers.Authorization = `Bearer ${localStorage.getItem(
            AUTH_TOKEN
          )}`;
        }
      }
      const data = await axios.get(url, options);
      console.log(data?.data, "ketan");
      setQuestions([...data?.data]);
      //   setShowQuestions(true);
      setLoading(false);
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
  const clearData = () => {
    setErrors({
      ...errors,
      topic: false,
    });
    setForm({
      ...form,
      keywords: [],
      topic: "",
    });
    setQuestions([]);
    setSelected([]);
  };
  useEffect(() => {
    return () => {
      clearData();
    };
  }, []);
  function checkDuplicateQuestions(Questions, newData) {
    for (const newQuestion of newData) {
      const idToCheck = newQuestion.id || newQuestion._id; // Treat id and _id as the same
      if (
        Questions.some(
          (existingQuestion) =>
            existingQuestion._id === idToCheck ||
            existingQuestion.id === idToCheck
        )
      ) {
        return true; // If any duplicate found, return true
      }
    }
    return false; // If no duplicates found, return false
  }
  const toggleNumber = (number) => {
    if (selected.includes(number)) {
      setSelected(selected.filter((n) => n !== number));
    } else {
      setSelected([...selected, number]);
    }
  };
  const addQuestionsToQuestionList = () => {
    const filtered = questions.filter((ques, index) =>
      selected.includes(index)
    );
    if (checkDuplicateQuestions(existingQues, filtered)) {
      toast.error("Please remove duplicate questions");
      return;
    }
    updateQues(filtered);
    clearData();
    handleClose();
  };
  return (
    <>
      <Modal
        className="border z-10 bg-white flex items-center  justify-center top-0 absolute w-[100vw] h-[100vh]"
        open={open}
        onClose={handleClose}
      >
        <div className=" py-6 px-4 pl-10 rounded-lg border gap-2 flex items-center overflow-y-auto justify-start flex-col border-black bg-white  h-[700px] w-[800px] ">
          <h1 className="text-3xl pl-2 pr-4 mr-auto table bg-green leading-[4rem]  font-medium  text-start">
            Select from Question Bank
          </h1>
          <div className="my-4 w-5/6 mr-auto flex gap-8 flex-col items-start justify-start">
            <fieldset className="w-full">
              <label className="text-xl mb-8 text-start w-full font-medium">
                Enter topic to search
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
          </div>
          <div className=" flex items-center  justify-start w-full ">
            <Button
              onClick={handleClose}
              className="mr-2 h-11 border rounded-lg px-4 py-2 border-black"
            >
              Cancel
            </Button>
            {questions.length > 0 && (
              <Button
                onClick={addQuestionsToQuestionList}
                className="mr-2 border h-11 rounded-lg px-4 py-2 border-black"
              >
                Add Selected Questions
              </Button>
            )}
            <Button
              className=" px-4 py-2 w-40 h-11 rounded-lg bg-black text-white border-black"
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
                "Search"
              )}
            </Button>
          </div>
          <div className="flex items-center flex-col  justify-start w-full">
            {questions?.map((question, index) => (
              <RenderQuestion
                question_num={index + 1}
                toggleQuestion={() => toggleNumber(index)}
                questionAdded={selected.includes(index)}
                //   deleteQues={deleteQues}
                //   editQuestion={editQuestion}
                question={question}
                // handleOpen={handleOpen}
              />
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuestionBankModal;
