import React, { useState } from "react";
import RenderOption from "./RenderOption";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button, Modal } from "@mui/base";

const RenderQuestion = (props) => {
  const {
    question_num,
    question,
    deleteQues,
    editQuestion,
    hideActions,
    toggleQuestion,
    questionAdded,
  } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="my-4 w-full">
        <h1 className="font-medium text-start text-2xl flex items-center justify-start">
          Question {question_num}:
          {!hideActions && (
            <>
              <span className="ml-8 flex items-center gap-1 justify-start ">
                {editQuestion && (
                  <MdEdit
                    className="cursor-pointer"
                    onClick={() => editQuestion(question_num - 1)}
                  />
                )}
                {deleteQues && (
                  <MdDelete
                    className="cursor-pointer"
                    // onClick={() => deleteQues(question_num - 1)}
                    onClick={() => handleOpen()}
                  />
                )}
              </span>
            </>
          )}
        </h1>
        <h2 className="font-normal text-start text-xl">
          {toggleQuestion && (
            <input
              type="checkbox"
              className="mr-3"
              checked={questionAdded}
              onClick={toggleQuestion}
              id=""
            />
          )}
          {question?.question_title}
        </h2>
        <div className="grid pl-2 grid-row gap-2">
          {question?.options?.map((option, index) => (
            <RenderOption
              key={index}
              isAnswer={question?.correct_answer === index}
              option={option}
            />
          ))}
        </div>
      </div>
      <Modal
        className="border z-10 mb-auto flex items-center  justify-center top-0 absolute w-[100vw] h-[100vh]"
        open={open}
        onClose={handleClose}
      >
        <div className=" py-6 px-4 rounded-lg border gap-2 flex items-center  justify-between flex-col border-black bg-white h-[160px] w-[400px] ">
          <p className="text-2xl ">Are you sure you want to delete?</p>
          <div className=" flex items-center  justify-end w-full ">
            <Button
              onClick={handleClose}
              className="mr-2 border rounded-lg px-4 py-2 border-black"
            >
              Cancel
            </Button>
            <Button
              className=" px-4 py-2 rounded-lg bg-black text-white border-black"
              onClick={() => {
                deleteQues(question_num - 1);
                handleClose();
              }}
              // variant="contained"
              // color="primary"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RenderQuestion;
