import { API_CONSTANTS } from "../../utils";
import {
  GET_QUIZ_DATA_LOADING,
  GET_QUIZ_DATA_ERROR,
  GET_QUIZ_DATA_SUCCESS,
  GET_QUIZ_DATA_RESET,
  GET_USER_ANALYTICS_PER_QUIZ_LOADING,
  GET_USER_ANALYTICS_PER_QUIZ_SUCCESS,
  GET_USER_ANALYTICS_PER_QUIZ_ERROR,
  GET_USER_ANALYTICS_PER_QUIZ_RESET,
  GET_ALL_QUIZZES_LOADING,
  GET_ALL_QUIZZES_SUCCESS,
  GET_ALL_QUIZZES_ERROR,
  GET_ALL_QUIZZES_RESET,
} from "../constants";
const initState = {
  quizData: {
    data: null,
    status: null,
  },
  userQuizData: {
    data: null,
    status: null,
  },
  quizzes: {
    data: null,
    status: null,
  },
};
const AnalyticsReducer = (inititalState = initState, { type, payload }) => {
  switch (type) {
    case GET_QUIZ_DATA_LOADING:
      return {
        ...inititalState,
        quizData: {
          status: API_CONSTANTS.loading,
          data: null,
        },
      };

    case GET_QUIZ_DATA_SUCCESS:
      return {
        ...inititalState,
        quizData: {
          status: API_CONSTANTS.success,
          data: payload,
        },
      };
    case GET_QUIZ_DATA_ERROR:
      return {
        ...inititalState,
        quizData: {
          status: API_CONSTANTS.error,
          data: payload,
        },
      };
    case GET_QUIZ_DATA_RESET:
      return {
        ...inititalState,
        quizData: {
          status: API_CONSTANTS.init,
          data: null,
        },
      };
    case GET_USER_ANALYTICS_PER_QUIZ_LOADING:
      return {
        ...inititalState,
        userQuizData: {
          status: API_CONSTANTS.loading,
          data: null,
        },
      };

    case GET_USER_ANALYTICS_PER_QUIZ_SUCCESS:
      return {
        ...inititalState,
        userQuizData: {
          status: API_CONSTANTS.success,
          data: payload,
        },
      };
    case GET_USER_ANALYTICS_PER_QUIZ_ERROR:
      return {
        ...inititalState,
        userQuizData: {
          status: API_CONSTANTS.error,
          data: payload,
        },
      };
    case GET_USER_ANALYTICS_PER_QUIZ_RESET:
      return {
        ...inititalState,
        userQuizData: {
          status: API_CONSTANTS.init,
          data: null,
        },
      };
    case GET_ALL_QUIZZES_LOADING:
      return {
        ...inititalState,
        quizzes: {
          status: API_CONSTANTS.loading,
          data: null,
        },
      };

    case GET_ALL_QUIZZES_SUCCESS:
      return {
        ...inititalState,
        quizzes: {
          status: API_CONSTANTS.success,
          data: payload,
        },
      };
    case GET_ALL_QUIZZES_ERROR:
      return {
        ...inititalState,
        quizzes: {
          status: API_CONSTANTS.error,
          data: payload,
        },
      };
    case GET_ALL_QUIZZES_RESET:
      return {
        ...inititalState,
        quizzes: {
          status: API_CONSTANTS.init,
          data: null,
        },
      };

    default:
      return inititalState;
      break;
  }
};
export default AnalyticsReducer;
