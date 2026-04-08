import styles from "./imgSlider.module.scss";
import Introduce from "./Introduce";
import Image from "next/image";
import { useImageSlider } from "../../hooks/useImageSlider";

interface PropsState {
  imgInfo: ImgInfo[];
  onChangeIdx: (now: number) => void;
  navIdx: number;
  userInfo: any;
}

interface ImgInfo {
  id: number;
  title: string;
  imgSrc: string;
}

const IMG_WIDTH = 370;
const THRESHOLD = 130;

export default function ImgSlider({
  imgInfo,
  onChangeIdx,
  navIdx,
  userInfo,
}: PropsState) {
  const { boxRef, handler } = useImageSlider({
    totalCnt: imgInfo.length,
    currentIdx: navIdx,
    imgWidth: IMG_WIDTH,
    threshold: THRESHOLD,
    onChangeIdx,
  });

  return (
    <div className={styles.imgContainer} {...handler}>
      <div ref={boxRef} className={styles.imgBox}>
        {imgInfo.map((item) => (
          <Image
            width={370}
            height={320}
            key={item.title}
            src={item.imgSrc}
            alt={item.title}
          />
        ))}
        {userInfo && <Introduce userInfo={userInfo} />}
      </div>
    </div>
  );
}
