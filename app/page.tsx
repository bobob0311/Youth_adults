import OpenPage from "@/components/start/Open";
import ClosePage from "@/components/start/Close";

export default function Home() {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const dayOfWeek = koreaTime.getUTCDay();
  const isAvailable = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;

  return isAvailable ? <OpenPage /> : <ClosePage />;
}