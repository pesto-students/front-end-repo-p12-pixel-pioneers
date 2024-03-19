import { Button, Input, Modal } from "@mui/base";
import React, { useState } from "react";
import RenderQuestion from "./RenderQuestion";
import { useSelector } from "react-redux";
import { API_CONSTANTS } from "../../utils";
import AI_Modal from "./AI_Modal";
import QuestionBankModal from "./QuestionBankModal";
import { toast } from "react-toastify";
import ComponentLoader from "../Loader/ComponentLoader";
import { question_types } from "./constants";

const QuestionsList = (props) => {
  const {
    questions,
    submitAction,
    deleteQues,
    editQuestion,
    quizName,
    setQuestions,
    setQuizName,
    isPoll,
    currQuestion,
    mode,
  } = props;

  const quizSelector = useSelector((state) => state.quiz.quiz);
  const wholeQuizSelector = useSelector((state) => state.quiz.wholeQuiz);
  const editQuizSelector = useSelector((state) => state.quiz.editQuiz);
  const [triggers, setTriggers] = useState({
    ai_modal: false,
    question_bank: false,
  });
  // function checkDuplicateQuestions(Questions, newData) {
  //   for (const newQuestion of newData) {
  //     const idToCheck = newQuestion.id || newQuestion._id; // Treat id and _id as the same
  //     if (
  //       Questions.some(
  //         (existingQuestion) =>
  //           existingQuestion._id === idToCheck ||
  //           existingQuestion.id === idToCheck
  //       )
  //     ) {
  //       return true; // If any duplicate found, return true
  //     }
  //   }
  //   return false; // If no duplicates found, return false
  // }
  const updateQues = (newQues) => {
    setQuestions([...questions, ...newQues]);
  };
  // console.log(selectors, "triggers");
  const showAI = (questions, currQuestion) => {
    if (questions.length) {
      if (questions?.[0]?.question_type !== question_types.POLL) {
        return true;
      }
      return false;
    } else {
      if (currQuestion.question_type !== question_types.POLL) {
        return true;
      }
      return false;
    }
  };
  return (
    <>
      {wholeQuizSelector.status === API_CONSTANTS.loading ? (
        <ComponentLoader />
      ) : (
        <>
          <div className="flex flex-row items-start mb-4 justify-between">
            <Button
              // onClick={() => submitAction()}
              onClick={() => setTriggers({ ...triggers, question_bank: true })}
              className="py-1 h-12 px-4 flex min-w-24 items-center justify-center border rounded-lg relative bg-black text-white border-black border-1"
            >
              Add from question bank
            </Button>
            {showAI(questions, currQuestion) && (
              <Button
                onClick={() => setTriggers({ ...triggers, ai_modal: true })}
                className="py-1 h-12 px-4 flex min-w-24 items-center justify-center border rounded-lg relative bg-black text-white border-black border-1"
              >
                Generate with AI
              </Button>
            )}
            <Button
              onClick={() => submitAction()}
              className="py-1 h-12 px-4 flex min-w-24 items-center justify-center border rounded-lg relative border-black border-1"
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
          <div className="">
            <Input
              value={quizName}
              className={` p-0 h-10 w-full `}
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
          </div>
          {questions?.length ? (
            <h1 className="text-3xl my-8 text-start font-medium">Questions</h1>
          ) : (
            <h1 className="text-3xl my-8 text-start font-medium">
              No questions yet.
              <br />
              Please add your first one.
            </h1>
          )}
        </>
      )}
      {/* {questions.length <= 0 && (
      )} */}

      {questions?.map((question, index) => (
        <RenderQuestion
          question_num={index + 1}
          deleteQues={deleteQues}
          editQuestion={editQuestion}
          question={question}
          // handleOpen={handleOpen}
        />
      ))}
      <AI_Modal
        open={triggers.ai_modal}
        updateQues={updateQues}
        handleClose={() => setTriggers({ ...triggers, ai_modal: false })}
      />
      <QuestionBankModal
        open={triggers.question_bank}
        updateQues={updateQues}
        existingQues={questions}
        handleClose={() => setTriggers({ ...triggers, question_bank: false })}
      />
    </>
  );
};

export default QuestionsList;
