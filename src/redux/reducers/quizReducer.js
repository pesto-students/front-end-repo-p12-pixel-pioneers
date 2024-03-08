import { API_CONSTANTS } from "../../utils";
import {
  CREATE_QUIZ_ERROR,
  CREATE_QUIZ_LOADING,
  CREATE_QUIZ_RESET,
  CREATE_QUIZ_SUCCESS,
} from "../constants";
const initState = {
  quiz: {
    data: null,
    status: null,
  },
};
const QuizReducer = (inititalState = initState, { type, payload }) => {
  switch (type) {
    case CREATE_QUIZ_LOADING:
      return {
        ...inititalState,
        quiz: {
          status: API_CONSTANTS.loading,
          data: null,
        },
      };

    case CREATE_QUIZ_SUCCESS:
      return {
        ...inititalState,
        quiz: {
          status: API_CONSTANTS.success,
          data: payload,
        },
      };
    case CREATE_QUIZ_ERROR:
      return {
        ...inititalState,
        quiz: {
          status: API_CONSTANTS.error,
          data: payload,
        },
      };
    case CREATE_QUIZ_RESET:
      return {
        ...inititalState,
        quiz: {
          status: API_CONSTANTS.init,
          data: payload,
        },
      };

    default:
      return inititalState;
      break;
  }
};
export default QuizReducer;
