import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllQuizzesAction } from "../../../redux/actions";
import { FaExternalLinkAlt } from "react-icons/fa";
import { APP_ROUTES, replaceInString } from "../../../utils";
import BackIcon from "../../BackIcon";
import PageTitle from "../../PageTitle";

const AllQuizzes = (props) => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.analytics.quizzes);
  useEffect(() => {
    return () => {
      dispatch(getAllQuizzesAction());
    };
  }, []);
  console.log(quizzes);
  return (
    <div className="pb-16">
      <PageTitle text="All Quizzes" />
      <table className="min-w-full divide-y border divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 w-[10%]  border border-gray-300  text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
            >
              Id
            </th>
            <th
              scope="col"
              className="px-6 py-3 border border-gray-300  text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
            >
              Quiz Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 w-[10%] border border-gray-300  text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
            >
              Link
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {quizzes?.data?.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 border border-gray-300  whitespace-nowrap text-start">
                {row.id}
              </td>
              <td className="px-6 py-4 border border-gray-300  whitespace-nowrap text-start">
                {row.name}
              </td>
              <td className="px-6 py-4 w-[10%] border border-gray-300   whitespace-nowrap text-start">
                <Link
                  to={replaceInString(APP_ROUTES.VIEW_QUIZ_ANALYTICS, {
                    id: row.id,
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

export default AllQuizzes;
