import React from "react";

const RenderOption = ({ isAnswer, option, actionFn = () => {} }) => {
  return (
    <div
      onClick={actionFn}
      aria-role="checkbox"
      className="flex items-center justify-start flex-row gap-4"
    >
      <div
        aria-role=""
        className="rounded-full flex items-center justify-center h-4 w-4 border cursor-pointer"
      >
        <div
          className={`rounded-full h-2 w-2 border box-border ${
            isAnswer && "bg-green"
          }`}
        ></div>
      </div>
      <p>{option}</p>
    </div>
  );
};

export default RenderOption;
