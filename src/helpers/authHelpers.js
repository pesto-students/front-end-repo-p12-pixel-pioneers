import { AUTH_TOKEN } from "../utils";

export const AuthHelpers = {
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN);
  },
  login: (token) => {
    // Add api for login
    localStorage.setItem(AUTH_TOKEN, token);
  },
  signup: () => {
    // addd api for signup
  },
  logout: (type) => {
    if (AuthHelpers.isAuthenticated()) {
      console.log(AuthHelpers.isAuthenticated());
      if (!type) {
        // window.location.href = getAuthRoute();
      } else {
        // redirectToUrl(getAuthRoute());
      }
      localStorage.removeItem(AUTH_TOKEN);
    }
  },
};
