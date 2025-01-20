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
    // 선택된게 다시 선택될 경우 지울 수 있게?

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
        
        content = <div>
            <div>{label}</div>
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
    } else {
        const { checkList } = info;

        content = <div>
            {
                checkList.map((item, idx) => (
                    <button
                        key={item.title}
                        onClick={() => handleClick(idx)}
                    >
                        <h2>{item.title}</h2>
                        <img src={item.url}></img>
                    </button>
                ))
            }
        </div>
    }


    return (
        content
    );
    
}