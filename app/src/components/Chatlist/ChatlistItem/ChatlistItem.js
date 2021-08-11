import React from 'react';
import style from './ChatlistItem.module.css';

function ChatlistItem() {
    return (
        <div className={`${style.chatlistItem} ${style.chatlistItem_padding}`}>
            <img
                src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg"
                alt="#"
                className={`${style.chatImage} ${style.chatImage_margin}`}
            >
            </img>
            <p className={style.chatName}>Business</p>
        </div>
    )
}

export { ChatlistItem };