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
  const tableData = [
    {
      id: 1,
      name: "John Doe",
      link: "https://example.com",
      details: "Lorem ipsum",
    },
    {
      id: 2,
      name: "Jane Smith",
      link: "https://example.org",
      details: "Dolor sit amet",
    },
    {
      id: 3,
      name: "Alice Johnson",
      link: "https://example.net",
      details: "Consectetur adipiscing elit",
    },
    {
      id: 4,
      name: "Bob Brown",
      link: "https://example.edu",
      details: "Sed do eiusmod tempor",
    },
  ];
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
      <PageTitle noBackBtn={true} text="Your Quizzes" />
      {loader ? (
        <ComponentLoader />
      ) : (
        <>
          <div className="flex items-center my-4 justify-center">
            {/* <Button
              onClick={() => navigate(APP_ROUTES.MANUAL_MODE)}
              // disabled={!allOptionsFilled}
              className={"border border-black py-2 px-6 mr-auto mt-8 rem"}
            >
              New quiz
            </Button> */}
          </div>

          <table className="w-[800px]">
            <thead className="bg-navyblue h-[75px]  w-[800px]  text-white">
              <tr>
                <th className="px-6 py-3  border-navyblue rounded-l-xl text-left text-3xl font-medium text-white capitalize tracking-wider ">
                  Quiz Name
                </th>
                <th className="px-6 py-3 border-navyblue  text-left text-3xl font-medium text-white capitalize tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 border-navyblue  text-left text-3xl font-medium text-white capitalize tracking-wider">
                  Link
                </th>
                <th className="px-6 py-3 border-navyblue rounded-r-xl text-left text-3xl font-medium text-white capitalize tracking-wider ">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {quizzes?.data?.map((row, index) => (
                <tr
                  key={row._id}
                  className={` min-h-[75px] w-[800px]+ ${
                    index % 2 === 1 && "bg-[#f3f3f3]"
                  }`}
                >
                  <td
                    title={row.title}
                    className="px-6 py-4 truncate max-w-[300px]  font-medium  text-3xl  whitespace-nowrap text-start"
                  >
                    {row.title}
                  </td>
                  <td className="px-6 py-4 text-xl whitespace-nowrap text-start">
                    {Date.now()}
                  </td>
                  <td className="px-6 py-4  max-w-[600px] truncate text-xl  cursor-pointer whitespace-nowrap text-start">
                    {/* <FaCopy
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
                    /> */}
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(
                          replaceInString(
                            `${window.location.origin}${APP_ROUTES.ATTEMPT_QUIZ}`,
                            { id: row._id }
                          )
                        );
                        toast.success("Quiz link copied to clipboard");
                      }}
                      title={`Click to copy`}
                    >
                      {replaceInString(
                        `${window.location.origin}${APP_ROUTES.ATTEMPT_QUIZ}`,
                        { id: row._id }
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4  text-xl  text-start">
                    <div className="flex items-center justify-start gap-4">
                      <Link
                        to={replaceInString(APP_ROUTES.EDIT_QUIZ, {
                          id: row._id,
                        })}
                        // title="Edit Form"
                      >
                        <MdEdit title="Ketan" />
                      </Link>

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
