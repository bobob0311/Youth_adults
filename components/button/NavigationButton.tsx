'use client'
import styles from "./NavigationButton.module.scss"
import Link from "next/link";
interface PropsState{
    title: string;
    url: string;
}

export default function NavigationButton(props: PropsState) {
    const { title,url } = props;
    return (
        <Link  href={url}>
            <button className={styles.navBtn}>{title}</button>
        </Link>
    )    
}