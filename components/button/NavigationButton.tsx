'use client'
import { useRouter } from "next/navigation";
import styles from "./NavigationButton.module.scss"
interface PropsState{
    title: string;
    subtitle?: string;
    url: string;
    onFail?: () => void;
    onAction?: () => Promise<any> | any;
    isValid: boolean| null;
    width?: string;
}

export default function NavigationButton(props: PropsState) {
    const { subtitle,title, url, onAction, isValid,width, onFail } = props;
    const router = useRouter();

    const handleClick = async () => {
        if (!onAction) {
            router.push(url);
            return;
        }

        if (onFail) {
            const result = await onAction();
            if (result) {
                router.push(url);
            } else {
                onFail()
            }
        } else {
            onAction();
            router.push(url);
        }
        
    }

    return (
        <button
            className={`${styles.navBtn} ${isValid? '': styles.disable}`}
            onClick={handleClick}
            aria-label="다음으로 이동"
            style={width? {width} : {width:"370px"}}
        >
            <span className={subtitle? styles.smallTitle:''}>{title}</span>
            {subtitle ?<span className={styles.subtitle}> {subtitle}</span>:''}
        </button>
    )    
}