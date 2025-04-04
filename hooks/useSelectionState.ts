"use client"
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useSelectionState<T>(slector: (state: RootState) => T) {
    const dispatch = useDispatch();
    const selectedValue = useSelector(slector);
    const [isValid, setIsValid] = useState<boolean>(false);

    return { selectedValue, dispatch, isValid,setIsValid}
}