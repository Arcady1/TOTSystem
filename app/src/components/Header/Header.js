import React from 'react';
import style from './Header.module.css';

function Header(props) {
    /**
     * Функция вращает стрелку в Header при смене id активного окна
     * 
     * @returns {string}
     */
    function rotateButton() {
        if (props.smallWidthActiveWindow === 0)
            return style.rotateMenuButton;
        else
            return "";
    }

    return (
        <header className={style.header}>
            <button
                className={`${style.menuButton} ${rotateButton()}`}
                onClick={(event) => {
                    event.preventDefault();
                    return props.changeSmallWidthActiveWindow()
                }}
            >
            </button>
            <p>TOT Systems chat</p>
        </header>
    );
}

export { Header };