'use client'
import styles from "./ProgressBar.module.scss"

interface PropsState{
    range: string;
}

export default function ProgressBar(props: PropsState) {
    const { range } = props; 
    return (
        <div>
            <progress className={styles.bar} value={range} max="4"></progress>
        </div>
    )
}