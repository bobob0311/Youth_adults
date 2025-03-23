import { getUserDataById } from "@/utils/api";
import { useEffect, useState } from "react";

interface User{
    id: string;
    member_count: string;
    gender: string;
    age: string;
    group_name: string;
    group_description: string;
    phone_number: string;
    location: string;
    matched_id: string;
    matched_name: string;
    payment: boolean;
    first_in: boolean;
}

export function useUser(userId: string) {
    const [userData, setUserData] = useState<User|null>(null);

    useEffect(() => {
        if (!userId) return;

        (async () => {
            const data = await getUserDataById(userId);
            setUserData(data);
        })();
    }, [userId]);

    return userData;
}