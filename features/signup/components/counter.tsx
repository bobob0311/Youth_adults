'use client';
import { useState, useEffect } from 'react';
import styles from "./counter.module.scss";
interface PropsState{
    countTime: number;
    onTime?: (time:number) => void;
}

export default function Counter(props:PropsState){
    const {countTime, onTime} = props
    const [count, setCount] = useState<number>(countTime);

    useEffect(()=> {
        const intervalId = setInterval(() => {
            setCount((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalId);
                    return 0;
                }
                if(onTime) onTime(prev - 1);
                return prev - 1;
            })
        }, 1000);
        return () => clearInterval(intervalId);
    },[])
    return <span className={styles.text}> {count}</span>
}