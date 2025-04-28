import { useRef, useState, useEffect } from "react";
import styles from "./Container.module.scss";
import Image from "next/image";

interface PropsState{
    onSendMessage: (msg: string) => void;
}

const MAX_LINE = 8;
const LINE_HEIGHT = 14;

export default function Container(props: PropsState) {
    const { onSendMessage } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null); // 숨겨진 input
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isText, setIsText] = useState<boolean>(false);

    useEffect(() => {
      const userAgent = navigator.userAgent;
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
    }, []);

    const sendMessage = () => {
        if (textareaRef.current) {
            onSendMessage(textareaRef.current.value);

            textareaRef.current.value = '';
            hiddenInputRef.current?.focus();
            textareaRef.current?.focus();

        }
        setIsText(false);
    };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (event.nativeEvent.isComposing) return;

      if (isMobile) {
        return;
      } else {
        if (event.shiftKey) {
          return;
        } else {
          event.preventDefault();
          sendMessage();
        }
      }
    }
  };

    const handleResizeHeight = () => {
        if (textareaRef.current) {
            const maxHeight = MAX_LINE * LINE_HEIGHT;
            textareaRef.current.style.height = 'auto';

            if (textareaRef.current.scrollHeight > maxHeight) {
                textareaRef.current.style.height = `${maxHeight}px`;
                textareaRef.current.style.overflowY = "auto"; 
            } else {
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                textareaRef.current.style.overflowY = "hidden";
            }
        }
    }

    const handleBtnChange = () => {
        if(textareaRef.current){
            setIsText(textareaRef.current.value.length > 0);
        }
    }


    return (
        <>
            <textarea
                className={styles.textBox}
                placeholder="메시지 입력..."
                rows={1}
                ref = {textareaRef}
                onKeyDown={handleKeyDown}
                onInput={handleResizeHeight}
                onChange={handleBtnChange}
            />
            <button 
                className={styles.sendBtn}
                onClick={isText? sendMessage : ()=>{}}
                > 
                    {isText? 
                    <Image width={20} height={30} src="/sent.svg" alt="전송 사진" /> :
                    <label htmlFor="galleryInput">
                        <Image width={20} height={30} src="/camera.svg" alt="사진 접근"/>
                    </label>
                }
            </button>
        </> 
    )
}