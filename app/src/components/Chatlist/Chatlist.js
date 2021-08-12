import { ChatlistItem } from './ChatlistItem/ChatlistItem';
import style from './Chatlist.module.css';

function Chatlist(props) {
    return (
        <div className={style.chatList}>
            {props.dialogs.map((elem) => (
                <ChatlistItem
                    imgSrc={elem.dialogImgSrc}
                    title={elem.dialogName}
                    key={elem.dialogName}
                    id_={elem.dialogId}
                    activeDialogId={props.activeChatId}
                    switchChat={(id) => props.switchChat(id)}
                />
            ))}
        </div>
    )
}

export { Chatlist };