import {
  CREATE_QUIZ_ERROR,
  CREATE_QUIZ_LOADING,
  CREATE_QUIZ_SUCCESS,
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
