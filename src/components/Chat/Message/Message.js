import React from 'react';
import { RemoveMessage } from './RemoveMessage/RemoveMessage';
import { randomValueGenerator } from '../../../js/randomValueGenerator';
import style from './Message.module.css';

function Message(props) {
    /**
     * Функция конвертирует введенный текст в JSX разметку 
     * для его корректного отображения в HTML 
     * 
     * @param {string} text Текст введенного в чате сообщения
     * @returns {JSX []} Массив JSX разметки 
     */
    function textConverter(text) {
        let res = [];
        let splitedText = text.split("\n");

        // Текст разбит по абзацам
        for (let i = 0; i < splitedText.length; i++) {
            let txtI = splitedText[i];
            let subText = txtI.split(" ");

            // Абзацы разбиты по словам
            for (let j = 0; j < subText.length; j++) {
                let txtJ = subText[j];

                // Форматирование ссылок
                if (/http([s]?):{1,2}\S+/.test(txtJ.toString())) {
                    res.push(
                        <a
                            href={txtJ}
                            target="_blank"
                            rel="noreferrer"
                            key={randomValueGenerator(new Date())}
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

            res.push(<br key={randomValueGenerator(new Date())} />);
        }

        return res;
    }

    /**
     * Функция отображает кнопки удаления и редактирования сообщений
     * для пользователя, который отправил это сообщение
     * 
     * @param {number} messageSenderId Id отправителя сообщения
     * @param {number} userId Id текущего пользователя
     * @returns {JSX | null}
     */
    function removeMessageBlock(messageSenderId, userId) {
        if (messageSenderId === userId)
            return (
                <RemoveMessage
                    onMessageRemove={() => props.onMessageRemove()}
                    onMessageCorrect={() => props.onMessageCorrect()}
                />
            );
        else
            return null;
    }

    /**
     * Функция проверяет, поставил ли пользователь лайк под сообщением
     * 
     * @param {number} currentUserId Id текущего пользователя
     * @param {number []} likesArr Массив id пользователей, поставивших лайк под сообщениями
     * @returns {string}
     */
    
    return (
        <div className={`${style.message__wrapper} ${style.message__wrapper_padding} ${style.message__wrapper_margin}`}>
            {removeMessageBlock(props.messageSenderId, props.userInfo.userId)}
            <div className={`${style.message__description} ${style.message__description_margin}`}>
                <img
                    src={props.userInfo.userAvaSrc}
                    alt="#"
                    className={`${style.message__icon} ${style.message__icon_margin}`}
                />
                <p className={style.message__userName}>{props.userInfo.userName}</p>
            </div>
            <p className={`${style.message__text} ${style.message__text_margin}`}>{textConverter(props.userInfo.userMessageText)}</p>
            <button
                className={`${style.heartMessage} ${style.dislikeMessage} ${props.userInfo.usersLikes.includes(props.userInfo.userId) ? style.likeMessage : ""}`}
                onClick={(event) => {
                    event.preventDefault();
                    return props.handleLikeMessageClick();
                }}
            >
            </button>
        </div>
    )
}

export { Message };