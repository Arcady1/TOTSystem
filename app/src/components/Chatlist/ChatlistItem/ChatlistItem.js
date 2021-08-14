import React from 'react';
import style from './ChatlistItem.module.css';

function ChatlistItem(props) {
    /**
     * Функция устанавливает CSS класс для открытого чата
     * 
     * @param {number} thisId Id текущего чата
     * @param {number} activeId Id открытого чата
     * @returns {string} CSS класс
     */
    function isChatActive(thisId, activeId) {
        if (thisId === activeId)
            return style.chatlistItem_active;
        else
            return "";
    }

    return (
        <div
            className={`${style.chatlistItem} ${style.chatlistItem_padding} ${isChatActive(props.id_, props.activeDialogId)}`}
            onClick={() => props.switchChat()}
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