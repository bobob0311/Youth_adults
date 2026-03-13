import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepState {
  currentStep: number;
}

const initialState: StepState = {
  currentStep: 1,
};

const stepSlice = createSlice({
  name: "signupStep",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    resetStep: () => initialState,
  },
});

export const { setStep, resetStep } = stepSlice.actions;
export default stepSlice.reducer;
