import { configureStore } from "@reduxjs/toolkit";
import { platosReducer } from "../reducers/platosReducer";
import { restaurantesReducer } from "../reducers/restaurantesReducers";
import { userReducer } from '../reducers/userReducer';
const reducer = {
  userStore: userReducer,
  restaurantStore:restaurantesReducer,
  platosStore:platosReducer
};
const store = configureStore({
  reducer,
  devTool: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
