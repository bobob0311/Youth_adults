'use client'
import { useEffect, useState } from "react";
import styles from "./CheckButtons.module.scss"
import Image from "next/image";

interface PropsState {
    info: LabelInfo | LocationInfo;
    onChangeState: (input:string) => void;
    onValid?: (isValid: boolean) => void;
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
    const { info,onChangeState,onValid } = props;
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const handleClick = (event: React.MouseEvent<HTMLElement>, index: number,item: string) => {
        if (selectedIndex == index) {
            setSelectedIndex(-1);
            onChangeState('');
        } else {
            setSelectedIndex(index);
            onChangeState(item);
        }
    }

    useEffect(() => {
        if (onValid) {
            if (selectedIndex === -1) {
                onValid(false);
            } else {
                onValid(true);
            }    
        }
    },[selectedIndex])

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
                            onClick={(e) => handleClick(e,idx,item)}
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
                            onClick={(e) => handleClick(e,idx,item.title)}
                        >
                            <Image
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