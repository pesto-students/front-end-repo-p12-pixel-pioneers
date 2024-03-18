import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
import { AI_difficulty_level, question_types } from "./constants";
import { Option, Select, Input, Button, TextareaAutosize } from "@mui/base";
import OptionComponent from "./Option";
import { toast } from "react-toastify";
import PageTitle from "../PageTitle";
const Sidebar = (props) => {
  const location = useLocation();
  const {
    addQuestion,
    currQuestion,
    setCurrQuestion,
    updateQuesIndex,
    updateQues,
    isPoll,
    mode,
    firstQues,
    setQuestions,
  } = props;
  const [allOptionsFilled, setAllOptionsFilled] = useState(false);
  const [errors, setErrors] = useState({
    question: false,
    options: [],
    correct_answer: false,
  });
  // const [question, setQuestion] = useState({
  //   question_type: question_types.MCQ,
  //   question: "",
  //   options: [],
  //   correct_answer: null,
  // });
  const setQuestionState = (key, value) => {
    setCurrQuestion({
      ...currQuestion,
      [key]: Array.isArray(value) ? value.map((item) => item) : value,
    });
  };
  const setOptions = (value, changeIndex) => {
    setCurrQuestion({
      ...currQuestion,
      options: currQuestion.options.map((option, index) => {
        if (index === changeIndex) {
          return value;
        }
        return option;
      }),
    });
  };
  useEffect(() => {
    setOptionErrors();
  }, [currQuestion.question_type]);
  const setOptionErrors = () => {
    if (currQuestion.question_type === question_types.MCQ) {
      setQuestionState("options", ["", "", "", ""]);
      setErrors({ ...errors, options: [false, false, false, false] });
    } else if (currQuestion.question_type === question_types.BOOLEAN) {
      setQuestionState("options", ["TRUE", "FALSE"]);
      setErrors({ ...errors, options: [false, false] });
    } else if (currQuestion.question_type === question_types.POLL) {
      setQuestionState("options", ["", ""]);
      setQuestionState("correct_answer", null);
      setErrors({ ...errors, options: [false, false] });
    }
  };
  // useEffect(() => {
  //   const checkAllOptionsFilled = () => {
  //     let flag = true;
  //     currQuestion.options.forEach((option) => {
  //       if (!option.length) {
  //         flag = false;
  //       }
  //     });
  //     return flag;
  //   };

  //   setAllOptionsFilled(checkAllOptionsFilled());
  // }, [currQuestion.options]);
  // useEffect(() => {
  //   if (currQuestion.question.length <= 0) {
  //     setErrors({ ...errors, question: true });
  //   } else {
  //     setErrors({ ...errors, question: false });
  //   }
  // }, [currQuestion.question]);
  useEffect(() => {
    // setErrors({ ...errors, question: false });
    // setOptionErrors();
  }, []);
  useEffect(() => {
    const checkAllOptionsFilled = () => {
      let flag = true;
      currQuestion.options.forEach((option) => {
        if (!option.length) {
          flag = false;
        }
      });
      return flag;
    };

    setAllOptionsFilled(checkAllOptionsFilled());
  }, [currQuestion.options]);
  const actionBtn = () => {
    if (currQuestion?.question_title?.length <= 0) {
      toast.error("Please enter a valid question");
      setErrors({ ...errors, question: true });
      return;
    } else if (!allOptionsFilled) {
      toast.error("Please fill all options");
      setErrors({
        ...errors,
        question: false,
        correct_answer: false,
        options: errors.options.map((opt, index) =>
          currQuestion.options[index].length <= 0 ? true : false
        ),
      });
      return;
    } else if (hasDuplicateStrings(currQuestion.options)) {
      toast.error("Options cannot be same");
      const arr = findIdenticalIds(currQuestion.options);
      setErrors({
        ...errors,
        options: errors.options.map((item, index) =>
          arr.includes(index) ? true : false
        ),
        question: false,
        correct_answer: false,
      });
      return;
    } else if (
      !currQuestion.correct_answer &&
      currQuestion.correct_answer !== 0
      // !currQuestion.question_type === question_types.POLL
    ) {
      if (currQuestion.question_type !== question_types.POLL) {
        toast.error("Please select a correct answer");
        setErrors({
          ...errors,
          question: false,
          correct_answer: true,
          options: errors.options.map((opt, index) =>
            currQuestion.options[index].length <= 0 ? true : false
          ),
        });
        return;
      }
    }
    if (updateQuesIndex === -1) {
      addQuestion(currQuestion);
    } else {
      updateQues(currQuestion, updateQuesIndex);
    }
    setErrors({
      ...errors,
      options: errors.options.map((item) => false),
      question: false,
      correct_answer: false,
    });
  };

  const generateQuestionsFromAI = async () => {
    const data = {};
    try {
      const response = await axios.post(
        "https://quizzify-4.onrender.com/api/quizs/create-questions",
        data
      );
      //   console.log("Logged In", response);
      // toast.success("Logged in");
      //history.push(APP_ROUTES.HOME);
    } catch (error) {
      // console.log(error.response.data.message);
      // toast.error(error?.response?.data?.message);
      // setLoader(false);
    }
  };

  function findIdenticalIds(strings) {
    const idMap = new Map();

    // Iterate over the strings array to map each string to its index
    strings.forEach((str, index) => {
      if (!idMap.has(str)) {
        idMap.set(str, [index]);
      } else {
        idMap.get(str).push(index);
      }
    });

    // Filter out the IDs of identical strings
    const identicalIds = Array.from(idMap.values()).filter(
      (ids) => ids.length > 1
    );

    // Flatten the array of IDs
    return identicalIds.flat();
  }
  function hasDuplicateStrings(arr) {
    const uniqueSet = new Set(arr);
    return uniqueSet.size !== arr.length;
  }
  console.log(errors, "errors");
  return (
    <div className="w-full flex  flex-col gap-6 justify-start max-w-full scroll-smooth">
      {/* <h1 className="bg-green w-max px-2 font-medium text-5xl text-start">
        {location.pathname === APP_ROUTES.MANUAL_MODE
          ? "Manual Mode"
          : "AI Mode"}
      </h1> */}
      {/* <PageTitle
        text={
          mode === "manual"
            ? "Create"
            : mode === "edit"
            ? "Edit quiz"
            : "AI Mode"
        }
      /> */}
      <h2 className="text-3xl text-start font-medium">Question type</h2>
      <Select
        value={currQuestion.question_type}
        className="w-[280px]  text-start p-2 px-4 shadow-lg"
        onChange={(_, newValue) => setQuestionState("question_type", newValue)}
      >
        <div className="container w-[280px] bg-white cursor-pointer shadow-lg py-4 px-0 ">
          {(!isPoll ||
            firstQues ||
            currQuestion.question_type !== question_types.POLL) && (
            <>
              <Option
                className="hover:bg-slate-200 pl-4"
                value={question_types.MCQ}
              >
                MCQ
              </Option>
              <Option
                className="hover:bg-slate-200 pl-4"
                value={question_types.BOOLEAN}
              >
                True/False
              </Option>
            </>
          )}
          {(isPoll || firstQues) && (
            <Option
              className="hover:bg-slate-200 pl-4"
              value={question_types.POLL}
            >
              Poll
            </Option>
          )}
        </div>
      </Select>
      <h3 className="text-xl text-start">Question</h3>
      <span>
        <Input
          value={currQuestion.question_title}
          className={`shadow-lg p-0 h-10 w-2/3 `}
          slotProps={{
            input: {
              className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
               rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
               ${errors.question && "border border-error"}`,
            },
          }}
          aria-label="Question"
          // onBlur={() =>
          //   currQuestion.question.length <= 0 &&
          //   setErrors({ ...errors, question: true })
          // }
          placeholder="Enter your question"
          onChange={(e) => setQuestionState("question_title", e.target.value)}
        />
        {/* {mode === "manual" ? (
        ) : (
          <TextareaAutosize
            value={currQuestion.question_title}
            onChange={(e) => setQuestionState("question_title", e.target.value)}
            minRows={4}
            className={`shadow-lg  h-10 w-full text-sm font-sans  font-normal leading-5 p-4  m-0
                 rounded-lg  shadow-slate-100 focus-visible:outline-0
                 ${errors.question && "border border-error"}`}
            // slotProps={{
            //   textarea: {
            //     className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
            //      rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
            //      ${errors.question && "border border-error"}`,
            //   },
            // }}
          />
        )} */}
        {/* {errors.question && (
          <p className="text-start text-error mt-3">Please enter Question</p>
        )} */}
      </span>
      <>
        <h3 className="text-xl text-start my-4">Enter your answers</h3>
        <div className=" grid grid-cols-2 gap-4">
          {currQuestion.options.map((option, index) => (
            <OptionComponent
              key={index}
              option={option}
              error={errors.options[index]}
              // onBlur={() =>
              //   setErrors({
              //     ...errors,
              //     options: errors.options.map((opt, ind) => {
              //       console.log({ opt, option, ind, index }, "opt");
              //       if (ind === index) {
              //         if (option.length <= 0) {
              //           return true;
              //         } else {
              //           return false;
              //         }
              //       }
              //       return opt;
              //     }),
              //   })
              // }
              onChange={(val) => setOptions(val, index)}
              // isCorrect={
              //   currQuestion.question_type !== question_types.POLL &&
              //   index === currQuestion.correct_answer
              //     ? true
              //     : false
              // }
              // onClick={() =>
              //   currQuestion.question_type !== question_types.POLL &&
              //   setQuestionState("correct_answer", index)
              // }
            />
          ))}
        </div>
      </>
      {/* <>
          <h3 className="text-xl flex flex-row items-center justify-start gap-4 text-start my-4">
            Please select difficulty level
            <Select
              value={aiModeData.difficulty}
              className="w-[280px]  text-start p-2 px-4 shadow-lg"
              onChange={(_, newValue) =>
                setaiModeData({
                  ...aiModeData,
                  difficulty: newValue,
                })
              }
            >
              <div className="container w-[280px] bg-white cursor-pointer shadow-lg py-4 px-0 ">
                <>
                  {Object.keys(AI_difficulty_level).map((level) => (
                    <Option
                      className="hover:bg-slate-200 pl-4"
                      value={AI_difficulty_level[level]}
                    >
                      {AI_difficulty_level[level]}
                    </Option>
                  ))}
                </>
              </div>
            </Select>
          </h3>

          <h3 className="text-xl text-start my-4">
            Enter keywords for search if any
          </h3>
          <div className=" grid grid-cols-2 gap-4">
            {aiModeData.keywords.map((keyword, index) => (
              <OptionComponent
                key={index}
                option={keyword}
                placeholder={"Enter Keyword"}
                // error={errors.options[index]}
                onChange={(val) => {
                  setaiModeData({
                    ...aiModeData,
                    keywords: aiModeData.keywords.map((keyword, ind) => {
                      if (ind === index) {
                        return val;
                      }
                      return keyword;
                    }),
                  });
                }}
              />
            ))}
          </div>
        </> */}

      <div className="flex gap-4 flex-wrap flex-row justify-start items-center  my-4">
        <input
          type="checkbox"
          name="persist_question"
          className="form-checkbox h-4 w-4 "
          checked={currQuestion.save}
          slotProps={{
            input: {
              className: "",
            },
          }}
          onChange={(e) => setQuestionState("save", e.target.checked)}
        />
        <h3 className="text-xl text-start ">Add question to question bank</h3>
      </div>
      <div className="flex gap-4 flex-wrap flex-row justify-between items-center  my-4">
        {currQuestion.question_type !== question_types.POLL && (
          <>
            <h3 className="text-xl text-start ">Correct Answer:</h3>
            <Select
              value={currQuestion.correct_answer}
              placeholder={"Please Select"}
              disabled={!allOptionsFilled}
              // onBlur={()=>}
              className={`w-[200px] max-w-[200px] text-start p-2 px-4 shadow-lg ${
                errors.correct_answer && " border border-error"
              }
              `}
              onChange={(_, newValue) =>
                setQuestionState("correct_answer", newValue)
              }
            >
              <div className="container w-[200px] bg-white cursor-pointer shadow-lg p-4">
                {currQuestion.options.map((option, index) => (
                  <Option value={index}>{option}</Option>
                ))}
              </div>
            </Select>
          </>
        )}
        <Button
          onClick={actionBtn}
          // disabled={!allOptionsFilled}
          className={"border border-black p-2"}
        >
          {updateQuesIndex === -1 ? "Add Question" : "Update Question"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
