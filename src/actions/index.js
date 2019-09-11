import { TOGGLE_THEME } from "./actionTypes";
import { DETAILED_VIEW } from "./actionTypes";
export const toggleTheme = theme => ({
  type: TOGGLE_THEME,
  payload: theme
});
export const detailedView = option => ({
  type: DETAILED_VIEW,
  payload: option
});
