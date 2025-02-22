import { useRef, useState, useEffect } from "react";
import styles from "./imgSlider.module.scss";

interface PropsState {
  imgInfo: ImgInfo[];
  onChangeIdx: (now: number) => void;
  navIdx: number;
}

interface ImgInfo {
  id: number;
  title: string;
  imgSrc: string;
}

export default function ImgSlider(props: PropsState) {
  const { imgInfo, onChangeIdx,navIdx } = props;
  
  const [now, setNow] = useState(navIdx);
  
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [imgWidth, setImgWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current) {
      setImgWidth(imgRef.current.offsetWidth);
    }
  }, [imgInfo]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
    if (containerRef.current) {
      containerRef.current.style.transition = "none";
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - startX;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${translateX + offsetX}px)`;
    }
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current || !isDragging) return;

    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const offsetX = clientX - startX;
    const direction = offsetX > 0 ? -1 : 1;
    const imgLength = imgInfo.length - 1;
    
    let nextIndex = now + direction;
    if (nextIndex > imgLength) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = imgLength;
    }
    
    const newTranslateX = -nextIndex * imgWidth;

    setNow(nextIndex);
    setTranslateX(newTranslateX);
    setIsDragging(false);

    containerRef.current.style.transition = "transform 0.5s ease";
    containerRef.current.style.transform = `translateX(${newTranslateX}px)`;

    setStartX(0);
  };

  useEffect(() => {
    onChangeIdx(now);
  }, [now])
  
  useEffect(() => {
    if (navIdx !== now) {
      setNow(navIdx); 
      const newTranslateX = -navIdx * imgWidth;
      setTranslateX(newTranslateX);

      if (containerRef.current) {
        containerRef.current.style.transition = "transform 0.5s ease";
        containerRef.current.style.transform = `translateX(${newTranslateX}px)`;
      }
    }
  }, [navIdx, imgWidth]);



  return (
    <div
      className={styles.imgContainer}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div ref={containerRef} className={styles.imgBox}>
        {imgInfo.map((item, index) => (
          <img
            width={370}
            key={item.id}
            ref={index === 0 ? imgRef : null}
            src={item.imgSrc}
            alt={item.title}
          />
        ))}
      </div>
    </div>
  );
}
