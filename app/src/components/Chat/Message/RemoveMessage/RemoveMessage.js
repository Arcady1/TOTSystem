import React from 'react';
import style from './RemoveMessage.module.css';

function RemoveMessage() {
    return (
        <div className={style.messageRemoveAndCorect}>
            <div className={`${style.removeMessage} ${style.removeAndCorrect} ${style.removeAndCorrect_margin}`}></div>
            <div className={`${style.correctMessage} ${style.removeAndCorrect} ${style.removeAndCorrect_margin}`}></div>
        </div>
    );
}

export { RemoveMessage };