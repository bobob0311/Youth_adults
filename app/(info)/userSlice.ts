import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {UserDetails, UserProfile, UserState} from "@/types/user"


const initialState: UserState = {
    location: '',
    userProfile: {
        count: '',
        gender: '',
        age: '',
    },
    userDetails: {
        name: '',
        summary: '',    
    },
    phoneNumber: '',
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        changeLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },
        changeUserDetail: (state, action: PayloadAction<UserDetails>) => {
            state.userDetails.name = action.payload.name;
            state.userDetails.summary = action.payload.summary;
        },
        changeUserProfile: (state, action: PayloadAction<UserProfile>) => {
            state.userProfile.count = action.payload.count;
            state.userProfile.gender = action.payload.gender;
            state.userProfile.age = action.payload.age;
        },
        changePhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        }
    },
})

export const { changeLocation,changeUserDetail,changeUserProfile,changePhoneNumber } = userSlice.actions;
export default userSlice.reducer;