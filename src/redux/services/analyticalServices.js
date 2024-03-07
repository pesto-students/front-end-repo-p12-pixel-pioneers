import { request } from "../../utils";

export const Analytical_Services = {
  getQuizData: async (data) => {
    const options = {
      method: "GET",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    // console.log(1234);
    const res = await request("/api/quiz_details.json", options);
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
