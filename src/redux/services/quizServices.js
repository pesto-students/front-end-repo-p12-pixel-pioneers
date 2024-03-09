import { DOMAIN, replaceInString, request } from "../../utils";

export const Quiz_Services = {
  create: async (data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    console.log(data, "data1");
    const res = await request(`${DOMAIN}/quizs`, options);
    return res;
  },
  edit: async (data) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    console.log({ data, id: data?._id }, "data2");
    const res = await request(
      replaceInString(`${DOMAIN}/quizs/:id`, { id: data?._id }),
      options
    );
    return res;
  },
  getQuiz: async (data) => {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    console.log(data, "data3");
    const res = await request(`${DOMAIN}/quizs/questions`, options);
    return res;
  },
};
