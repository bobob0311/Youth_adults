'use client'

import { useEffect, useState } from "react";
import ListCheckButton from "../(component)/ListCheck";
import { UserProfile } from "@/types/user";

interface SelectionGroupProps {
    userProfile: UserProfile;
    listInfo: { category: string; label: string; checkList: string[] }[];
    onSelectionChange: (category: string, selected: string) => void;
    onBtnValid: (isValid: boolean) => void;
}

interface Check{
    category: string,
    isChecked: boolean,
}

export default function SelectionGroup({ userProfile, listInfo, onSelectionChange, onBtnValid }: SelectionGroupProps) {
    const [validArr, setValidArr] = useState<Check[]>(() => {
        return Object.entries(userProfile).map(([key, value]) => ({
            category: key as string,
            isChecked: Boolean(value),
        }))
    });

    useEffect(() => {
        const allValid = validArr.every((value) => value.isChecked === true);
        onBtnValid(allValid); 
    },[validArr])
    
    const handleValid = (category:string, isChecked:boolean) => {
        setValidArr(prevArr => {
            const updatedArr = prevArr.map(item =>
                item.category === category ? { ...item, isChecked } : item
            );
            return updatedArr;
        });
    }

    return (
        <>
            {listInfo.map((item) => (
                <ListCheckButton
                    key={item.label}
                    listInfo={item}
                    storedItem={userProfile[item.category] ?? ""}
                    onValid={(category, chk) => handleValid(category, chk)}
                    onSeletedChange={(category, selectedItem) => onSelectionChange(category, selectedItem)}
                />
            ))}
        </>
    );
}