import React from 'react';
import style from './ChatlistItem.module.css';

function ChatlistItem(props) {
    function isChatActive(thisId, activeId) {
        if (thisId === activeId)
            return style.chatlistItem_active;
        else
            return "";
    }

    return (
        <div
            className={`${style.chatlistItem} ${style.chatlistItem_padding} ${isChatActive(props.id_, props.activeDialogId)}`}
            onClick={() => props.switchChat(props.id_)}
        >
            <img
                src={props.imgSrc}
                alt="#"
                className={`${style.chatImage} ${style.chatImage_margin}`}
            >
            </img>
            <p className={style.chatName}>{props.title}</p>
        </div>
    )
}

export { ChatlistItem };