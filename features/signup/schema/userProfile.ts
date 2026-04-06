import { z } from "zod";

export const userProfileSchema = z.object({
  count: z.string().min(1, { message: "인원 수 미선택" }),
  gender: z.string().min(1, { message: "그룹 성별 미선택" }),
  age: z.string().min(1, { message: "평균 연령 미선택" }),
});

export type UserProfileFormValues = z.input<typeof userProfileSchema>;
export type UserProfileSubmitValues = z.output<typeof userProfileSchema>;
