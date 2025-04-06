import InputBox from "@/components/input/InputBox";
import { UserDetails } from "@/types/user";
import { GROUP_VALID } from "@/utils/dummyData";
import { useEffect, useState } from "react";

interface PropsState{
    userDetails: UserDetails;
    groupInputInfo: any;
    onSelectionChange: (newValue:string, selectedCategory: string) => void;
    onBtnValid: (isValid:boolean) => void;
}

interface Check{
    category: string;
    isChecked: boolean;
}


export default function GroupInput(props: PropsState) {
    const { userDetails, groupInputInfo, onSelectionChange, onBtnValid } = props;
    const [validArr, setValidArr] = useState<Check[]>(() => {
        return Object.entries(userDetails).map(([key, value]) => ({
            category: key as string,
            isChecked: Boolean(value),
        }))
    });
    
    useEffect(() => {
        const allValid = validArr.every((value) => value.isChecked === true);
        onBtnValid(allValid); 
    },[validArr])

    const handleValid = (category: string,isChecked:boolean) => {
        setValidArr(prevArr => {
            const updatedArr = prevArr.map(item =>
                item.category === category ? { ...item, isChecked } : item
            );
            return updatedArr;
        });
    }

    const handleChange = (newValue: string, selectedCategory:string, check:boolean) => {
        handleValid(selectedCategory, check);
        onSelectionChange(newValue, selectedCategory);
    }

    return (
        groupInputInfo.map((item) => (
            <InputBox
                key={item.label}
                inputInfo={item}
                valid={GROUP_VALID[item.category]}
                storedText={userDetails[item.category]}
                onText={(newValue, selectedCategory,check) => handleChange(newValue, selectedCategory,check)}
            />
        ))
    )    
}