export const API_CONSTANTS = {
  init: null,
  loading: 0,
  success: 1,
  error: -1,
};
export const APP_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgotpassword",
  ONBOARDING: "/onboarding",
  HOME: "/",
  LOGOUT: "/logout",
  QUIZZES: "/quizzes",
  VIEW_QUIZ_ANALYTICS: "/analytics/quiz/:id",
  VIEW_USER_ANALYTICS_FOR_QUIZ: "/analytics/quiz/:id/users/:user",
  MANUAL_MODE: "/create-manual",
  AI_MODE: "/create-ai",
  EDIT_QUIZ: "/edit-quiz/:id",
  ATTEMPT_QUIZ: "/attempt/:id",
};

export const AUTH_TOKEN = "authenticationToken";
export const DOMAIN = "https://quizzify-4.onrender.com/api";
