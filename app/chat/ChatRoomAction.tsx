
import UserLeftNotification from "./_component/UserLeftNotification";
import RematchDecisionBox from "./_component/RematchDecisionBox";
import InputBox from "./_component/InputBox";


export default function ChatRoomAction({roomId, roomInfo, isOpen ,chatHandler,rematch,onRematch}) {
    return (
        <div>
            {isOpen ? (
                <>
                    {rematch?
                        <RematchDecisionBox roomInfo={roomInfo} roomId={roomId} chatHandler={chatHandler} onRematch={onRematch}/>
                        :
                        <InputBox
                            onSend={(message) => chatHandler.sendTextMessage(message)}
                            onImgSend={(previewURl, src) => chatHandler.sendImgMessage(previewURl, src)}
                        />
                    }
                </>
            ) : (
                <UserLeftNotification roomInfo={roomInfo} roomId={roomId} chatHandler={chatHandler}/>
            )}
        </div>
    );    
}