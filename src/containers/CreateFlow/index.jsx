import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/CreateMode/Sidebar";
import Header from "../../components/Header";
import QuestionsList from "../../components/CreateMode/QuestionsList";

const CreateFlow = (props) => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };
  console.log(questions, "questions");
  return (
    <>
      <Header />
      <div className="container mt-10 h-[86vh] py-4 flex flex-row gap-8 bg-green-300 box-border">
        <div className="container w-1/2">
          <Sidebar addQuestion={addQuestion} {...props} />
        </div>
        <div className=" w-1/2 overflow-y-auto  shadow-lg pl-2">
          {/* <Sidebar {...props} /> */}
          <QuestionsList questions={questions} {...props} />
        </div>
      </div>
    </>
  );
};

export default CreateFlow;
