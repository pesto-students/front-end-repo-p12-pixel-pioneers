import { Button, Input } from "@mui/base";
import React from "react";
import RenderQuestion from "./RenderQuestion";

const QuestionsList = (props) => {
  const {
    questions,
    createQuiz,
    deleteQues,
    editQuestion,
    quizName,
    setQuizName,
  } = props;
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
               ${quizName.length <= 0 && "border border-error"}`,
            },
          }}
          aria-label="Question"
          placeholder="Enter your question"
          onChange={(e) => setQuizName(e.target.value)}
        />
        <Button
          onClick={createQuiz}
          className="py-1 px-4 border rounded-sm border-black border-1"
        >
          Save Quiz
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
