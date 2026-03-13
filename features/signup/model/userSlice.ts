import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UserDetails,
  UserProfile,
  UserState,
} from "@/features/signup/types/user";

const initialState: UserState = {
  location: "",
  userProfile: {
    count: "",
    gender: "",
    age: "",
  },
  userDetails: {
    name: "",
    summary: "",
  },
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    changeUserDetail: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
    changeUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    changePhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setUserState: (_, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    resetUserState: () => initialState,
  },
});

export const {
  changeLocation,
  changeUserDetail,
  changeUserProfile,
  changePhoneNumber,
  setUserState,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
