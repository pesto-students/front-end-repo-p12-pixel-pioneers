import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuizDataAction } from "../../redux/actions";
import ViewQuizData from "../../components/Analytics/ViewQuizData";
import { APP_ROUTES } from "../../utils";
import UserAnalyticsPerQuiz from "../../components/Analytics/UserAnalyticsPerQuiz";
import AllQuizzes from "../../components/Analytics/AllQuizzes";
import Header from "../../components/Header";
import ComingSoon from "../../components/ComingSoon.jsx";

const Analytics = (props) => {
  const { renderPath } = props;
  console.log(props, "props");
  //   const params = useParams();
  //   const dispatch = useDispatch();
  //   const quizData = useSelector((state) => state.analytics.quizData);
  //   console.log(quizData, "quizData");
  //   useEffect(() => {
  //     if (params?.id) {
  //       dispatch(getQuizDataAction());
  //     }
  //   }, [params]);
  const links = [
    {
      text: "Create a quiz",
      link: APP_ROUTES.MANUAL_MODE,
    },
    // {
    //   text: "AI Mode",
    //   link: APP_ROUTES.AI_MODE,
    // },
    {
      text: "My Quizzes",
      link: APP_ROUTES.QUIZZES,
    },
    // {
    //   text: "Features",
    //   link: APP_ROUTES.HOME,
    // },
    // {
    //   text: "Features",
    //   link: APP_ROUTES.HOME,
    // },
  ];
  return (
    <div className="container mt-0 h-[86vh] py-4  box-border">
      <Header links={links} />
      {/* <div className="flex mb-8 w-full h-[50px] border">

      </div> */}
      {renderPath === APP_ROUTES.VIEW_QUIZ_ANALYTICS && <ViewQuizData />}
      {renderPath === APP_ROUTES.QUIZZES && <AllQuizzes />}
      {renderPath === APP_ROUTES.AI_MODE && <ComingSoon />}
      {renderPath === APP_ROUTES.VIEW_USER_ANALYTICS_FOR_QUIZ && (
        <UserAnalyticsPerQuiz />
      )}
    </div>
  );
};

export default Analytics;
