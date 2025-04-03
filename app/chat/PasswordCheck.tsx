"use client";
import { useState } from "react";
import { checkAndStorePassword } from "../../serverActions/verifyPassword";
import { useRouter } from "next/navigation";

export default function PasswordCheck({ roomId }: { roomId: string;}) {
  const [password, setPassword] = useState<string>("");
    const [error, setError] = useState("");
    const router = useRouter();

  const handleCheckPassword = async () => {
      setError("");
    const result = await checkAndStorePassword(roomId,password)
    if (result) {
      router.refresh();
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 입력" />
      <button onClick={handleCheckPassword}>입장</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}