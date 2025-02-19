import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Location {
    name: string;
    idx: number;
}
interface UserInfo {
    cnt: string;
    sex: string;
    old: string;
    [key: string]: string;
}
interface GroupInfo{
    name: string;
    summary: string;
    [key: string]: string;
}
interface InitialState {
    location: Location;
    userInfo: UserInfo;
    groupInfo: GroupInfo;
    phoneNumber: number | undefined;
}

const initialState: InitialState = {
    location: {
        name: '',
        idx: -1,
    },
    userInfo: {
        cnt: '',
        sex: '',
        old: '',
    },
    groupInfo: {
        name: '',
        summary: '',    
    },
    phoneNumber: undefined,
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        changeLocation: (state, action: PayloadAction<Location>) => {
            state.location = action.payload;
        },
        changeGroupInfo: (state, action: PayloadAction<GroupInfo>) => {
            state.groupInfo.name = action.payload.name;
            state.groupInfo.summary = action.payload.summary;
        },
        changeUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo.cnt = action.payload.cnt;
            state.userInfo.sex = action.payload.sex;
            state.userInfo.old = action.payload.old;
        },
        changePhoneNumber: (state, action: PayloadAction<number>) => {
            state.phoneNumber = action.payload;
        }
    },
})

export const { changeLocation,changeGroupInfo,changeUserInfo,changePhoneNumber } = userSlice.actions;
export default userSlice.reducer;