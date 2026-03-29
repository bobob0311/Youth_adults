import { LocationValue } from "../constants/location";

interface UserState {
  location: LocationValue;
  userProfile: UserProfile;
  userDetails: UserDetails;
  phoneNumber: string;
}

interface UserProfile {
  count: string;
  gender: string;
  age: string;
}

interface UserDetails {
  name: string;
  summary: string;
}

export { UserDetails, UserProfile, UserState };
