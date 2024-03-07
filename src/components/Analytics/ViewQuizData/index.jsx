import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getQuizDataAction, resetQuizDataAction } from "../../../redux/actions";
import { FaExternalLinkAlt } from "react-icons/fa";
import { APP_ROUTES } from "../../../utils";
// import { getQuizDataAction } from "../../redux/actions";
const ViewQuizData = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.analytics.quizData);
  console.log(quizData, "quizData");
  useEffect(() => {
    if (params?.id) {
      dispatch(getQuizDataAction());
    }
  }, [params]);
  useEffect(() => {
    return () => {
      dispatch(resetQuizDataAction());
    };
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-medium mb-16 text-start">Quiz Results :</h1>
      <table className="min-w-full divide-y border divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Correct Answers
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Wrong Answers
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Link
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {quizData?.data?.map((row) => (
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
                // to={APP_ROUTES.HOME}
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
