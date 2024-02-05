import { LOGIN_SUCCESS, LOGOUT } from "./type";
import AuthService from "../services/authService";

export const loginUser = async ({username, password, dispatch}) => {

  const response = await AuthService.logIn({username: username, password: password});
    console.log("Res ", response)
    if (response?.status === "success") {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response.user },
      });
    }
  return response;
};

export const logout = async ({dispatch}) => {
  await AuthService.logOut();
  return dispatch({
        type: LOGOUT,
      });
  // return AuthService.logOut().then((response) => {
  //   if (response.status === "success") {
  //     dispatch({
  //       type: LOGOUT,
  //     });
  //     Promise.resolve();
  //     return response;
  //   }
  // });
};