import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { authStateReducer } from "./src/Login/Login";

const reducers = combineReducers({
    authState: authStateReducer
  }),
  store = createStore(reducers),
  appRootComponent = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

AppRegistry.registerComponent(appName, () => appRootComponent);
