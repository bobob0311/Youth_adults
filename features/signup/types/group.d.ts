import { UserDetails } from "./user";

export interface GroupInputInfo {
  category: keyof UserDetails;
  label: string;
  inputType: string;
  placeholder: string;
  limit?: number;
}
