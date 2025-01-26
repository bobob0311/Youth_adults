'use client'
import { useState } from "react"
import styles from "./page.module.scss"
import NavigationButton from "@/components/button/NavigationButton";
import Link from "next/link";

export default function Page() {
    const [content, setContent] = useState<string>("매칭그룹 소개");
    
     const buttons = [
        "매칭그룹 소개",
        "매칭 프로세스",
        "환불정책"
    ];
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const buttonText = (event.target as HTMLButtonElement).innerText;
        setContent(buttonText);
        console.log(buttonText);
    }

    return (
        <>
            <div className={styles.container}>
                {buttons.map((text) => (
                    <button 
                        key={text}
                        onClick={handleClick} 
                        className={`${styles.btn} ${content === text ? styles.selected : ""}`}
                    >
                        {text}
                    </button>
                ))}
            </div>
            <div className={styles.content}>
                컨텐츠 자리 
            </div>
            <NavigationButton url="/" subtitle="결제금액: 2,200원" isValid={true} title="결제 후 매칭룸 입장하기"/>
            <div className={styles.linkWrapper}><Link href="/">매칭 포기하기</Link></div>
        </>
    )
}