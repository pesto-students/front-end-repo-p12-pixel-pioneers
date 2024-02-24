import { Button } from "@mui/base";
import React from "react";
import RenderQuestion from "./RenderQuestion";

const QuestionsList = (props) => {
  const { questions } = props;
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl text-start font-medium">Questions </h1>
        <Button className="py-1 px-4 border rounded-sm border-black border-1">
          Share Quiz
        </Button>
      </div>
      {questions.map((question, index) => (
        <RenderQuestion question_num={index + 1} question={question} />
      ))}
    </>
  );
};

export default QuestionsList;
