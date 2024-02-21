import React, { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const AccordionItem = ({ index, title, content }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`mb-2 p-8 bg-[${
        isActive ? "#B9FF66" : "#F3F3F3"
      }] rounded-3xl mb-8`}
    >
      <button
        className="flex justify-between items-center w-full py-4 0 text-6xl rounded-md focus:outline-none"
        onClick={toggleAccordion}
      >
        {index}
        <span className="text-4xl text-start ml-6 mr-auto">{title}</span>
        {isActive ? <AiFillMinusCircle /> : <AiFillPlusCircle />}
      </button>
      {isActive && (
        <div className="py-4 border-t-2 border-black text-start rounded-b-md">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
