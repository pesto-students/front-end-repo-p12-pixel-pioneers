import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuizDataAction } from "../../redux/actions";
import ViewQuizData from "../../components/Analytics/ViewQuizData";
import { APP_ROUTES } from "../../utils";
import UserAnalyticsPerQuiz from "../../components/Analytics/UserAnalyticsPerQuiz";
import AllQuizzes from "../../components/Analytics/AllQuizzes";

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
  return (
    <div className="container mt-10 h-[86vh] py-4  box-border">
      {renderPath === APP_ROUTES.VIEW_QUIZ_ANALYTICS && <ViewQuizData />}
      {renderPath === APP_ROUTES.QUIZZES && <AllQuizzes />}
      {renderPath === APP_ROUTES.VIEW_USER_ANALYTICS_FOR_QUIZ && (
        <UserAnalyticsPerQuiz />
      )}
    </div>
  );
};

export default Analytics;
