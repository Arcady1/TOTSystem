import { Message } from './Message/Message';
import style from './Chat.module.css';

function Chat(props) {
    return (
        <div className={`${style.chat} ${style.chat_padding}`}>
            <div className={style.chat__wrapper}>
                {props.messages.map((elem) => (
                    <Message
                        key={new Date() - 0 + Math.random()}
                        userInfo={{
                            userId: props.currentUserId,
                            userAvaSrc: elem.userData.avaSrc,
                            userName: elem.userData.name,
                            userMessageText: elem.userText,
                        }}
                        messageSenderId={elem.userData.id}
                        messageId={elem.id}
                        onMessageRemove={() => props.onMessageRemove(elem.id)}
                        onMessageCorrect={() => props.handleMessageCorrect(elem.userText, elem.id)}
                    />
                ))}
            </div>
            <div className={`${style.chat__input__wrapper} ${style.chat__input__wrapper_margin}`}>
                <textarea
                    id="messageInput"
                    className={`${style.chat__input} ${style.chat__input_padding} ${style.chat__input_margin}`}
                    rows="30"
                    cols="30"
                    placeholder="Message"
                />
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
                            chatId: props.chatId,
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