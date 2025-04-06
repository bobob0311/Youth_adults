"use client"
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useSelectionState<T, V = boolean>(
  selector: (state: RootState) => T,
  initialValidValue?: V
) {
  const dispatch = useDispatch();
  const selectedValue = useSelector(selector);
  
  const [isValid, setIsValid] = useState<V>(
    (initialValidValue ?? false) as V
  );

  return { selectedValue, dispatch, isValid, setIsValid };
}
