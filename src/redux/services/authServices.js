import { request } from "../../utils";

export const Auth_Services = {
  login: async (data) => {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    console.log(1234);
    const res = await request("/api/login.json", options);
    return res;
  },
};
