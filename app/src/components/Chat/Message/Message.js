import React from 'react';
import style from './Message.module.css';

function Message(props) {
    function textConverter(text) {
        let res = [];

        for (let i = 0; i < text.length; i++) {
            if (text[i] === "\n")
                res.push(<br key={new Date - 0 + Math.random()} />);
            else
                res.push(text[i]);
        }

        return res;
    }

    return (
        <div className={`${style.message__wrapper} ${style.message__wrapper_padding} ${style.message__wrapper_margin}`}>
            <div className={`${style.message__description} ${style.message__description_margin}`}>
                <img
                    src={props.userAvaSrc}
                    alt="#"
                    className={`${style.message__icon} ${style.message__icon_margin}`}
                />
                <p className={style.message__userName}>{props.userName}</p>
            </div>
            <p className={`${style.message__text} ${style.message__text_margin}`}>{textConverter(props.userMessageText)}</p>
        </div>
    )
}

export { Message };