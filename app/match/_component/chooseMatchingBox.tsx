'use client'
import Image from "next/image";
import styles from "./chooseMatchingBox.module.scss";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

interface PropsState{
    onClose?: () => void;
    text: string;
    btnInfo: {
        firstBtnName: string;
        firstBtnFn: () => void;
        secondBtnName: string;
        secondBtnFn: () => void;
    }
    loading?: boolean;
}


export default function ChooseMatchingBox(props: PropsState) {
    const { onClose, btnInfo,text, loading } = props;
    const { firstBtnName, firstBtnFn, secondBtnName, secondBtnFn, } = btnInfo;
    
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                {onClose? 
                    <button className={styles.closeBtn} onClick={() => onClose()}>
                        <Image width={25} height={25}  src='/close.svg' alt='닫기 버튼'/>
                    </button>
                    :
                    null
                }
                {loading ?
                    <div className={styles.loadingContainer}>
                        <LoadingSpinner />
                    </div>    
                    : 
                <div className={styles.imgContainer}>
                    <Image width={120} height={120} src="/modalImg.png" alt="모달 사진"/>
                </div>
                }
                <h3 className={styles.title}>{text}</h3>
                
                <div className={styles.pBox}>
                    <p>매칭이 마음에 들지 않으면</p>
                    <p>다른 매칭을 찾아 볼 수도 있어요.</p>
                </div>
                
                <div className={styles.btnContainer}>
                    <button onClick={()=> {firstBtnFn()}}>{firstBtnName}</button>
                    <button onClick={()=> {secondBtnFn()}}>{secondBtnName}</button>
                </div>
            </div>
        </div>    
    )
}


