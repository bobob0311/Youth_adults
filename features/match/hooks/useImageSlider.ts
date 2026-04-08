import { useRef, useState } from "react";

interface UseImageSliderProps {
  totalCnt: number;
  currentIdx: number;
  imgWidth: number;
  threshold: number;
  onChangeIdx: (idx: number) => void;
}

export function useImageSlider({
  totalCnt,
  currentIdx,
  imgWidth,
  threshold,
  onChangeIdx,
}: UseImageSliderProps) {
  const [translateX, setTranslateX] = useState<number>(0);

  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const calcIdx = (idx: number): number => {
    if (idx >= totalCnt) return 0;
    if (idx < 0) return totalCnt - 1;
    return idx;
  };

  const getClientX = (e: React.MouseEvent | React.TouchEvent) => {
    return "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const getEndClientX = (e: React.MouseEvent | React.TouchEvent) => {
    return "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
  };

  const setBoxTransform = (x: number, animated: boolean) => {
    if (!boxRef.current) return;
    boxRef.current.style.transition = animated ? "transform 0.3s ease" : "none";
    boxRef.current.style.transform = `translateX(${x}px)`;
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.type === "mousedown") {
      e.preventDefault();
    }

    isDraggingRef.current = true;
    startXRef.current = getClientX(e);
    setBoxTransform(translateX, false);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current || !startXRef.current) return;

    const offsetX = getClientX(e) - startXRef.current;
    setBoxTransform(translateX + offsetX, false);
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current || !startXRef.current) return;

    isDraggingRef.current = false;

    const offsetX = getEndClientX(e) - startXRef.current;
    if (Math.abs(offsetX) < threshold) {
      setBoxTransform(translateX, true);
      return;
    }

    const direction = offsetX > 0 ? -1 : 1;
    const nextIdx = calcIdx(currentIdx + direction);
    const newTranslateX = -nextIdx * imgWidth;

    onChangeIdx(nextIdx);
    setBoxTransform(newTranslateX, true);
    setTranslateX(newTranslateX);
  };

  return {
    boxRef,
    translateX,
    handler: {
      onMouseDown: handleStart,
      onMouseMove: handleMove,
      onMouseUp: handleEnd,
      onMouseLeave: handleEnd,
      onTouchStart: handleStart,
      onTouchMove: handleMove,
      onTouchEnd: handleEnd,
    },
  };
}
