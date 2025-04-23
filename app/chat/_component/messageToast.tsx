import React, { useEffect } from 'react';
import styles from './Toast.module.scss';

interface ToastProps {
    message: string;
    onDismiss: () => void;
}

export default function Toast({ message, onDismiss }:ToastProps) {
    useEffect(() => {
        const timeout = setTimeout(onDismiss, 3000); 
        return () => clearTimeout(timeout); 
    }, [onDismiss]);

    const handleClick = () => {
        const container = document.getElementById("messageContainer");
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
        onDismiss();
    };

    return (
        <div className={styles['custom-toast']} onClick={handleClick}>
            {message}
        </div>
    );
};
