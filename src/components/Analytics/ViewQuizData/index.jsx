import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getQuizDataAction, resetQuizDataAction } from "../../../redux/actions";
import { FaExternalLinkAlt } from "react-icons/fa";
import { APP_ROUTES, replaceInString } from "../../../utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import PageTitle from "../../PageTitle";
// import { getQuizDataAction } from "../../redux/actions";
const ViewQuizData = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.analytics.quizData);
  ChartJS.register(ArcElement, Tooltip, Legend);
  console.log(quizData, "quizData");
  const detailedResult = quizData?.data?.result;
  const resultPercentage = quizData?.data?.percentage;
  let resultPercentageData = {
    labels: ["Total incorrect answers", "Total correct answers"],

    // datasets: Object.keys(resultPercentage),
    datasets: [
      {
        label: "Total answers",
        data: [
          resultPercentage?.totalWrongAnswers,
          resultPercentage?.totalCorrectAnswers,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    if (params?.id) {
      dispatch(getQuizDataAction({ id: params.id }));
    }
  }, [params]);
  useEffect(() => {
    return () => {
      dispatch(resetQuizDataAction());
    };
  }, []);
  return (
    <div className="pb-16">
      <PageTitle text={`Quiz Results :`} />
      <section className="my-8">
        <Pie className="!h-[500px] !w-[500px]" data={resultPercentageData} />
      </section>
      <table className="min-w-full divide-y border divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
            >
              User
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
            >
              Correct Answers
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
            >
              Wrong Answers
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
            >
              Link
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {detailedResult?.map((row) => (
            <tr key={row.key} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-start">
                {row.key}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-start">
                {row.correctAnswers}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-start">
                {row.wrongAnswers}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-start">
                <Link
                  to={replaceInString(APP_ROUTES.VIEW_USER_ANALYTICS_FOR_QUIZ, {
                    id: params?.id,
                    user: row?.key,
                  })}
                >
                  <FaExternalLinkAlt />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewQuizData;
