import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.backGroundImg}>
      <div className={styles.content}>

        <h1 className={styles.mainImg}>
          <Image width={175} height={62} src="/mainImg.png" alt="청춘 상회 이미지" />
          <span className={styles.srOnly}>청춘 상회</span>
        </h1>
        <h2 className={styles.subtitle}>내 친구가 되어라. 청춘을 후회없이 즐기세요!</h2>
        
        <NavigationButton
          isValid={true}
          width="220px"
          title="시작하기!"
          url="/step1"
        />

      </div>
    </div>
  );
}
