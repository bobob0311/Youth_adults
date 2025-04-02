import { Suspense } from "react";
import MatchContent from "./MatchContent";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import styles from "./page.module.scss"

export default async function MatchPage({ searchParams }: { searchParams: { id?: string } }) {
    const {id} = await searchParams;
    if (!id) return <div>잘못된 접근입니다.</div>;

    return (
        <Suspense fallback={
            <div className={styles.spinnerContainer}>
                <LoadingSpinner />
            </div>
            }>
            <MatchContent id={id} />
        </Suspense>
    );
}
