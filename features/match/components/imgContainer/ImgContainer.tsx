"use client";
import { useState } from "react";
import styles from "./ImgContainer.module.scss";
import ImgSlider from "./imgSlider";

const IMGINFO = [
  {
    id: 0,
    title: "매칭그룹 소개",
    imgSrc: "/info_container.png",
  },
  {
    id: 1,
    title: "매칭 프로세스",
    imgSrc: "/info.png",
  },
  {
    id: 2,
    title: "환불정책",
    imgSrc: "/refund.png",
  },
];

export default function ImgContainer({ matchedUserInfo }) {
  const [imgIdx, setImgIdx] = useState<number>(0);

  return (
    <div>
      <div className={styles.container}>
        {IMGINFO.map((item) => (
          <button
            key={item.id}
            onClick={() => setImgIdx(item.id)}
            className={`${styles.btn} ${imgIdx === item.id ? styles.selected : ""}`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        <ImgSlider
          navIdx={imgIdx}
          onChangeIdx={setImgIdx}
          imgInfo={IMGINFO}
          userInfo={matchedUserInfo}
        />
      </div>
    </div>
  );
}
