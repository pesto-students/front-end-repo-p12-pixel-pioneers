import { DOMAIN, request } from "../../utils";

export const Analytical_Services = {
  getQuizData: async (data) => {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    // console.log(1234);
    const res = await request(
      `${DOMAIN}/analytics/quiz/${data.id}/answer-stats`,
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
    const res = await request(`${DOMAIN}/quizs/`, options);
    return res;
  },
};
