'use client'
import { useState } from "react"
import styles from "./page.module.scss"
import NavigationButton from "@/components/button/NavigationButton";
import ImgSlider from "./imgSlider";
import { Modal } from "./Modal";

const IMGINFO = [
    {
        id:0,
        title: "매칭그룹 소개",
        imgSrc: "/g.png",
    },
    {
        id:1,
        title: "매칭 프로세스",
        imgSrc: "/info.png"
    },
    {
        id:2,
        title: "환불정책",
        imgSrc: "/refund.png"
    }
]

export default function Page() {
    const [modal, setModal] = useState<boolean>(false);
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
            <div className={styles.btnContainer}>
                <button className={styles.linkWrapper}
                    onClick={()=> setModal(true)}
                >
                    매칭 포기하기
                </button>
            </div>
            {modal && <Modal onModal={() => setModal((prev) => !prev)}/>}
        </>
    )
}