import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getQuizDataAction,
  getUserQuizDataAction,
  resetQuizDataAction,
  resetUserQuizDataAction,
} from "../../../redux/actions";
import { FaExternalLinkAlt } from "react-icons/fa";
import { APP_ROUTES, replaceInString } from "../../../utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import PageTitle from "../../PageTitle";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const UserAnalyticsPerQuiz = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  //   ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);
  const quizData = useSelector((state) => state.analytics.userQuizData);

  console.log(quizData, "quizData");
  const quiz_id = params?.id;
  const user = params?.user;

  useEffect(() => {
    if (quiz_id && user) {
      dispatch(getUserQuizDataAction({ id: quiz_id, user }));
    }
  }, [params]);
  useEffect(() => {
    return () => {
      dispatch(resetUserQuizDataAction());
    };
  }, []);
  //   const quizData = [
  //     {
  //       question: "What is the capital of France?",
  //       correctAnswer: "Paris",
  //       userAnswer: 0,
  //       isCorrect: true,
  //     },
  //     {
  //       question: "What is the largest planet in our solar system?",
  //       correctAnswer: "Jupiter",
  //       userAnswer: 1,
  //       isCorrect: true,
  //     },
  //     {
  //       question: "Do you like this quiz?",
  //       correctAnswer: "Yes",
  //       userAnswer: 0,
  //       isCorrect: false,
  //     },
  //   ];

  const labels = quizData?.data?.map((data) => data.question);

  const barchartData = {
    labels,
    // datasets: Object.keys(resultPercentage),
    datasets: [
      {
        label: ["Total answers", "Total answers222"],
        data: quizData?.data?.map((data) => (data.isCorrect ? "10" : "-10")),
        backgroundColor: quizData?.data?.map((data) =>
          data.isCorrect ? "#198754" : "rgb(239, 68 ,68 )"
        ),

        // backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        // borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      y: {
        min: -10,
        max: 10,
        ticks: {
          display: false, // Hide the ticks
        },
        grid: {
          lineWidth: 1,
          //   drawTicks: false,
          color: (context) =>
            context.tick.value === 0 ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)",
          drawOnChartArea: true,
        },
        // grid: {
        //   drawOnChartArea: true,
        //   //   display: true,
        //   //   drawBorder: false,
        //   color: ["rgba(0, 0, 0, 0)"],
        //   zeroLineColor: "rgba(0, 0, 0, 1)",
        //   borderWidth: 1,
        // },
      },
      x: {
        // ticks: {
        //   display: false, // Hide the ticks
        // },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      //   legend: {
      //     position: "top",
      //   },
      tooltip: {
        enabled: false, // <-- this option disables tooltips
      },
      title: {
        display: false, // Hide dataset label
      },
      legend: {
        display: false,
      },
      //   title: {
      //     display: true,
      //     text: "CBar Chart",
      //   },
    },
  };
  return (
    <div>
      <PageTitle text={` Analytics for : ${user}`} />
      <section>
        {/* <Bar data={barchartData} options={options} /> */}

        <table className="min-w-full divide-y border divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 w-[70%] border border-gray-300 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
              >
                Question
              </th>
              <th
                scope="col"
                className="px-6 w-[10%] border border-gray-300 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
              >
                Submitted Answer
              </th>
              <th
                scope="col"
                className="px-6 w-[10%] border border-gray-300 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
              >
                Correct Answer
              </th>
              <th
                scope="col"
                className="px-6 w-[10%] border border-gray-300 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
              >
                Result
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quizData?.data?.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border border-gray-300 whitespace-nowrap text-start">
                  {row.question}
                </td>
                <td className="px-6 py-4 border border-gray-300 whitespace-nowrap text-start">
                  {row.userAnswer}
                </td>
                <td className="px-6 py-4 border border-gray-300 whitespace-nowrap text-start">
                  {row.correctAnswer}
                </td>
                <td className="px-6 uppercase font-medium py-4 border border-gray-300 whitespace-nowrap text-start">
                  {row.isCorrect ? "Correct ✅" : "Incorrect ❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserAnalyticsPerQuiz;
