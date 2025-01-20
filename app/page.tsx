import CheckButton from "@/components/button/CheckButtons";
import NavigationButton from "@/components/button/NavigationButton";

export default function Home() {
  return (
    <div>
      <h1>청춘상회</h1>
      <div>다시 돌아오지 않을 청춘을 후회없이 즐기세요!!</div>
      <NavigationButton title="시작하기" url="/step1" />
    </div>
  );
}
