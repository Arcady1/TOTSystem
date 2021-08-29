import { useRef } from 'react';
import { Message } from './Message/Message';
import { randomValueGenerator } from '../../js/randomValueGenerator';
import Picker from 'emoji-picker-react';
import style from './Chat.module.css';

function Chat(props) {
    /**
     * @type {Object} Ссылка на DOM textarea
     * @default null
     */
    const inputEl = useRef(null);

    /**
     * Функция добавляет выбранное эмоджи в input
     * 
     * @param {Event} event 
     * @param {Object} emojiObject 
     */
    function onEmojiClick(event, emojiObject) {
        const input = document.getElementById('messageInput');
        input.value += emojiObject.emoji;
    };

    /**
     * Функция реагирует на отправку сообщения пользователем
     * 
     * @returns {Boolean | void}
     */
    function onSubmitButtonClick() {
        const inputTextareaElem = inputEl.current;
        const inputValue = inputTextareaElem.value;

        inputTextareaElem.focus();

        if (!/(\s*\S+\s*)+/g.test(inputValue)) {
            inputTextareaElem.value = "";
            return false;
        }

        inputTextareaElem.value = "";

        props.handleMessageSend({
            userId: props.currentUserId,
            text: inputValue
        });
    }

    return (
        <div className={`${style.chat} ${style.chat_padding} ${props.smallWidthActiveWindow === 0 ? style.chatShow : ""}`}>
            <div
                className={style.chat__wrapper}
                id="chatWrapper"
            >
                {props.messages.map((elem, messageIdxInChatArray) => (
                    <Message
                        key={randomValueGenerator(new Date())}
                        userInfo={{
                            userId: props.currentUserId,
                            userAvaSrc: elem.userData.avaSrc,
                            userName: elem.userData.name,
                            userMessageText: elem.userText,
                            usersLikes: elem.usersLikes
                        }}
                        messageSenderId={elem.userData.id}
                        onMessageRemove={() => props.onMessageRemove(messageIdxInChatArray)}
                        onMessageCorrect={() => props.handleMessageCorrect(elem.userText, messageIdxInChatArray)}
                        handleLikeMessageClick={() => props.handleLikeMessageClick(messageIdxInChatArray)}
                    />
                ))}
            </div>
            <div className={`${style.chat__input__wrapper} ${style.chat__input__wrapper_margin}`}>
                <div className={style.textarea__wrapper}>
                    <textarea
                        id="messageInput"
                        className={`${style.chat__input} ${style.chat__input_padding} ${style.chat__input_margin}`}
                        rows="30"
                        cols="30"
                        placeholder="Message"
                        ref={inputEl}
                    />
                    <div className={style.input__emoji__wrapper}>
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>
                </div>
                <button
                    className={style.chat__sendButton}
                    onClick={(event) => {
                        event.preventDefault();
                        return onSubmitButtonClick();
                    }}
                >
                </button>
            </div>
        </div>
    )
}

export { Chat };