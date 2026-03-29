interface LocationInfo {
  locationName: string;
  imgUrl: string;
  block: boolean;
}

export const LOCATION_INFO = [
  { locationName: "부평역", imgUrl: "/gangnam.png", block: false },
  { locationName: "부천역", imgUrl: "/hongdae.png", block: false },
  { locationName: "이태원", imgUrl: "/itaewon.png", block: true },
  { locationName: "건대입구", imgUrl: "/konkuk.png", block: true },
] as const satisfies readonly LocationInfo[];

export type LocationInfoItem = (typeof LOCATION_INFO)[number];

type AvailableLocationInfoItem = Extract<LocationInfoItem, { block: false }>;
export type AvailableLocationName = AvailableLocationInfoItem["locationName"];
export type LocationValue = AvailableLocationName | "";

export const AVAILABLE_LOCATION_NAMES: readonly AvailableLocationName[] =
  LOCATION_INFO.filter(
    (item): item is AvailableLocationInfoItem => item.block === false,
  ).map((item) => item.locationName);
