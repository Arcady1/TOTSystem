import React from 'react';
import { Message } from './Message/Message';
import style from './Chat.module.css';

function Chat() {
    return (
        <div className={`${style.chat} ${style.chat_padding}`}>
            <div className={style.chat__wrapper}>
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
            <div className={`${style.chat__input__wrapper} ${style.chat__input__wrapper_margin}`}>
                <textarea
                    className={`${style.chat__input} ${style.chat__input_padding} ${style.chat__input_margin}`}
                    rows="30"
                    cols="30"
                    placeholder="Message"
                />
                <button className={style.chat__sendButton}></button>
            </div>
        </div>
    )
}

export { Chat };