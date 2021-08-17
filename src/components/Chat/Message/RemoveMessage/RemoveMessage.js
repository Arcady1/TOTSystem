import React from 'react';
import style from './RemoveMessage.module.css';

function RemoveMessage(props) {
    return (
        <div className={style.messageRemoveAndCorect}>
            <div
                className={`${style.removeMessage} ${style.removeAndCorrect} ${style.removeAndCorrect_margin}`}
                onClick={() => props.onMessageRemove()}
            >
            </div>
            <div
                className={`${style.correctMessage} ${style.removeAndCorrect} ${style.removeAndCorrect_margin}`}
                onClick={() => props.onMessageCorrect()}
            >
            </div>
        </div>
    );
}

export { RemoveMessage };