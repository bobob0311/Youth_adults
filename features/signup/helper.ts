import type { UserDetails } from "./types/user";
import { GROUP_VALID_CONDITION } from "./constants";

export function isUserDetailsValid(userDetails: UserDetails) {
  return Object.entries(userDetails).every(([category, value]) => {
    const trimmedValue = typeof value === "string" ? value.trim() : "";
    const validator = GROUP_VALID_CONDITION[category as keyof UserDetails];

    if (!trimmedValue) return false;
    if (!validator) return true;

    return validator.onValidCondition(trimmedValue);
  });
}
