import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getQuizDataAction, resetQuizDataAction } from "../../../redux/actions";
import { FaExternalLinkAlt } from "react-icons/fa";
import { API_CONSTANTS, APP_ROUTES, replaceInString } from "../../../utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import PageTitle from "../../PageTitle";
import ComponentLoader from "../../Loader/ComponentLoader";
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
    <>
      {quizData.status === API_CONSTANTS.loading ? (
        <ComponentLoader />
      ) : (
        <div className="pb-16">
          <PageTitle text={`Quiz Results :`} />
          <div className=" flex flex-row gap-2">
            {/* <section className="my-8">
            </section> */}
            <table className="w-[70%] bg-white">
              <thead className="bg-navyblue h-[75px]    text-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3  border-navyblue rounded-l-xl text-left text-3xl font-medium text-white capitalize tracking-wider "
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-navyblue  text-left text-3xl font-medium text-white capitalize tracking-wider"
                  >
                    Correct Answers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-navyblue  text-left text-3xl font-medium text-white capitalize tracking-wider"
                  >
                    Wrong Answers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-navyblue rounded-r-xl text-left text-3xl font-medium text-white capitalize tracking-wider "
                  >
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {detailedResult?.map((row, index) => (
                  <tr
                    key={row.key}
                    className={` h-[75px] max-h-[75px] + ${
                      index % 2 === 1 && "bg-[#f3f3f3]"
                    }`}
                  >
                    <td className="px-6 py-4 w-[25%] text-ellipsis  font-medium  text-3xl  whitespace-nowrap text-start">
                      {row.key}
                    </td>
                    <td className="px-6 py-4 text-xl whitespace-nowrap text-start">
                      {row.correctAnswers}
                    </td>
                    <td className="px-6 py-4 text-xl whitespace-nowrap text-start">
                      {row.wrongAnswers}
                    </td>
                    <td className="px-6 py-4 text-xl whitespace-nowrap text-start">
                      <Link
                        to={replaceInString(
                          APP_ROUTES.VIEW_USER_ANALYTICS_FOR_QUIZ,
                          {
                            id: params?.id,
                            user: row?.key,
                          }
                        )}
                      >
                        <FaExternalLinkAlt />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pie
              className=" !h-[400px] !w-[400px]"
              data={resultPercentageData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewQuizData;
