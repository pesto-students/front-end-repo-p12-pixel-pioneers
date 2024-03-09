import { API_CONSTANTS } from "../../utils";
import {
  CREATE_QUIZ_ERROR,
  CREATE_QUIZ_LOADING,
  CREATE_QUIZ_RESET,
  CREATE_QUIZ_SUCCESS,
  EDIT_QUIZ_ERROR,
  EDIT_QUIZ_LOADING,
  EDIT_QUIZ_RESET,
  EDIT_QUIZ_SUCCESS,
  GET_ALL_QUIZZES_RESET,
  GET_RENDER_QUIZ_ERROR,
  GET_RENDER_QUIZ_LOADING,
  GET_RENDER_QUIZ_SUCCESS,
  GET_WHOLE_QUIZ_ERROR,
  GET_WHOLE_QUIZ_LOADING,
  GET_WHOLE_QUIZ_RESET,
  GET_WHOLE_QUIZ_SUCCESS,
} from "../constants";
const initState = {
  quiz: {
    data: null,
    status: null,
  },
  editQuiz: {
    data: null,
    status: null,
  },
  wholeQuiz: {
    data: null,
    status: null,
  },
  renderQuiz: {
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
    case EDIT_QUIZ_LOADING:
      return {
        ...inititalState,
        editQuiz: {
          status: API_CONSTANTS.loading,
          data: null,
        },
      };

    case EDIT_QUIZ_SUCCESS:
      return {
        ...inititalState,
        editQuiz: {
          status: API_CONSTANTS.success,
          data: payload,
        },
      };
    case EDIT_QUIZ_ERROR:
      return {
        ...inititalState,
        editQuiz: {
          status: API_CONSTANTS.error,
          data: payload,
        },
      };
    case EDIT_QUIZ_RESET:
      return {
        ...inititalState,
        editQuiz: {
          status: API_CONSTANTS.init,
          data: payload,
        },
      };
    case GET_WHOLE_QUIZ_LOADING:
      return {
        ...inititalState,
        wholeQuiz: {
          status: API_CONSTANTS.loading,
          data: null,
        },
      };

    case GET_WHOLE_QUIZ_SUCCESS:
      return {
        ...inititalState,
        wholeQuiz: {
          status: API_CONSTANTS.success,
          data: payload,
        },
      };
    case GET_WHOLE_QUIZ_ERROR:
      return {
        ...inititalState,
        wholeQuiz: {
          status: API_CONSTANTS.error,
          data: payload,
        },
      };
    case GET_WHOLE_QUIZ_RESET:
      return {
        ...inititalState,
        wholeQuiz: {
          status: API_CONSTANTS.init,
          data: payload,
        },
      };
    case GET_RENDER_QUIZ_LOADING:
      return {
        ...inititalState,
        renderQuiz: {
          status: API_CONSTANTS.loading,
          data: null,
        },
      };

    case GET_RENDER_QUIZ_SUCCESS:
      return {
        ...inititalState,
        renderQuiz: {
          status: API_CONSTANTS.success,
          data: payload,
        },
      };
    case GET_RENDER_QUIZ_ERROR:
      return {
        ...inititalState,
        renderQuiz: {
          status: API_CONSTANTS.error,
          data: payload,
        },
      };
    case GET_ALL_QUIZZES_RESET:
      return {
        ...inititalState,
        renderQuiz: {
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
