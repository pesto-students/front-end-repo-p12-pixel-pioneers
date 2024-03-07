import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuizDataAction } from "../../redux/actions";
import ViewQuizData from "../../components/Analytics/ViewQuizData";

const Analytics = (props) => {
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
      <ViewQuizData />
    </div>
  );
};

export default Analytics;
