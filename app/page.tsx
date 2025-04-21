import { toZonedTime } from "date-fns-tz";
import OpenPage from "@/components/start/Open";
import ClosePage from "@/components/start/Close";

export default function Home() {
  const now = new Date();
  const timeZone = "Asia/Seoul";
  const koreaTime = toZonedTime(now, timeZone);

  const dayOfWeek = koreaTime.getDay(); // 0 (일) ~ 6 (토)
  const isAvailable = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;

  return isAvailable ? <OpenPage /> : <ClosePage />;
}
