'use client'

import { useState } from "react";
import styles from "./ListCheck.module.scss"

type Category = "count" | "gender" | "age";

interface PropsState{
    listInfo: ListInfo;
    storedItem: string;
    onValid: (selectedCategory: Category, isValid: boolean) => void;
    onSeletedChange: (category: Category, selected: string) => void;
}

interface ListInfo{
    label: string;
    checkList: string[]
    category: Category;
}



export default function ListCheckButton(props: PropsState) {
    const { listInfo, storedItem,onValid,onSeletedChange } = props;
    const [selectedItem, setSelectedItem] = useState<string>(storedItem);
    
    const handleClick = (clickedItem: string, category: Category = listInfo.category) => {
        if (selectedItem == clickedItem) {
            setSelectedItem('');
            onValid(category,false);
            onSeletedChange(category, clickedItem);
        } else {
            setSelectedItem(clickedItem);
            onValid(category,true)
            onSeletedChange(category, clickedItem);
        }
    }

    return (
        <section className={styles.container}>
            {listInfo.label}
            <div>
                {listInfo.checkList.map((item) => (
                    <button
                        className={`${styles.btn} ${item === selectedItem ? styles.selected : ""}`}
                        key={item}
                        type="button"
                        role="radio"
                        aria-checked={item === selectedItem ? "true" : "false"}
                        onClick={() => handleClick(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </section>
    )
}