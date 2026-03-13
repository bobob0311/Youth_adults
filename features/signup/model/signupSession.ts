import { UserState } from "@/features/signup/types/user";

const USER_KEY = "signup-user";
const STEP_KEY = "signup-step";

export const saveUserToSession = (userState: UserState) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(USER_KEY, JSON.stringify(userState));
};

export const loadUserFromSession = (): UserState | null => {
  if (typeof window === "undefined") return null;

  const data = sessionStorage.getItem(USER_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data) as UserState;
  } catch {
    return null;
  }
};

export const saveStepToSession = (step: number) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STEP_KEY, String(step));
};

export const loadStepFromSession = (): number | null => {
  if (typeof window === "undefined") return null;

  const data = sessionStorage.getItem(STEP_KEY);
  if (!data) return null;

  const parsedStep = Number(data);
  return Number.isNaN(parsedStep) ? null : parsedStep;
};

export const clearSignupSession = () => {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(STEP_KEY);
};
