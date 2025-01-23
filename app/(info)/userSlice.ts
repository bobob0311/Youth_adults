import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    location: '',
    groupName: '',
    groupSummary: '',
    check: {
        cnt: 0,
        sex: '',
        old:'',
    },
    want: {
        cnt: 0,
        sex: '',
        old:'',
    }
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        changeLocation: (state, action) => {
            state.location = action.payload;
        },
        changeGroupInfo: (state, action) => {
            console.log(action.payload);
            state.groupName = action.payload[0];
            state.groupSummary = action.payload[1];
        },
        changeCheck: (state, action) => {
            console.log(action.payload);
            state.check.cnt = action.payload[0];
            state.check.sex = action.payload[1];
            state.check.old = action.payload[2];
        },
        changeWant: (state, action) => {
            state.want.cnt = action.payload[0];
            state.want.sex = action.payload[1];
            state.want.old = action.payload[2];
        }

    },
})

export const { changeLocation,changeGroupInfo,changeCheck,changeWant } = userSlice.actions;
export default userSlice.reducer;