import {
  CREATE_QUIZ_ERROR,
  CREATE_QUIZ_LOADING,
  CREATE_QUIZ_RESET,
  CREATE_QUIZ_SUCCESS,
  EDIT_QUIZ_ERROR,
  EDIT_QUIZ_LOADING,
  EDIT_QUIZ_RESET,
  EDIT_QUIZ_SUCCESS,
  GET_WHOLE_QUIZ_ERROR,
  GET_WHOLE_QUIZ_LOADING,
  GET_WHOLE_QUIZ_RESET,
  GET_WHOLE_QUIZ_SUCCESS,
} from "../constants";
import { Quiz_Services } from "../services/quizServices";
import { defaultDispatchAction } from "./authActions";

export const createQuizAction = (data) => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(CREATE_QUIZ_LOADING, data));
    await Quiz_Services.create(data)
      .then((result) => {
        dispatch(defaultDispatchAction(CREATE_QUIZ_SUCCESS, result));
      })
      .catch((error) => {
        dispatch(defaultDispatchAction(CREATE_QUIZ_ERROR, error));
      });
  };
};
export const resetCreateQuizAction = () => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(CREATE_QUIZ_RESET, {}));
  };
};
export const editQuizAction = (data) => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(EDIT_QUIZ_LOADING, data));
    await Quiz_Services.edit(data)
      .then((result) => {
        dispatch(defaultDispatchAction(EDIT_QUIZ_SUCCESS, result));
      })
      .catch((error) => {
        dispatch(defaultDispatchAction(EDIT_QUIZ_ERROR, error));
      });
  };
};
export const resetEditQuizAction = () => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(EDIT_QUIZ_RESET, {}));
  };
};
export const getWholeQuizAction = (data) => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(GET_WHOLE_QUIZ_LOADING, data));
    await Quiz_Services.getQuiz(data)
      .then((result) => {
        dispatch(defaultDispatchAction(GET_WHOLE_QUIZ_SUCCESS, result));
      })
      .catch((error) => {
        dispatch(defaultDispatchAction(GET_WHOLE_QUIZ_ERROR, error));
      });
  };
};
export const resetGetWholeQuizAction = () => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(GET_WHOLE_QUIZ_RESET, {}));
  };
};
