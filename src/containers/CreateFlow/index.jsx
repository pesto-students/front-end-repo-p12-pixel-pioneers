import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/CreateMode/Sidebar";
import Header from "../../components/Header";
import QuestionsList from "../../components/CreateMode/QuestionsList";
import { useDispatch, useSelector } from "react-redux";
import { createQuizAction, resetCreateQuizAction } from "../../redux/actions";
import { question_types } from "../../components/CreateMode/constants";
import { API_CONSTANTS, APP_ROUTES } from "../../utils";
import { toast } from "react-toastify";

const CreateFlow = (props) => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState("New Quiz");
  const [updateQuesIndex, setUpdateQuesIndex] = useState(-1);
  const initQuestion = {
    question_type: question_types.MCQ,
    question: "",
    options: [],
    save: false,
    correct_answer: null,
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
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      dispatch(resetCreateQuizAction());
    };
  }, []);
  useEffect(() => {
    switch (quizSelector.quiz.status) {
      case API_CONSTANTS.success:
        toast.success("Quiz Created successfully");
        navigate(APP_ROUTES.QUIZZES);
        break;
      case API_CONSTANTS.error:
        toast.success("Quiz Created successfully");
        break;

      default:
        break;
    }
  }, [quizSelector.quiz]);
  // console.log(quizSelector, "quizSelector");
  // console.log(questions, "questions");
  const createQuiz = () => {
    if (questions.length <= 0) {
      toast.error("Add atleast 1 question");
      return;
    }
    const data = {
      title: quizName,
      status: "Active",
      questions,
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
            quizName={quizName}
            setQuizName={setQuizName}
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
