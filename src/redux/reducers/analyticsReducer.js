import { API_CONSTANTS } from "../../utils";
import {
  GET_QUIZ_DATA_LOADING,
  GET_QUIZ_DATA_ERROR,
  GET_QUIZ_DATA_SUCCESS,
  GET_QUIZ_DATA_RESET,
} from "../constants";
const initState = {
  quizData: {
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

    default:
      return inititalState;
      break;
  }
};
export default AnalyticsReducer;
