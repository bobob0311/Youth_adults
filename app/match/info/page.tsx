'use client'
import { useState } from "react"
import styles from "./page.module.scss"
import NavigationButton from "@/components/button/NavigationButton";
import Link from "next/link";
import ImgSlider from "./imgSlider";

const IMGINFO = [
    {
        id:0,
        title: "매칭그룹 소개",
        imgSrc: "/location1.png",
    },
    {
        id:1,
        title: "매칭 프로세스",
        imgSrc: "/location2.png"
    },
    {
        id:2,
        title: "환불정책",
        imgSrc: "/location3.png"
    }
]

export default function Page() {
    const [content, setContent] = useState<number>(0);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.dataset.id){
        const buttonId = parseInt(event.currentTarget.dataset.id);
            setContent(buttonId);
            console.log(buttonId);
        }
    }

    return (
        <>
            <div className={styles.container}>
                {IMGINFO.map((item) => (
                    <button 
                        key={item.title}
                        data-id={item.id}
                        onClick={handleClick} 
                        className={`${styles.btn} ${content === item.id ? styles.selected : ""}`}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
            <div className={styles.content}>
                <ImgSlider navIdx={content} onChangeIdx={(idx)=> setContent(idx)} imgInfo={IMGINFO}/>
            </div>
            <NavigationButton url="/" subtitle="결제금액: 2,200원" isValid={true} title="결제 후 매칭룸 입장하기"/>
            <div className={styles.linkWrapper}><Link href="/">매칭 포기하기</Link></div>
        </>
    )
}