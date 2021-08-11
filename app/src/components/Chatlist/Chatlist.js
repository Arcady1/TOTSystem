import React from 'react';
import { ChatlistItem } from './ChatlistItem/ChatlistItem';
import style from './Chatlist.module.css';

function Chatlist() {
    return (
        <div className={style.chatList}>
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
            <ChatlistItem />
        </div>
    )
}

export { Chatlist };