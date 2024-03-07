import {
  GET_QUIZ_DATA_ERROR,
  GET_QUIZ_DATA_LOADING,
  GET_QUIZ_DATA_RESET,
  GET_QUIZ_DATA_SUCCESS,
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
