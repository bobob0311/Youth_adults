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
  

  const chatRoomWrapperRef = useRef<HTMLElement|null>(null);
  const scrollRef = useRef<HTMLElement|null>(null);
  const chatRef = useRef<HTMLElement|null>(null);
  const messageContainerRef = useRef<HTMLElement | null>(null)
  const chatRoomRef = useRef<HTMLElement | null>(null)
  const originalHeights = useRef<{
    chatRoomWrapper?: string;
    scroll?: string;
    chat?: string;
    messageContainer?: string;
    chatRoom?: string;
  }>({});
  
  useEffect(() => {
    const wrapper = document.getElementById("wrapper");
  const scroll = document.getElementById("scroll");
  const chat = document.getElementById("chatRoomWrapper");
  const msgContainer = document.getElementById("messageContainer");
  const chatRoom = document.getElementById("chatRoom");

  chatRoomWrapperRef.current = wrapper;
  scrollRef.current = scroll;
  chatRef.current = chat;
  messageContainerRef.current = msgContainer;
  chatRoomRef.current = chatRoom;

  if (wrapper) originalHeights.current.chatRoomWrapper = wrapper.style.height;
  if (scroll) originalHeights.current.scroll = scroll.style.height;
  if (chat) originalHeights.current.chat = chat.style.height;
  if (msgContainer) originalHeights.current.messageContainer = msgContainer.style.height;
  if (chatRoom) originalHeights.current.chatRoom = chatRoom.style.height;
  }, []);
  
  function updateHeight() {
    // 덜컹거리는거 해결해야되고 -> 그냥 전체에 fixed를 줘버리면 덜컹거리지 않지 않을까요????!!!
    // 복구하는거 만들어야함.-
    setTimeout(() => {
      window.scrollTo(0, 0);

      const viewportHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
        
        
      if (chatRoomWrapperRef.current && scrollRef.current && chatRef.current) {
        chatRoomWrapperRef.current.style.height = `${viewportHeight}px`;
        scrollRef.current.style.height = `${viewportHeight + 1}px`
        chatRef.current.style.height = `${viewportHeight}px`

        if (messageContainerRef.current && chatRoomRef.current) {
          messageContainerRef.current.style.height = `${viewportHeight - 55}px`
          chatRoomRef.current.style.height = `${viewportHeight}px`
        }
      }
    }, 100); 
  } 
  
  function restoreOriginalHeights() {
    if (
      chatRoomWrapperRef.current &&
      scrollRef.current &&
      chatRef.current &&
      messageContainerRef.current &&
      chatRoomRef.current
    ) {
      chatRoomWrapperRef.current.style.height = originalHeights.current.chatRoomWrapper || "";
      scrollRef.current.style.height = originalHeights.current.scroll || "";
      chatRef.current.style.height = originalHeights.current.chat || "";
      messageContainerRef.current.style.height = originalHeights.current.messageContainer || "";
      chatRoomRef.current.style.height = originalHeights.current.chatRoom || "";
    }
  }


    return (
        <>
        <textarea
          onFocus={updateHeight}
          onBlur={restoreOriginalHeights}
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