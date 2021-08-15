import { ChatlistItem } from './ChatlistItem/ChatlistItem';
import style from './Chatlist.module.css';

function Chatlist(props) {
    /**
     * Функция показывает / скрывает список чатов
     * 
     * @param {number} activeWindow Id активного окна (0 - список чатов, 1 - чат)
     * @returns {string} 
     */
    function setClassIfSmallWidthActiveWindow(activeWindow) {
        if (activeWindow === 0)
            return style.chatListShow;
        else
            return "";
    }

    return (
        <div className={`${style.chatList} ${setClassIfSmallWidthActiveWindow(props.smallWidthActiveWindow)}`}>
            {props.dialogs.map((elem) => (
                <ChatlistItem
                    imgSrc={elem.dialogImgSrc}
                    title={elem.dialogName}
                    key={elem.dialogName}
                    id_={elem.dialogId}
                    activeDialogId={props.activeChatId}
                    switchChat={() => props.switchChat(elem.dialogId)}
                />
            ))}
        </div>
    )
}

export { Chatlist };