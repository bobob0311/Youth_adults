'use client'

import { useState } from "react";
import styles from "./ListCheck.module.scss"

interface PropsState{
    listInfo: ListInfo;
    storedIdx: number;
    onValid: (selectedId: string, isValid: boolean) => void;
    onSeletedChange: (id: string, selected: string) => void;
}

interface ListInfo{
    label: string;
    checkList: string[]
    id: string;
}



export default function ListCheckButton(props: PropsState) {
    const { listInfo, storedIdx,onValid,onSeletedChange } = props;
    const [selectedIdx, setSelectedIdx] = useState<number>(storedIdx);
    
    const handleClick = (clickedIdx: number, clickedItem: string,id: string = listInfo.id) => {
        if (selectedIdx == clickedIdx) {
            setSelectedIdx(-1);
            onValid(id,false);
            onSeletedChange(id, clickedItem);
        } else {
            setSelectedIdx(clickedIdx);
            onValid(id,true)
            onSeletedChange(id, clickedItem);
        }
    }

    return (
        <section className={styles.container}>
            {listInfo.label}
            <div>
                {listInfo.checkList.map((item, idx) => (
                    <button
                        className={`${styles.btn} ${idx === selectedIdx ? styles.selected : ""}`}
                        key={item}
                        type="button"
                        role="radio"
                        aria-checked={idx === selectedIdx ? "true" : "false"}
                        onClick={(e) => handleClick(idx,item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </section>
    )
}