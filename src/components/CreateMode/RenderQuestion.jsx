import React from "react";
import RenderOption from "./RenderOption";
import { MdDelete, MdEdit } from "react-icons/md";

const RenderQuestion = (props) => {
  const { question_num, question, deleteQues, editQuestion, hideActions } =
    props;
  return (
    <div className="my-4">
      <h1 className="font-medium text-start text-2xl flex items-center justify-start">
        Question {question_num}:
        {!hideActions && (
          <>
            <span className="ml-8 flex items-center gap-1 justify-start ">
              <MdEdit
                className="cursor-pointer"
                onClick={() => editQuestion(question_num - 1)}
              />
              <MdDelete
                className="cursor-pointer"
                onClick={() => deleteQues(question_num - 1)}
              />
            </span>
          </>
        )}
      </h1>
      <h2 className="font-normal text-start text-xl">
        {question.question_title}
      </h2>
      <div className="grid pl-2 grid-row gap-2">
        {question.options.map((option, index) => (
          <RenderOption
            key={index}
            isAnswer={question.correct_answer === index}
            option={option}
          />
        ))}
      </div>
    </div>
  );
};

export default RenderQuestion;
