'use client';

import styles from "./error.module.scss"
import BasicLayout from './BasicLayout';
import Image from 'next/image';

export default function Error({
  error,
}: {
  error: Error;
}) {

   const message = error.message.split("|");

  return (
    <BasicLayout>
        <div className={styles.container}>
            <div className={styles.content}>  
                <Image src="/chatError.png"  width={280} height={200} alt='chat Error'/>
                <div className={styles.messageContainer}>
                    {message.map(item => (
                        <p key={item}>{item}</p>
                    ))}
                </div>
            </div>      
        </div>
    </BasicLayout>
  );
}