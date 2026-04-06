import { z } from "zod";
import { checkPhone } from "@/utils/regex";

export const phoneVerificationSchema = z.object({
  phoneNumber: z.string().refine((value) => checkPhone(value), {
    message: "유효한 전화번호를 입력해주세요.",
  }),
  verificationStatus: z
    .enum(["idle", "success", "fail"])
    .refine((value) => value === "success", {
      message: "문자 인증을 완료해주세요.",
    }),
});

export type PhoneVerificationFormValues = z.input<
  typeof phoneVerificationSchema
>;
export type PhoneVerificationSubmitValues = z.output<
  typeof phoneVerificationSchema
>;
