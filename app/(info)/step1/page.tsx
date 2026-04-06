"use client";

import styles from "./LocationPage.module.scss";
import LocationCheckButton from "@/features/signup/components/LocationCheck";

import { changeLocation } from "@/features/signup/model/userSlice";
import { LOCATION_INFO } from "@/features/signup/constants/location";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  type LocationFormValues,
  type LocationSubmitValues,
  locationSchema,
} from "@/features/signup/schema/location";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/shared/components/Button/SubmitButton";
import { useRouter } from "next/navigation";

export default function LocationPage() {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.user.location);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LocationFormValues, any, LocationSubmitValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LocationSubmitValues> = ({ location }) => {
    dispatch(changeLocation(location));
    router.push("/step2");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <section className={styles.location}>
        <h2 className={styles.title}>현재 위치를 선택해주세요</h2>

        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <LocationCheckButton
              locationInfo={LOCATION_INFO}
              selectedLocation={field.value}
              onLocationChange={field.onChange}
            />
          )}
        />
      </section>
      <SubmitButton title="다음으로" isValid={isValid} />
    </form>
  );
}
