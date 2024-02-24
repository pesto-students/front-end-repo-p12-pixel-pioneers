import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
import { question_types } from "./constants";
import { Option, Select, Input, Button } from "@mui/base";
import OptionComponent from "./Option";
const Sidebar = (props) => {
  const location = useLocation();
  const { addQuestion } = props;
  const [question, setQuestion] = useState({
    question_type: question_types.MCQ,
    question: "",
    options: [],
    answerIndex: null,
  });
  const setQuestionState = (key, value) => {
    setQuestion({
      ...question,
      [key]: Array.isArray(value) ? value.map((item) => item) : value,
    });
  };
  const setOptions = (value, changeIndex) => {
    setQuestion({
      ...question,
      options: question.options.map((option, index) => {
        if (index === changeIndex) {
          return value;
        }
        return option;
      }),
    });
  };
  useEffect(() => {
    if (question.question_type === question_types.MCQ) {
      setQuestionState("options", ["", "", "", ""]);
    } else if (question.question_type === question_types.BOOLEAN) {
      setQuestionState("options", ["TRUE", "FALSE"]);
    } else if (question.question_type === question_types.POLL) {
      setQuestionState("options", ["", ""]);
      setQuestionState("answerIndex", null);
    }
  }, [question.question_type]);

  return (
    <div className="w-full flex  flex-col gap-6 justify-start max-w-full scroll-smooth">
      <h1 className="bg-green w-max px-2 font-medium text-5xl text-start">
        {location.pathname === APP_ROUTES.MANUAL_MODE
          ? "Manual Mode"
          : "AI Mode"}
      </h1>
      <h2 className="text-3xl text-start font-medium">Question type</h2>
      <Select
        value={question.question_type}
        className="w-[280px]  text-start p-2 px-4 shadow-lg"
        onChange={(_, newValue) => setQuestionState("question_type", newValue)}
      >
        <div className="container w-[280px] bg-white cursor-pointer shadow-lg p-4">
          <Option value={question_types.MCQ}>MCQ</Option>
          <Option value={question_types.BOOLEAN}>True/False</Option>
          <Option value={question_types.POLL}>Poll</Option>
        </div>
      </Select>
      <h3 className="text-xl text-start">Question</h3>
      <Input
        value={question.question}
        className="shadow-lg p-0 h-10 w-2/3"
        slotProps={{
          input: {
            className:
              "w-full text-sm font-sans  font-normal leading-5 p-4  m-0 rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0",
          },
        }}
        aria-label="Question"
        placeholder="Enter your question"
        onChange={(e) => setQuestionState("question", e.target.value)}
      />
      <h3 className="text-xl text-start my-4">Enter your answers</h3>
      <div className=" grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <OptionComponent
            key={index}
            option={option}
            onChange={(val) => setOptions(val, index)}
            // isCorrect={
            //   question.question_type !== question_types.POLL &&
            //   index === question.answerIndex
            //     ? true
            //     : false
            // }
            // onClick={() =>
            //   question.question_type !== question_types.POLL &&
            //   setQuestionState("answerIndex", index)
            // }
          />
        ))}
      </div>
      <div className="flex gap-4 flex-wrap flex-row justify-between items-center  my-4">
        <h3 className="text-xl text-start ">Correct Answer:</h3>
        <Select
          value={question.answerIndex}
          placeholder={"Please Select"}
          className="w-[200px] max-w-[200px] text-start p-2 px-4 shadow-lg"
          onChange={(_, newValue) => setQuestionState("answerIndex", newValue)}
        >
          <div className="container w-[200px] bg-white cursor-pointer shadow-lg p-4">
            {question.options.map((option, index) => (
              <Option value={index}>{option}</Option>
            ))}
          </div>
        </Select>
        <Button
          onClick={() => addQuestion(question)}
          className="border border-black p-2"
        >
          Add Question
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
