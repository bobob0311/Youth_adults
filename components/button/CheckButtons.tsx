'use client'
import { useState } from "react";
import styles from "./CheckButtons.module.scss"

interface PropsState {
    label: string;
    checkList: string[];
}

export default function CheckButton(props: PropsState) {
    const { label, checkList } = props;
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleClick = (index: number) => {
        setSelectedIndex(index);
        console.log("zz");
        console.log(selectedIndex);
    }
    return (
        <div>
            {checkList.map((item, idx) => (
                <button
                    key={idx}
                    onClick={() => handleClick(idx)}
                    className={`${styles.btn} ${idx === selectedIndex ? styles.selected : ""}`}
                >
                    {item}
                </button>
            ))}
        </div>
    );
    
}