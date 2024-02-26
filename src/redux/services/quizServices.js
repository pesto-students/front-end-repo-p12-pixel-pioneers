import { request } from "../../utils";

export const Quiz_Services = {
  create: async (data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    // console.log(1234);
    const res = await request(
      "https://quizzify-1.onrender.com/api/quizs",
      options
    );
    return res;
  },
};
