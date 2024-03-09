import { Button, Input } from "@mui/base";
import React, { useState } from "react";
import RenderQuestion from "./RenderQuestion";
import { useSelector } from "react-redux";
import { API_CONSTANTS } from "../../utils";

const QuestionsList = (props) => {
  const {
    questions,
    submitAction,
    deleteQues,
    editQuestion,
    quizName,
    setQuizName,
  } = props;

  const quizSelector = useSelector((state) => state.quiz.quiz);
  const editQuizSelector = useSelector((state) => state.quiz.editQuiz);
  const [modalTrigger, setModalTrigger] = useState(true);
  console.log(editQuizSelector, "editQuizSelector");
  return (
    <>
      <div className="flex flex-row justify-between">
        <Input
          value={quizName}
          className={` p-0 h-10 w-2/3 `}
          slotProps={{
            input: {
              className: `w-full text-sm font-sans  font-normal leading-5 p-4  m-0
               rounded-lg border focus-visible:outline-0
               ${quizName?.length <= 0 && "border border-error"}`,
            },
          }}
          aria-label="Question"
          placeholder="Enter your question"
          onChange={(e) => setQuizName(e.target.value)}
        />
        <Button
          onClick={() => submitAction()}
          className="py-1 px-4 flex min-w-24 items-center justify-center border rounded-sm relative border-black border-1"
        >
          {quizSelector.status === API_CONSTANTS.loading ||
          editQuizSelector.status === API_CONSTANTS.loading ? (
            <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            " Save Quiz"
          )}
        </Button>
      </div>
      <h1 className="text-3xl my-8 text-start font-medium">Questions </h1>
      {questions.map((question, index) => (
        <RenderQuestion
          question_num={index + 1}
          deleteQues={deleteQues}
          editQuestion={editQuestion}
          question={question}
        />
      ))}
    </>
  );
};

export default QuestionsList;
