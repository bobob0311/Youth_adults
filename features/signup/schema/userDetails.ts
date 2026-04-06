import { z } from "zod";

export const userDetailsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "그룹명을 입력해주세요." })
    .max(10, { message: "그룹명은 10자 이하로 입력해주세요." }),
  summary: z
    .string()
    .trim()
    .min(1, { message: "한줄소개를 입력해주세요." })
    .max(20, { message: "한줄소개는 20자 이하로 입력해주세요." }),
});

export type UserDetailsFormValues = z.input<typeof userDetailsSchema>;
export type UserDetailsSubmitValues = z.output<typeof userDetailsSchema>;
