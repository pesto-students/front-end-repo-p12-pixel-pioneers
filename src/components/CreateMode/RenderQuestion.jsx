import React from "react";
import RenderOption from "./RenderOption";

const RenderQuestion = (props) => {
  const { question_num, question } = props;
  return (
    <div className="my-4">
      <h1 className="font-medium text-start text-2xl">
        Question {question_num}:
      </h1>
      <h2 className="font-normal text-start text-xl">{question.question}</h2>
      <div className="grid pl-2 grid-row gap-2">
        {question.options.map((option, index) => (
          <RenderOption
            key={index}
            isAnswer={question.answerIndex === index}
            option={option}
          />
        ))}
      </div>
    </div>
  );
};

export default RenderQuestion;
