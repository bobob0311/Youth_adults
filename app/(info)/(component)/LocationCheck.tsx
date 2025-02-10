'use client'
import { useState } from "react";
import styles from "./LocationCheck.module.scss";

interface PropsState{
    locationInfo: Location[];
    storedIdx: number;
    onValid: (isValid: boolean) => void;
    onLocationChange: (idx: number) => void;
}

interface Location{
    locationName: string;
    imgUrl: string;
}

export default function LocationCheckButton(props: PropsState) {
    const { locationInfo,storedIdx, onValid, onLocationChange } = props;
    const [selectedIdx, setSelectedIdx] = useState<number>(storedIdx);


    const handleClick = (event: React.MouseEvent<HTMLElement>, clickedIdx: number) => {
        if (selectedIdx == clickedIdx) {
            setSelectedIdx(-1);
            onValid(false);
            onLocationChange(-1);
        } else {
            setSelectedIdx(clickedIdx);
            onValid(true)
            onLocationChange(clickedIdx);
        }
    }

    return (
        <div className={styles.locationContainer}>
            {
                locationInfo.map((item, idx) => (
                    <button className={styles.imgBtn}
                        key={item.locationName}
                        onClick={(e) => handleClick(e,idx)}
                    >
                        <img
                            className={`${styles.locationImg} ${idx === selectedIdx ? styles.selected :""}`}
                            src={item.imgUrl}
                            alt={item.locationName}
                        />
                    </button>
                ))
            }
        </div>
    )
}