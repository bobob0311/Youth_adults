export interface PhoneInputInfo {
  category: string;
  label: string;
  inputType: string;
  placeholder: string;
  limit?: number;
}

export interface PhoneValidCondition {
  onInputCondition: (text: string) => boolean;
  onValidCondition: (text: string) => boolean;
}

export type VerificationStatus = "idle" | "success" | "fail";
