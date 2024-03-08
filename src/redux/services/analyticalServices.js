import { DOMAIN, replaceInString, request } from "../../utils";

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
      //   body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    console.log(data, "ketan");
    const res = await request(
      replaceInString(
        `${DOMAIN}/analytics/quiz/:id/user/:user/answer-details`,
        data
      ),
      options
    );
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
    const res = await request(`${DOMAIN}/quizs/`, options);
    return res;
  },
};
