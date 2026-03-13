"use client";

import styles from "./LocationPage.module.scss";
import NavigationButton from "@/shared/components/NavigationButton";
import LocationCheckButton from "../../../features/signup/components/LocationCheck";

import { changeLocation } from "@/features/signup/model/userSlice";
import { LOCATION_INFO } from "@/features/signup/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function LocationPage() {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.user.location);

  const isBtnValid = location !== "";

  const handleLocationChange = (location: string) => {
    dispatch(changeLocation(location));
  };

  return (
    <div className={styles.container}>
      <section className={styles.location}>
        <h2 className={styles.title}>현재 위치를 선택해주세요</h2>
        <LocationCheckButton
          locationInfo={LOCATION_INFO}
          selectedLocation={location}
          onLocationChange={handleLocationChange}
        />
      </section>
      <NavigationButton isValid={isBtnValid} title="다음으로" url="/step2" />
    </div>
  );
}
