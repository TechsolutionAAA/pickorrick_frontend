import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import votestatusReducer from "./reducers/votestatusReducer";
import walletstatusReducer from "./reducers/walletstatusReducer";
import pakstatusReducer from "./reducers/pakstatusReducer";

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  auth: authReducer,
  votestatus: votestatusReducer,
  walletstatus: walletstatusReducer,
  pakstatus: pakstatusReducer,
});

const configureStore = () => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware)
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      // window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
};

export default configureStore;
