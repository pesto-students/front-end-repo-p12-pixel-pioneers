import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAllQuizzesAction,
  resetGetQuizzesAction,
} from "../../../redux/actions";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  API_CONSTANTS,
  APP_ROUTES,
  DOMAIN,
  replaceInString,
} from "../../../utils";
import BackIcon from "../../BackIcon";
import PageTitle from "../../PageTitle";
import { toast } from "react-toastify";
import ComponentLoader from "../../Loader/ComponentLoader";
import { Button } from "@mui/base";
import { FaCopy } from "react-icons/fa6";

const AllQuizzes = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const quizzes = useSelector((state) => state.analytics.quizzes);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    dispatch(getAllQuizzesAction());
    return () => {
      dispatch(resetGetQuizzesAction());
    };
  }, []);
  useEffect(() => {
    switch (quizzes.status) {
      case API_CONSTANTS.loading:
        setLoader(true);
        break;
      case API_CONSTANTS.success:
        setLoader(false);
        break;
      case API_CONSTANTS.error:
        setLoader(false);
        toast.error(quizzes.data);
        break;
      case API_CONSTANTS.init:
        setLoader(false);
        break;

      default:
        break;
    }
  }, [quizzes.status]);
  console.log(quizzes);
  return (
    <div className="pb-16">
      <PageTitle text="All Quizzes" />
      {loader ? (
        <ComponentLoader />
      ) : (
        <>
          <div className="flex items-center my-4 justify-center">
            <Button
              onClick={() => navigate(APP_ROUTES.MANUAL_MODE)}
              // disabled={!allOptionsFilled}
              className={"border border-black py-2 px-6 mr-auto mt-8 rem"}
            >
              New quiz
            </Button>
          </div>
          <table className="min-w-full divide-y border divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* <th
                scope="col"
                className="px-6 py-3 w-[10%]  border border-gray-300  text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
              >
                Id
              </th> */}
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quizzes?.data?.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  {/* <td className="px-6 py-4 border border-gray-300  whitespace-nowrap text-start">
                  {row._id}
                </td> */}
                  <td className="px-6 py-4 border border-gray-300  whitespace-nowrap text-start">
                    {row.title}
                  </td>
                  <td className="px-6 py-4 border border-gray-300 text-start">
                    <div className=" flex items-center justify-start gap-4">
                      <Link
                        to={replaceInString(APP_ROUTES.EDIT_QUIZ, {
                          id: row._id,
                        })}
                      >
                        <MdEdit />
                      </Link>
                      <FaCopy
                        className="cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            replaceInString(
                              `${window.location.origin}${APP_ROUTES.ATTEMPT_QUIZ}`,
                              { id: row._id }
                            )
                          );
                          toast.success("Quiz link copied to clipboard");
                        }}
                      />
                      <Link
                        to={replaceInString(APP_ROUTES.VIEW_QUIZ_ANALYTICS, {
                          id: row._id,
                        })}
                      >
                        <FaExternalLinkAlt />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AllQuizzes;
