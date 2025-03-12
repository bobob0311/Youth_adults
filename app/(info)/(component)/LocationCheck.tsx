'use client'
import { useState } from "react";
import styles from "./LocationCheck.module.scss";
import Image from "next/image";

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


    const handleClick = (clickedLocation: string) => {
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
                        onClick={() => handleClick(item.locationName)}
                    >
                        <span className={styles.locationName}>{item.locationName}</span>
                        <Image
                            width={170}
                            height={170}
                            className= {`${styles.locationImg} ${item.locationName === selectedLocation ? styles.selected :""}`}
                            src={item.imgUrl}
                            alt={item.locationName}
                        />
                    </button>
                ))
            }
        </div>
    )
}