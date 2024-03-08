import axios from "axios";
import { AUTH_TOKEN, request } from "../../utils";

export const Analytical_Services = {
  getQuizData: async (data) => {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    // console.log(1234);
    if (options.headers) {
      Object.assign(options.headers, { Accept: "application/json" });
      if (!options.headers.Authorization) {
        options.headers.Authorization = `Bearer ${localStorage.getItem(
          AUTH_TOKEN
        )}`;
      }
    }

    const res = axios.get(
      `http://quizzify-4.onrender.com/api/analytics/quiz/${data.id}/answer-stats`,
      options
    );
    return res;
  },
  getUserQuizData: async (data) => {
    const options = {
      method: "GET",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    // console.log(1234);
    const res = await request("/api/user_quiz_analytics.json", options);
    return res;
  },
  getAllQuizzes: async (data) => {
    const options = {
      method: "GET",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    // console.log(1234);
    const res = await request("/api/allQuizzes.json", options);
    return res;
  },
};
