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
interface Want {
    cnt: number;
    sex: string;
    old: string;
}
interface InitialState {
    location: Location;
    userInfo: UserInfo;
    groupName: string;
    groupSummary: string;
    want: Want;
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
    groupName: '',
    groupSummary: '',
    want: {
        cnt: 0,
        sex: '',
        old: '',
    }
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        changeLocation: (state, action: PayloadAction<Location>) => {
            state.location = action.payload;
        },
        changeGroupInfo: (state, action) => {
            state.groupName = action.payload[0];
            state.groupSummary = action.payload[1];
        },
        changeUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo.cnt = action.payload.cnt;
            state.userInfo.sex = action.payload.sex;
            state.userInfo.old = action.payload.old;
        },
        changeWant: (state, action) => {
            state.want.cnt = action.payload[0];
            state.want.sex = action.payload[1];
            state.want.old = action.payload[2];
        }

    },
})

export const { changeLocation,changeGroupInfo,changeUserInfo,changeWant } = userSlice.actions;
export default userSlice.reducer;