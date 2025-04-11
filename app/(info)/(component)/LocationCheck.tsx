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
    block: boolean;
}

export default function LocationCheckButton({
    locationInfo,
    storedLocation,
    onLocationChange,
}: PropsState) {
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
                    <button className={`${styles.imgBtn} ${item.block ? styles.blocked : ''}`}
                        key={item.locationName}
                        onClick={item.block? undefined :() => handleClick(item.locationName)}
                    >
                        <span className={styles.locationName}>{item.locationName}</span>
                        <Image
                            width={170}
                            height={170}
                            className= {`${styles.locationImg} ${item.locationName === selectedLocation ? styles.selected :""}`}
                            src={item.imgUrl}
                            alt={item.locationName}
                        />
                        {item.block &&
                            <div className={styles.blockCover}>
                                <span>COMMING</span>
                                <span>SOON!</span>
                            </div>
                        }   
                    </button>
                ))
            }
        </div>
    )
}