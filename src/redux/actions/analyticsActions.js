import {
  GET_ALL_QUIZZES_ERROR,
  GET_ALL_QUIZZES_LOADING,
  GET_ALL_QUIZZES_RESET,
  GET_ALL_QUIZZES_SUCCESS,
  GET_QUIZ_DATA_ERROR,
  GET_QUIZ_DATA_LOADING,
  GET_QUIZ_DATA_RESET,
  GET_QUIZ_DATA_SUCCESS,
  GET_USER_ANALYTICS_PER_QUIZ_ERROR,
  GET_USER_ANALYTICS_PER_QUIZ_LOADING,
  GET_USER_ANALYTICS_PER_QUIZ_RESET,
  GET_USER_ANALYTICS_PER_QUIZ_SUCCESS,
} from "../constants";
import { Analytical_Services } from "../services";
// import { AnalyticsServices } from "../services/AnalyticsService";

// import auth_services from "../services/auth_services";

export const defaultDispatchAction = (type, payload) => ({
  type,
  payload,
});
export const getQuizDataAction = (data) => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(GET_QUIZ_DATA_LOADING, data));
    await Analytical_Services.getQuizData(data)
      .then((result) => {
        dispatch(defaultDispatchAction(GET_QUIZ_DATA_SUCCESS, result));
      })
      .catch((error) => {
        dispatch(defaultDispatchAction(GET_QUIZ_DATA_ERROR, error));
      });
  };
};
export const resetQuizDataAction = () => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(GET_QUIZ_DATA_RESET, {}));
  };
};
export const getUserQuizDataAction = (data) => {
  return async (dispatch) => {
    await dispatch(
      defaultDispatchAction(GET_USER_ANALYTICS_PER_QUIZ_LOADING, data)
    );
    await Analytical_Services.getUserQuizData()
      .then((result) => {
        dispatch(
          defaultDispatchAction(GET_USER_ANALYTICS_PER_QUIZ_SUCCESS, result)
        );
      })
      .catch((error) => {
        dispatch(
          defaultDispatchAction(GET_USER_ANALYTICS_PER_QUIZ_ERROR, error)
        );
      });
  };
};
export const resetUserQuizDataAction = () => {
  return async (dispatch) => {
    await dispatch(
      defaultDispatchAction(GET_USER_ANALYTICS_PER_QUIZ_RESET, {})
    );
  };
};
export const getAllQuizzesAction = (data) => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(GET_ALL_QUIZZES_LOADING, data));
    await Analytical_Services.getAllQuizzes()
      .then((result) => {
        dispatch(defaultDispatchAction(GET_ALL_QUIZZES_SUCCESS, result));
      })
      .catch((error) => {
        dispatch(defaultDispatchAction(GET_ALL_QUIZZES_ERROR, error));
      });
  };
};
export const resetGetQuizzesAction = () => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(GET_ALL_QUIZZES_RESET, {}));
  };
};
