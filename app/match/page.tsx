'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Page() {
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/match/info");
        }, 3000);

        return () => clearTimeout(timer);
    }, [])
    
    return (
        <div>환영합니다람쥐~~</div>
    )
}