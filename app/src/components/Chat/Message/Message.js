import React from 'react';
import { RemoveMessage } from './RemoveMessage/RemoveMessage';
import style from './Message.module.css';

function Message(props) {
    function textConverter(text) {
        let res = [];
        let splitedText = text.split("\n");

        for (let i = 0; i < splitedText.length; i++) {
            let txtI = splitedText[i];
            let subText = txtI.split(" ");

            for (let j = 0; j < subText.length; j++) {
                let txtJ = subText[j];

                if (/http([s]?):{1,2}\S+/.test(txtJ.toString())) {
                    res.push(
                        <a
                            href={txtJ}
                            target="_blank"
                            rel="noreferrer"
                            key={new Date() - 0 + Math.random()}
                            className={style.messageLink}
                        >
                            {txtJ}
                        </a>
                    );
                }
                else
                    res.push(txtJ);
                res.push(" ");
            }

            res.push(<br key={new Date() - 0 + Math.random()} />);
        }

        return res;
    }

    return (
        <div className={`${style.message__wrapper} ${style.message__wrapper_padding} ${style.message__wrapper_margin}`}>
            <RemoveMessage />
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