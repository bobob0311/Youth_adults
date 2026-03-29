"use client";

import styles from "./LocationCheck.module.scss";
import Image from "next/image";
import type { LocationInfoItem, LocationValue } from "../constants/location";

interface PropsState {
  locationInfo: readonly LocationInfoItem[];
  selectedLocation: LocationValue;
  onLocationChange: (location: LocationValue) => void;
}

export default function LocationCheckButton({
  locationInfo,
  selectedLocation,
  onLocationChange,
}: PropsState) {
  const handleClick = (clickedLocation: LocationValue) => {
    if (selectedLocation == clickedLocation) {
      onLocationChange("");
      return;
    }

    onLocationChange(clickedLocation);
  };

  return (
    <div className={styles.locationContainer}>
      {locationInfo.map((item) => {
        const isBlocked = item.block;
        const isSelected = item.locationName === selectedLocation;

        return (
          <button
            key={item.locationName}
            type="button"
            className={`${styles.imgBtn} ${isBlocked ? styles.blocked : ""}`}
            onClick={
              isBlocked ? undefined : () => handleClick(item.locationName)
            }
            disabled={isBlocked}
            aria-pressed={isSelected}
          >
            <span className={styles.locationName}>{item.locationName}</span>

            <Image
              width={150}
              height={150}
              className={`${styles.locationImg} ${isSelected ? styles.selected : ""}`}
              src={item.imgUrl}
              alt={item.locationName}
            />

            {isBlocked && (
              <div className={styles.blockCover}>
                <span>COMING</span>
                <span>SOON!</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
