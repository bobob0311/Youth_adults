import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Location{
    name: string,
    idx: number,
}

const initialState = {
    location: {
        name: '',
        idx: -1,
    },
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
        changeLocation: (state, action: PayloadAction<Location>) => {
            state.location = action.payload;
        },
        changeGroupInfo: (state, action) => {
            state.groupName = action.payload[0];
            state.groupSummary = action.payload[1];
        },
        changeCheck: (state, action) => {
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