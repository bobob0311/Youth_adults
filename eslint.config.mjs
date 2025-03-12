import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // any 타입에 대한 경고를 끄기
      "react-hooks/exhaustive-deps": "off", // useEffect 의존성 배열에 대한 경고를 끄기
    },
  },
];

export default eslintConfig;
