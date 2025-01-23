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

    const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
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
            <section className={styles.wrapper}>
                {label}
                <div className={styles.btnContainer}>
                    {checkList.map((item, idx) => (
                        <button
                            type="button"
                            role="radio"
                            aria-checked={idx === selectedIndex ? "true" : "false"}
                            key={idx}
                            onClick={(e) => handleClick(e,idx)}
                            className={`${styles.btn} ${idx === selectedIndex ? styles.selected : ""}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </section>
        
    } else {
        const { checkList } = info;

        content =
            <div className={styles.locationContainer}>
                {
                    checkList.map((item, idx) => (
                        <button className={styles.imgBtn}
                            key={item.title}
                            onClick={(e) => handleClick(e,idx)}
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