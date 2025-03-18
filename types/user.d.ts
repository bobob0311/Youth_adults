interface UserState {
    location: string;
    userProfile: UserProfile;
    userDetails: UserDetails;
    phoneNumber: string;
}

interface UserProfile{
    count: string;
    gender: string;
    age: string;
}

interface UserDetails{
    name: string;
    summary: string;
}

export {UserDetails, UserProfile, UserState}