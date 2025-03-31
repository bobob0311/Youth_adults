'use client'
import styles from "./RematchContainer.module.scss";

interface PropsState{
    title: string;
    subTitle: string;
    
    leftBtn: {
        name: string;
        fn: () => void;
    }
    rightBtn:{
        name: string;
        fn: () => void;
    }

}

export default function RematchContainer(props:PropsState) {
    const { title,subTitle,leftBtn, rightBtn } = props;
    
    return (
        <div className={styles.rematchContainer}>
            <h2>{title}</h2>
            <p>{subTitle}</p>
            <div className={styles.btnContainer}>
                <button className={styles.leftBtn} onClick={leftBtn.fn}>{leftBtn.name}</button>
                <button className={styles.rightBtn} onClick={rightBtn.fn}>{rightBtn.name}</button>
            </div>
        </div>
    )
}