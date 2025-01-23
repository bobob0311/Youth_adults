'use client'

import { usePathname, useRouter } from "next/navigation";
import styles from "./layout.module.scss";
import ProgressBar from "@/components/ProgressBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const path = usePathname();
    
    const isStep = (path:string) => {
        if (path.substring(1, 5) === "step") {
            
            return  <ProgressBar range={path[5]}/>;
        } else {
            return null;
        }
    }

    return (
        <>
            <header className={styles.header}>
                <button
                    className={styles.btn}
                    onClick={() => router.back()}
                    aria-label="뒤로 가기 버튼"
                >
                    <img src="/Back.svg" />
                </button>
                <h1 className={styles.title}><img src="/mainImg.png" alt="청춘 상회"/></h1>
            </header>
            <main>
                {isStep(path)}
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </>
    )
}