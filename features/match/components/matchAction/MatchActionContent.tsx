import NavigationButton from "@/shared/components/NavigationButton";
import MatchActionStatus from "./MatchStatusSection";

interface MatchActionContentProps {
  isEnter: boolean;
  isPayment: boolean;
  myId: string;
  onEnterRoom: () => Promise<boolean>;
}

export default function MatchActionContent({
  isEnter,
  isPayment,
  myId,
  onEnterRoom,
}: MatchActionContentProps) {
  if (isEnter) {
    return <MatchActionStatus />;
  }

  if (isPayment) {
    return (
      <NavigationButton
        onAction={onEnterRoom}
        url="/match/done"
        isValid={true}
        title="매칭룸 입장하기"
      />
    );
  }

  return (
    <NavigationButton
      url={`/match/payment?id=${myId}`}
      subtitle="결제금액: 2,200원"
      isValid={true}
      title="결제 후 매칭룸 입장하기"
    />
  );
}
