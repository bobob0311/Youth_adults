'use client'
import { useRouter } from "next/navigation";
import styles from "./NavigationButton.module.scss"
interface PropsState{
    title: string;
    url: string;
    onStore?: () => void;
}

export default function NavigationButton(props: PropsState) {
    const { title, url, onStore } = props;
    const router = useRouter();

    const handleClick = () => {
        if (onStore) {
            onStore();   
        }
        router.push(url);
    }
    return (
        <button
            className={styles.navBtn}
            onClick={handleClick}
            aria-label="다음으로 이동"
        >
            {title}
        </button>
    )    
}