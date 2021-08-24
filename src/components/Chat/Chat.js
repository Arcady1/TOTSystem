import { Message } from './Message/Message';
import { randomValueGenerator } from '../../js/randomValueGenerator';
import Picker from 'emoji-picker-react';
import style from './Chat.module.css';

function Chat(props) {
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
                    />
                    <div className={style.input__emoji__wrapper}>
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>
                </div>
                <button
                    className={style.chat__sendButton}
                    onClick={(event) => {
                        event.preventDefault();

                        const inputElem = document.getElementById("messageInput");
                        const inputValue = inputElem.value;

                        if (!/(\s*\S+\s*)+/g.test(inputValue)) {
                            inputElem.value = "";
                            return false;
                        }

                        inputElem.value = "";

                        props.handleMessageSend({
                            userId: props.currentUserId,
                            text: inputValue
                        });
                    }}
                >
                </button>
            </div>
        </div>
    )
}

export { Chat };