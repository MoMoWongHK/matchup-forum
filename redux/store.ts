import { createStore, applyMiddleware, combineReducers } from "redux";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { firebaseReducer } from "react-redux-firebase";
import thunkMiddleware from "redux-thunk";
import modal from "./ModalControllerStore";

import { createLogger } from "redux-logger";
import { persistReducer } from "redux-persist";

const bindMiddleware = (middleware: any) => {
  const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === "development",
  });

  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    //middleware.push(loggerMiddleware);
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const combinedReducer = combineReducers({
  modal,
  firebase: firebaseReducer,
});

export type AppState = ReturnType<typeof combinedReducer>;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

//************************************************************************** */
function is_server() {
  return !(typeof window != "undefined" && window.document);
}

const makeStore = () => {
  if (!is_server) {
    //If it's on server side, create a store
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      timeout: 10,
      key: "nextjs",
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, reducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    ); // Creating the store again

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
