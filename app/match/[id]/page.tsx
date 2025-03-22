'use client'
import { useEffect, useState } from "react"
import styles from "./page.module.scss"
import NavigationButton from "@/components/button/NavigationButton";
import ImgSlider from "./imgSlider";
import { Modal } from "./Modal";
import { useParams } from "next/navigation";
import { getUserDataById } from "@/utils/api";

const IMGINFO = [
    {
        id:0,
        title: "매칭그룹 소개",
        imgSrc: "/info_container.png",
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
    const [isStart, setIsStart] = useState<boolean>(true);
    const [matchedUserInfo, setMatchedUserInfo] = useState<any>(null);
    const [modal, setModal] = useState<boolean>(false);
    const [isPayment, setIsPayment] = useState<boolean>();
    const [content, setContent] = useState<number>(0);
    
    const params = useParams();
    const { id } = params;

    async function handleGetUserInfo(id: string) {
        const data = await getUserDataById(id);
        return data;
    }

    useEffect(() => {
        const fetchData = async () => {
            if (id && typeof id === 'string') {
                const matchedUserInfo = await handleGetUserInfo(id);
                const myInfo = await handleGetUserInfo(matchedUserInfo.matchedId)
                setMatchedUserInfo(matchedUserInfo);
                setIsPayment(myInfo.payment);
            }
        }
        fetchData();
        setTimeout(() => {
            setIsStart(false);
        },3000)
        
        
    },[id])
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.dataset.id){
        const buttonId = parseInt(event.currentTarget.dataset.id);
            setContent(buttonId);
        }
    }

    const handleEnterRoomByPaymentTrue = () => {
        // payment는 true이니까 입장만 하면 되는 로직
        // db에 하나 더 추가해서 따로 컨트롤할 생각
    }

    return (
        <>{
            isStart ? <div>환영합니다람쥐 컴포넌트가 들어갈 자리</div> :
    
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
                    <ImgSlider navIdx={content} onChangeIdx={(idx) => setContent(idx)} imgInfo={IMGINFO} userInfo={matchedUserInfo} />    
                </div>
                    {isPayment ? 
                    <NavigationButton url={`/match/done`} onAction={()=> {handleEnterRoomByPaymentTrue()}} isValid={true} title="매칭룸 입장하기"/>
                    :
                    <NavigationButton url={`/match/payment?id=${matchedUserInfo.matchedId}`} subtitle="결제금액: 2,200원" isValid={true} title="결제 후 매칭룸 입장하기"/>
                    }
                <div className={styles.btnContainer}>
                    <button className={styles.linkWrapper}
                        onClick={()=> setModal(true)}
                    >
                        매칭 포기하기
                    </button>
                </div>
            </>
        }
            
            {modal && <Modal onModal={() => setModal((prev) => !prev)}/>}
        </>
    )
}