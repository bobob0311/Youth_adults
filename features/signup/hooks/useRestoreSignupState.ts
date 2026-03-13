"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUserState } from "@/features/signup/model/userSlice";
import { setStep } from "@/features/signup/model/stepSlice";
import {
  loadStepFromSession,
  loadUserFromSession,
} from "@/features/signup/model/signupSession";

export default function useRestoreSignupState() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedUser = loadUserFromSession();
    const savedStep = loadStepFromSession();

    if (savedUser) {
      dispatch(setUserState(savedUser));
    }

    if (savedStep) {
      dispatch(setStep(savedStep));
    }
  }, [dispatch]);
}
