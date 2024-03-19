import { Input } from "@mui/base";
import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const Option = ({
  option,
  onChange,
  placeholder,
  onClick = null,
  isCorrect,
  error,
  onBlur,
  onDelete,
}) => {
  // console.log(error, "option");
  const [showIcon, setShowIcon] = useState(false);

  return (
    <span
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
      className="relative"
    >
      <Input
        value={option}
        //   onClick={onClick}
        className={`shadow-lg  box-border  h-10 `}
        onBlur={onBlur}
        onClick={onClick}
        slotProps={{
          input: {
            className: `w-full text-sm ${
              isCorrect && "bg-green"
            } font-sans h-10 box-border p-2  font-normal leading-5 
            m-0 rounded-lg shadow-lg shadow-slate-100 focus-visible:outline-0
            ${error && "border border-error"}`,
          },
        }}
        aria-label="Question"
        placeholder={placeholder ? placeholder : "Enter Option"}
        onChange={(e) => onChange(e.target.value)}
      />
      {onDelete && showIcon && (
        <IoMdCloseCircle
          className="cursor-pointer absolute text-xl -top-1 -right-2 "
          // onClick={() => deleteQues(question_num - 1)}
          onClick={onDelete}
        />
      )}
    </span>
  );
};

export default Option;
