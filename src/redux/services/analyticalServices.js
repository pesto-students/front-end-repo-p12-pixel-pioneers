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
};
