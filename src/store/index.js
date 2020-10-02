// import { createStore, compose, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import reducers from "../reducers";

import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist"; 
import { AsyncStorage } from "react-native";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["items"],
};
const persitedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persitedReducer, //reducers
  {}, //default state
  compose(applyMiddleware(thunk))
);

export default store;
