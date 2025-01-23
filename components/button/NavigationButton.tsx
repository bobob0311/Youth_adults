'use client'
import { useRouter } from "next/navigation";
import styles from "./NavigationButton.module.scss"
interface PropsState{
    title: string;
    url: string;
    onStore?: () => void;
    isValid: boolean;
}

export default function NavigationButton(props: PropsState) {
    const { title, url, onStore, isValid } = props;
    const router = useRouter();

    const handleClick = () => {
        if (isValid) {
            if (onStore) {
                onStore();   
            }
            router.push(url);    
        }
    }
    console.log(isValid);
    return (
        <button
            className={`${styles.navBtn} ${isValid? '': styles.disable}`}
            onClick={handleClick}
            aria-label="다음으로 이동"
        >
            {title}
        </button>
    )    
}