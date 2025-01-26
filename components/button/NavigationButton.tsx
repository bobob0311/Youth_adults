'use client'
import { useRouter } from "next/navigation";
import styles from "./NavigationButton.module.scss"
interface PropsState{
    title: string;
    subtitle?: string;
    url: string;
    onStore?: () => void;
    isValid: boolean;
}

export default function NavigationButton(props: PropsState) {
    const { subtitle,title, url, onStore, isValid } = props;
    const router = useRouter();

    const handleClick = () => {
        if (isValid) {
            if (onStore) {
                onStore();   
            }
            router.push(url);    
        }
    }

    return (
        <button
            className={`${styles.navBtn} ${isValid? '': styles.disable}`}
            onClick={handleClick}
            aria-label="다음으로 이동"
        >
            <span className={subtitle? styles.smallTitle:''}>{title}</span>
            {subtitle ?<span className={styles.subtitle}> {subtitle}</span>:''}
        </button>
    )    
}