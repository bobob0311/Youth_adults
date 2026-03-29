import { z } from "zod";
import {
  AVAILABLE_LOCATION_NAMES,
  type AvailableLocationName,
} from "../constants/location";

export const locationSchema = z.object({
  location: z.union([z.literal(""), z.enum(AVAILABLE_LOCATION_NAMES)]).refine(
    (value): value is AvailableLocationName => {
      return AVAILABLE_LOCATION_NAMES.includes(value as AvailableLocationName);
    },
    { message: "지역 미선택" },
  ),
});

export type LocationFormValues = z.input<typeof locationSchema>;
export type LocationSubmitValues = z.output<typeof locationSchema>;
