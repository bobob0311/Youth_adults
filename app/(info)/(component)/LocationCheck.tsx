'use client'
import { useState } from "react";
import styles from "./LocationCheck.module.scss";

interface PropsState{
    locationInfo: Location[];
    storedLocation: string;
    onLocationChange: (location: string) => void;
}

interface Location{
    locationName: string;
    imgUrl: string;
}

export default function LocationCheckButton(props: PropsState) {
    const { locationInfo, storedLocation, onLocationChange } = props;
    const [selectedLocation, setSelectedLocation] = useState<string>(storedLocation);


    const handleClick = (event: React.MouseEvent<HTMLElement>, clickedLocation: string) => {
        if (selectedLocation == clickedLocation) {
            setSelectedLocation('');
            onLocationChange('');
        } else {
            setSelectedLocation(clickedLocation);
            onLocationChange(clickedLocation);
        }
    }

    return (
        <div className={styles.locationContainer}>
            {
                locationInfo.map((item) => (
                    <button className={styles.imgBtn}
                        key={item.locationName}
                        onClick={(e) => handleClick(e,item.locationName)}
                        aria-checked={item.locationName === selectedLocation ? "true" : "false"}
                    >
                        <span className={styles.locationName}>{item.locationName}</span>
                        <img
                            className={`${styles.locationImg} ${item.locationName === selectedLocation ? styles.selected :""}`}
                            src={item.imgUrl}
                            alt={item.locationName}
                        />
                    </button>
                ))
            }
        </div>
    )
}