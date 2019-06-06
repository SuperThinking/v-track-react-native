import { colors } from "../theme";
import { combineReducers } from "redux";
const authStateReducer = (
  state = { app_started: false, authenticated: false },
  { type, payload }
) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      return { ...state, authenticated: true };
    case "LOGOUT":
      return { ...state, authenticated: false };
    case "APP_LOADED":
      return { ...state, app_started: true };
    default:
      return state;
  }
};
const initialTheme = { colorData: colors.lightColors };
const Theme = (state = initialTheme, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      switch (action.payload) {
        case "LIGHT":
          return { colorData: colors.darkColors };
        case "DARK":
          return { colorData: colors.lightColors };
      }
    default:
      return state;
  }
};

const reducer = combineReducers({
  authState: authStateReducer,
  Theme
});

export default reducer;