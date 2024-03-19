import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/CreateMode/Sidebar";
import Header from "../../components/Header";
import QuestionsList from "../../components/CreateMode/QuestionsList";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuizAction,
  editQuizAction,
  getWholeQuizAction,
  resetCreateQuizAction,
  resetEditQuizAction,
  resetGetWholeQuizAction,
} from "../../redux/actions";
import { question_types } from "../../components/CreateMode/constants";
import { API_CONSTANTS, APP_ROUTES, replaceInString } from "../../utils";
import { toast } from "react-toastify";
import AttemptQuiz from "../../components/AttemptQuiz";

const CreateFlow = (props) => {
  const { mode } = props;
  const location = useLocation();
  console.log(location, "location");
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [isPoll, setIsPoll] = useState(false);
  const [quizName, setQuizName] = useState("New Quiz");
  const [modalTrigger, setModalTrigger] = useState(false);
  const [generatedQuizId, setGeneratedQuizId] = useState(null);
  const [updateQuesIndex, setUpdateQuesIndex] = useState(-1);
  const initQuestion = {
    question_type: question_types.MCQ,
    question_title: "",
    options: [],
    save: false,
    correct_answer: null,
  };
  const [currQuestion, setCurrQuestion] = useState(initQuestion);
  const addQuestion = (question) => {
    const temp = { ...question };
    setQuestions([...questions, question]);
    // setCurrQuestion({
    //   ...initQuestion,
    //   question_type: temp.question_type,
    //   options: Array.from({ length: temp.options.length }, () => ""),
    //   question: "",
    // });

    setCurrQuestion(cleanCurrQues());
  };
  const editQuestion = (index) => {
    setCurrQuestion(questions[index]);
    setUpdateQuesIndex(index);
  };
  useEffect(() => {
    if (mode && mode === "edit" && params?.id) {
      dispatch(getWholeQuizAction({ id: params?.id }));
    }
  }, [mode, params]);

  const quizSelector = useSelector((state) => state.quiz);
  localStorage.setItem("redux", JSON.stringify(quizSelector));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      dispatch(resetCreateQuizAction());
      dispatch(resetEditQuizAction());
      dispatch(resetGetWholeQuizAction());
      setGeneratedQuizId(null);
      setQuestions([]);
    };
  }, []);
  useEffect(() => {
    setQuestions([]);
    // return () => {
    // };
  }, [location.pathname]);
  useEffect(() => {
    switch (quizSelector.quiz.status) {
      case API_CONSTANTS.success:
        toast.success("Quiz Created successfully");
        setGeneratedQuizId(quizSelector?.quiz?.data?._id);
        navigate(APP_ROUTES.QUIZZES);
        // setModalTrigger(true);
        break;
      case API_CONSTANTS.error:
        toast.error("Error!!");
        break;

      default:
        break;
    }
  }, [quizSelector.quiz]);
  useEffect(() => {
    switch (quizSelector.wholeQuiz.status) {
      case API_CONSTANTS.success:
        {
          setQuizName(quizSelector?.wholeQuiz?.data?.title);
          setQuestions(quizSelector?.wholeQuiz?.data?.questions);
        }
        break;
      case API_CONSTANTS.error:
        toast.error("Error!!");
        break;

      default:
        break;
    }
  }, [quizSelector.wholeQuiz]);
  useEffect(() => {
    switch (quizSelector.editQuiz.status) {
      case API_CONSTANTS.success:
        {
          toast.success("Changes saved successfully");
          navigate(APP_ROUTES.QUIZZES);
        }
        break;
      case API_CONSTANTS.error:
        toast.error("Error!!");
        break;

      default:
        break;
    }
  }, [quizSelector.editQuiz]);
  console.log({ questions, isPoll }, "questions");
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
  const saveQuiz = () => {
    if (questions.length <= 0) {
      toast.error("Add atleast 1 question");
      return;
    }
    const data = {
      ...quizSelector.wholeQuiz.data,
      title: quizName,
      questions,
    };

    dispatch(editQuizAction(data));
  };
  const submitAction = () => {
    if (mode === "manual") {
      createQuiz();
    } else if (mode === "edit") {
      saveQuiz();
    }
  };
  const cleanCurrQues = (params) => {
    if (questions.length) {
      if (questions?.[0]?.question_type !== question_types.POLL) {
        return {
          ...initQuestion,
          question_type: question_types.MCQ,
          options: ["", "", "", ""],
        };
      } else {
        return {
          ...initQuestion,
          question_type: question_types.POLL,
          options: ["", "", "", ""],
        };
      }
    } else {
      return {
        ...initQuestion,
        question_type: question_types.POLL,
        options: ["", "", "", ""],
      };
    }
  };
  const deleteQues = (delIndex) => {
    setQuestions(questions.filter((ques, index) => index !== delIndex));
  };
  const updateQues = (question, updIndex) => {
    setQuestions(
      questions.map((ques, index) => (index === updIndex ? question : ques))
    );
    setUpdateQuesIndex(-1);
    setCurrQuestion(cleanCurrQues());
  };
  const initOptions = () => {
    if (currQuestion.question_type === question_types.MCQ) {
      return ["", "", "", ""];
    } else {
      return ["", ""];
    }
  };
  // console.log(generatedQuizId, "generatedQuizId");
  const links = [
    {
      text: "Create a quiz",
      link: APP_ROUTES.MANUAL_MODE,
    },
    {
      text: "My Quizzes",
      link: APP_ROUTES.QUIZZES,
    },
    // {
    //   text: "AI Mode",
    //   link: APP_ROUTES.AI_MODE,
    // },
    // {
    //   text: "Features",
    //   link: APP_ROUTES.HOME,
    // },
    // {
    //   text: "Features",
    //   link: APP_ROUTES.HOME,
    // },
  ];
  useEffect(() => {
    if (questions.length) {
      setIsPoll(questions?.[0]?.question_type === question_types.POLL);
    } else {
      setIsPoll(false);
    }
  }, [questions]);
  useEffect(() => {
    if (questions.length) {
      if (!currQuestion.question_type) {
        if (questions?.[0]?.question_type === question_types.POLL) {
          setCurrQuestion({
            ...currQuestion,
            question_type: question_types.POLL,
          });
        } else {
          setCurrQuestion({
            ...currQuestion,
            question_type: question_types.MCQ,
            options: ["", "", "", ""],
          });
        }
      }
    }
  }, [currQuestion.question_type]);
  console.log(currQuestion, "currQuestion");

  return (
    <>
      {mode === "attempt" ? (
        <div className="container mt-10 h-[86vh] py-4 flex items-center overflow-hidden justify-center bg-green-300 box-border">
          <AttemptQuiz />
        </div>
      ) : (
        <>
          <Header links={links} />
          <div className="container mt-10 h-[86vh] py-4 flex flex-row gap-8 bg-green-300 box-border">
            <div className="container w-1/2">
              <Sidebar
                currQuestion={currQuestion}
                setCurrQuestion={setCurrQuestion}
                addQuestion={addQuestion}
                updateQuesIndex={updateQuesIndex}
                isPoll={isPoll}
                setIsPoll={setIsPoll}
                firstQues={questions?.length === 0}
                updateQues={updateQues}
                questions={questions}
                setQuestions={setQuestions}
                {...props}
              />
            </div>
            <div className=" w-1/2 overflow-y-auto bg-grey rounded-3xl p-4 box-border   shadow-lg ">
              {/* <Sidebar {...props} /> */}
              <QuestionsList
                submitAction={submitAction}
                currQuestion={currQuestion}
                questions={questions}
                setQuestions={setQuestions}
                quizName={quizName}
                setQuizName={setQuizName}
                deleteQues={deleteQues}
                editQuestion={editQuestion}
                {...props}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateFlow;
