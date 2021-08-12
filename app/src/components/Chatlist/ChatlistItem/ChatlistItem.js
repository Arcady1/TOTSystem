import React from 'react';
import style from './ChatlistItem.module.css';

function ChatlistItem(props) {
    return (
        <div
            className={`${style.chatlistItem} ${style.chatlistItem_padding}`}
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