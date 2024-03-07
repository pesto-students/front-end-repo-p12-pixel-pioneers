import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/CreateMode/Sidebar";
import Header from "../../components/Header";
import QuestionsList from "../../components/CreateMode/QuestionsList";
import { useDispatch, useSelector } from "react-redux";
import { createQuizAction } from "../../redux/actions";
import { question_types } from "../../components/CreateMode/constants";

const CreateFlow = (props) => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [updateQuesIndex, setUpdateQuesIndex] = useState(-1);
  const initQuestion = {
    question_type: question_types.MCQ,
    question: "",
    options: [],
    save: false,
    answerIndex: null,
  };
  const [currQuestion, setCurrQuestion] = useState(initQuestion);
  const addQuestion = (question) => {
    setQuestions([...questions, question]);
    setCurrQuestion({ ...initQuestion, options: initOptions(), question: "" });
  };
  const editQuestion = (index) => {
    setCurrQuestion(questions[index]);
    setUpdateQuesIndex(index);
  };

  const quizSelector = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createQuizAction("data"));
  }, []);
  console.log(quizSelector, "quizSelector");
  console.log(questions, "questions");
  const createQuiz = () => {
    const data = {
      id: "123e4567-e89b-12d3-a456-4266554403200",
      title: "Sample Quiz",
      status: "Active",
      createdBy: "60f6c5d7a5d9c20015c7d5f1",
      lastUpdatedBy: "60f6c5d7a5d9c20015c7d5f1",
      persistQuestions: false,
      questions: [
        {
          question_title: "What is the capital of France?",
          options: ["Ketan", "London", "Berlin"],
          correct_answer: "Ketan",
          question_type: "mCQ",
        },
        {
          question_title: "What is the largest planet in our solar system?",
          options: ["Mars", "Jupiter", "Venus", "Saturn"],
          correct_answer: "Jupiter",
          question_type: "mCQ",
        },
        {
          question_title: "Do you like this quiz?",
          options: ["Yes", "No"],
          correct_answer: "",
          question_type: "poll",
        },
      ],
    };

    dispatch(createQuizAction(data));
  };
  const deleteQues = (delIndex) => {
    setQuestions(questions.filter((ques, index) => index !== delIndex));
  };
  const updateQues = (question, updIndex) => {
    setQuestions(
      questions.map((ques, index) => (index === updIndex ? question : ques))
    );
    setUpdateQuesIndex(-1);
    setCurrQuestion({ ...initQuestion, options: initOptions(), question: "" });
  };
  const initOptions = () => {
    if (currQuestion.question_type === question_types.MCQ) {
      return ["", "", "", ""];
    } else {
      return ["", ""];
    }
  };
  return (
    <>
      <Header />
      <div className="container mt-10 h-[86vh] py-4 flex flex-row gap-8 bg-green-300 box-border">
        <div className="container w-1/2">
          <Sidebar
            currQuestion={currQuestion}
            setCurrQuestion={setCurrQuestion}
            addQuestion={addQuestion}
            updateQuesIndex={updateQuesIndex}
            isPoll={questions?.[0]?.question_type === question_types.POLL}
            firstQues={questions.length === 0}
            updateQues={updateQues}
            {...props}
          />
        </div>
        <div className=" w-1/2 overflow-y-auto py-3 box-border rounded-lg  shadow-lg pl-2">
          {/* <Sidebar {...props} /> */}
          <QuestionsList
            createQuiz={createQuiz}
            questions={questions}
            deleteQues={deleteQues}
            editQuestion={editQuestion}
            {...props}
          />
        </div>
      </div>
    </>
  );
};

export default CreateFlow;
