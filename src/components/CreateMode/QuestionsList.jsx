import { Button } from "@mui/base";
import React from "react";
import RenderQuestion from "./RenderQuestion";

const QuestionsList = (props) => {
  const { questions, createQuiz, deleteQues, editQuestion } = props;
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl text-start font-medium">Questions </h1>
        <Button
          onClick={createQuiz}
          className="py-1 px-4 border rounded-sm border-black border-1"
        >
          Save Quiz
        </Button>
      </div>
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
