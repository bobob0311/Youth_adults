'use client'
import { useState } from "react";
import styles from "./CheckButtons.module.scss"

interface PropsState {
    info: LabelInfo | LocationInfo;
}

interface LabelInfo {
    type: "label";
    label: string;
    checkList: string[];
}

interface LocationInfo{
    type: "location";
    checkList: Location[];
}

interface Location{
    title: string;
    url: string;
}

export default function CheckButton(props: PropsState) {
    const { info } = props;
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    // selectedIndex가 -1이 아니면 true를 위로 넘길 수 있게 로직설정

    const handleClick = (index: number) => {
        if (selectedIndex == index) {
            setSelectedIndex(-1);
        } else {
            setSelectedIndex(index);    
        }
        
    }

    let content;

    if (info.type === "label") {
        const { label, checkList } = info;
        
        content = 
            <label className={styles.wrapper}>
                {label}
                <div className={styles.btnContainer}>
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
            </label>
        
    } else {
        const { checkList } = info;

        content = <div>
            {
                checkList.map((item, idx) => (
                    <button className={styles.imgBtn}
                        key={item.title}
                        onClick={() => handleClick(idx)}
                    >
                        <img
                            className={`${styles.locationImg} ${idx === selectedIndex ? styles.imgSelected :""}`}
                            src={item.url}
                            alt={item.title}
                        />
                    </button>
                ))
            }
        </div>
    }


    return (
        content
    );
    
}