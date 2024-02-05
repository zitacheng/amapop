import { LOGIN_SUCCESS, LOGOUT } from "../actions/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const userTmp = await AsyncStorage.getItem("user");
// console.log("ffdff user", userTmp);
// const user = JSON.parse(userTmp);
// console.log("ffdff user", user);
var initialState;

const fetchData = async () => {
  console.log("HALLO")
  try {
    const user = await AsyncStorage.getItem("user");
    console.log("RES USER ", user)
    initialState = user
  ? { isLoggedIn: true, user:JSON.parse(user)}
  : { isLoggedIn: false, user: null };

  console.log("initialState", initialState);
    // Rest of your code
  } catch (error) {
    console.error('AsyncStorage getItem error:', error);
    initialState = { isLoggedIn: false, user: null };
  }
};

fetchData();

console.log("FINISHED", initialState);

const authReducer = (state = initialState, action) => {

  const { type, payload } = action;
    switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;