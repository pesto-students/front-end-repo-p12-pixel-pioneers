import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getQuizDataAction, resetQuizDataAction } from "../../../redux/actions";
import { FaExternalLinkAlt } from "react-icons/fa";
import { APP_ROUTES, replaceInString } from "../../../utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const UserAnalyticsPerQuiz = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.analytics.quizData);
  ChartJS.register(ArcElement, Tooltip, Legend);
  console.log(quizData, "quizData");
  const detailedResult = quizData?.data?.result;
  const resultPercentage = quizData?.data?.percentage;
  const id = params?.id;
  const user = params?.user;
  return (
    <div>
      <h1 className="text-3xl pl-2 pr-4 mr-auto table bg-green leading-10 font-medium mb-16 text-start">
        Analytics for : {user}
      </h1>
    </div>
  );
};

export default UserAnalyticsPerQuiz;
