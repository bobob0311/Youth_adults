"use client"
import Image from "next/image";
import styles from "./WrapperLayout.module.scss";
import { useEffect, useRef } from "react";

export default function Wrapper({ children, onRematchClick}: { children: React.ReactNode, onRematchClick: ()=> void }) {
    
  const contentRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  
  
    useEffect(() => {
      const $wrapper = contentRef.current;
      const $scroll = scrollRef.current;
      const $chatRoomWrapper = chatRef.current;
      
      function updateHeight() {
        const viewportHeight = window.visualViewport
          ? window.visualViewport.height
          : window.innerHeight;
        
        const $MessageContainer = document.getElementById("messageContainer");
        const $chatRoom = document.getElementById("chatRoom");
        if ($wrapper && $scroll && $chatRoomWrapper) {
          
          $wrapper.style.height = `${viewportHeight}px`;
          $scroll.style.height = `${viewportHeight + 1}px`
          $chatRoomWrapper.style.height = `${viewportHeight - 54}px`

          if ($MessageContainer && $chatRoom)  {
            $MessageContainer.style.height = `${viewportHeight - 54 - 55}px`
            $chatRoom.style.height = `${viewportHeight - 54}px`
            }
          }
      } 

      updateHeight();

      if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", updateHeight);
      } else {
        window.addEventListener("resize", updateHeight);
      }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateHeight);
      } else {
        window.removeEventListener("resize", updateHeight);
      }
    };
  }, []);
  

    return (
        <>
            <header className={styles.header}>
                    <button className={styles.rematchBtn} onClick={onRematchClick}>
                        <Image width={25} height={25} src="/rematchBtn.svg" alt="매칭 다시 찾기"/>
                        <div>매칭 찾기</div>
                    </button>
                    <h1 className={styles.title}><Image width={175} height={65} src="/mainImg.png" alt="청춘 상회"/></h1>
            </header>
            <main ref={contentRef} className={styles.wrapper}>
                <div ref={chatRef} className={styles.content}>
                    {children}
                </div>
                <div ref={scrollRef} className={styles.makeScrollable }></div>
            </main>
        </>
    )
}