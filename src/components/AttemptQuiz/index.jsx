import React, { useEffect, useState } from "react";
import PageTitle from "../PageTitle";
import { Button, Input } from "@mui/base";
import RenderQuestion from "../CreateMode/RenderQuestion";
import RenderOption from "../CreateMode/RenderOption";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ROUTES, DOMAIN } from "../../utils";
import axios from "axios";
import ComponentLoader from "../Loader/ComponentLoader";
const SCREEN_CONST = {
  FIRST: -1,
  LAST: -2,
};
const AttemptQuiz = (props) => {
  const [questionIndex, setQuestionIndex] = useState(SCREEN_CONST.FIRST);
  const [answers, setAnswers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [quizloader, setQuizLoader] = useState(false);
  let navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({
    email: "",
    answers: [],
  });
  const [quiz, setQuiz] = useState(null);
  const [errors, setErrors] = useState({
    email: "",
  });

  const submitQuiz = async () => {
    const dataToSend = {
      email: data.email,
      answers: answers,
    };
    setLoader(true);
    try {
      await axios.post(`${DOMAIN}/quizs/${params.id}/user_answers`, dataToSend);
      setQuestionIndex(SCREEN_CONST.LAST);
      setLoader(false);
    } catch (error) {
      toast.error("Error!!");
      setLoader(false);
    }
  };
  const getQuizData = async () => {
    setQuizLoader(true);
    try {
      const res = await axios.get(`${DOMAIN}/quizs/excludeAns/${params.id}`);
      console.log(res, "result");
      setQuiz(res.data);
      setQuizLoader(false);
    } catch (error) {
      toast.error("Error!!");
      setQuizLoader(false);
    }
  };
  //   useEffect(() => {
  // }, []);
  const startQuiz = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email.length <= 0 || !emailRegex.test(data.email)) {
      setErrors({
        ...errors,
        email: true,
      });
      if (!emailRegex.test(data.email)) {
        toast.error("Please enter a valid email");
      }
      return;
    }
    getQuizData();
    setErrors({
      ...errors,
      email: false,
    });
    setQuestionIndex(0);
  };
  console.log(questionIndex, "quiz.questions[questionIndex]");

  const pickAnswer = (index) => {
    if (answers[questionIndex] || answers[questionIndex] === 0) {
      setAnswers(
        answers.map((ans, ind) => {
          if (questionIndex === ind) {
            return index;
          }
          return ind;
        })
      );
    } else {
      setAnswers([...answers, index]);
    }
  };
  const checkOptionPicked = (params) => {
    if (answers[questionIndex] || answers[questionIndex] === 0) {
      return true;
    }
    return false;
  };
  const renderComponent = () => {
    if (questionIndex === -2) {
      return (
        <div className=" flex w-full flex-col items-center justify-center h-[150px]">
          <h2 className="font-medium text-2xl text-center">
            Thank you for your response
          </h2>
          <Button
            onClick={() => navigate(APP_ROUTES.HOME)}
            // disabled={!allOptionsFilled}
            className={"border border-black py-2 px-6 mx-auto mt-8 rem"}
          >
            Go to Home
          </Button>
        </div>
      );
    } else if (questionIndex === -1) {
      return (
        <>
          <PageTitle noBackBtn={true} text="ATTEMPT QUIZ" />
          <Input
            value={data.email}
            className={`shadow-lg p-0 h-10 w-2/3 mx-auto `}
            slotProps={{
              input: {
                className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
               rounded-lg border focus-visible:outline-0
               ${errors.email && "border border-error"}`,
              },
            }}
            aria-label="Enter email"
            // onBlur={() =>
            //   currQuestion.question.length <= 0 &&
            //   setErrors({ ...errors, question: true })
            // }
            placeholder="Enter your Email Id"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Button
            onClick={startQuiz}
            // disabled={!allOptionsFilled}
            className={"border border-black py-2 px-6 mx-auto mt-8 rem"}
          >
            Proceed
          </Button>
        </>
      );
    } else {
      const question = quiz?.questions?.[questionIndex];
      return (
        <>
          {quizloader ? (
            <ComponentLoader />
          ) : (
            <div className="w-full">
              <h2 className="font-normal text-start my-6 text-2xl">
                Question {questionIndex + 1} : {question.question_title}
              </h2>
              <div className="options">
                {question.options.map((option, index) => (
                  <RenderOption
                    key={index}
                    isAnswer={answers[questionIndex] === index}
                    option={option}
                    actionFn={() => pickAnswer(index)}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                {questionIndex > 0 && (
                  <Button
                    onClick={() => {
                      //   if (!checkOptionPicked()) {
                      //     toast.error("Select an option");
                      //     return;
                      //   }
                      questionIndex > 0 && setQuestionIndex(questionIndex - 1);
                    }}
                    // disabled={!allOptionsFilled}
                    className={
                      "border  font-medium border-black py-2 px-6 mr-auto mt-8 rem"
                    }
                  >
                    Previous
                  </Button>
                )}

                <Button
                  onClick={() => {
                    if (!checkOptionPicked()) {
                      toast.error("Select an option");
                      return;
                    }
                    if (questionIndex === quiz.questions.length - 1) {
                      submitQuiz();
                      return;
                    }
                    setQuestionIndex(questionIndex + 1);
                  }}
                  // disabled={!allOptionsFilled}
                  className={
                    "border border-green font-medium bg-green  py-2 px-6 ml-auto mt-8 rem"
                  }
                >
                  {loader ? (
                    <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark">
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : questionIndex < quiz.questions.length - 1 ? (
                    "Next"
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          )}
        </>
      );
    }
  };
  return (
    <div className="w-[80%] border p-8 min-h-fit flex flex-col items-start gap-8 justify-start rounded-lg shadow-lg ">
      {renderComponent()}
    </div>
  );
};

export default AttemptQuiz;
