import { DOMAIN, request } from "../../utils";

export const Quiz_Services = {
  create: async (data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    console.log(1234);
    const res = await request(`${DOMAIN}/quizs`, options);
    return res;
  },
};
