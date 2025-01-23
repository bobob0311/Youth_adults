import CheckButton from "@/components/button/CheckButtons";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"

export default function Home() {
  return (
    <div className={styles.backGround}>
      <div className={styles.content}>
      <h1 className={styles.mainImg}><img src="/mainImg.png" alt="청춘 상회"/></h1>
      <p className={styles.mainP}>다시 돌아오지 않을 청춘을 후회없이 즐기세요!!</p>
      <NavigationButton isValid={true} title="시작하기" url="/step1" />
      </div>
    </div>
  );
}
