import React from 'react';
import style from './Message.module.css';

function Message() {
    return (
        <div className={`${style.message__wrapper} ${style.message__wrapper_padding} ${style.message__wrapper_margin}`}>
            <div className={`${style.message__description} ${style.message__description_margin}`}>
                <img
                    src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg"
                    alt="#"
                    className={`${style.message__icon} ${style.message__icon_margin}`}
                />
                <p className={style.message__userName}>Ivan</p>
            </div>
            <p className={style.message__text}>ыв ывтофы ычтяьс ывр</p>
        </div>
    )
}

export { Message };