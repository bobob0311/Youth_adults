'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import styles from "./page.module.scss";

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div style={{ width: 370, height: 900 }} />,
});
import animationData from '@/assets/start.json';
import OpenPage from '@/components/start/Open';

export default function Home() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  return (
    <div>
      {isAnimationComplete && <OpenPage/>}
      <div className={styles.animationWrapper}>
        <Lottie
          animationData={animationData}
          style={{ width: '100%', height: '100dvh'}}
          loop={false}
          onComplete={handleAnimationComplete}
        />
      </div>
    </div>
  );
}
