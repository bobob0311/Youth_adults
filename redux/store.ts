import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/signup/model/userSlice";
import stepReducer from "../features/signup/model/stepSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      step: stepReducer,
    },
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
