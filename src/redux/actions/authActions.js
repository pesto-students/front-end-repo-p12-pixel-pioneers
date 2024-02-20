import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_RESET,
  LOGIN_SUCCESS,
} from "../constants";
import { Auth_Services } from "../services";

// import auth_services from "../services/auth_services";

const defaultDispatchAction = (type, payload) => ({
  type,
  payload,
});
export const loginAction = (data) => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(LOGIN_LOADING, data));
    await Auth_Services.login(data)
      .then((result) => {
        dispatch(defaultDispatchAction(LOGIN_SUCCESS, result));
      })
      .catch((error) => {
        dispatch(defaultDispatchAction(LOGIN_ERROR, error));
      });
  };
};
export const resetLoginAction = () => {
  return async (dispatch) => {
    await dispatch(defaultDispatchAction(LOGIN_RESET, {}));
  };
};
