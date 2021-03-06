import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Chatlist } from './components/Chatlist/Chatlist';
import { Chat } from './components/Chat/Chat';
import { getBusinessChat } from './js/businessMessages';
import { getFloodChat } from './js/floodMessages';
import style from './App.module.css';

/**
 * 
 * @returns {JSX} Main JSX
 */
function App() {
  /**
   * @type {number} Id текущего пользователя
   * @default 1
   */
  const currentUserId = 1;

  /**
   * @type {number} Индекс сообщения в чате, которое редактирует пользователь
   * @default null
   * Если еременная === null, то никакое сообщение не редактируется, иначе, если 
   * переменная === {number} - индекс сообщения в массиве сообщений чата, - редактируется
   */
  const [currentMessageIdx, setCurrentMessageIdx] = useState(null);

  /**
   * @type {number} Id открытого чата
   * @default 0
   */
  const [chatTypeId, setChatType] = useState(Number(localStorage.getItem("chatId") === null));

  /**
   * @type {number} Id активного окна (0 - список чатов, 1 - чат)
   * @default 0
   */
  const [smallWidthActiveWindow, setSmallWidthActiveWindow] = useState(Number(localStorage.getItem("smallWidthActiveWindow") === null));

  /** 
   * @type {Object} Информация о каждом зарегистрированном пользователе
   * {
   * id: {number},      - id пользователя 
   * avaSrc: {string},  - адрес аватарки
   * name: {string},    - имя пользователя
   * }
   */
  const usersInfo = {
    0: {
      id: 0,
      avaSrc: "https://pickaface.net/gallery/avatar/26728774_180318_1421_8htbtm.png",
      name: "Ivan",
    },
    1: {
      id: 1,
      avaSrc: "https://pbs.twimg.com/profile_images/865695281492381696/81tOUsc7_400x400.jpg",
      name: "Me",
    },
    2: {
      id: 2,
      avaSrc: "https://pbs.twimg.com/profile_images/1354243500905267202/WoLb2jJx_400x400.jpg",
      name: "Alex",
    }
  }

  /** 
   * @type {Object []} Сообщения в бизнес-переписке
   * {
   * id: {number},      - id сообщения
   * userData,          - ссылка на usersInfo конкретного польователя
   * userText: {string} - текст сообщения
   * }
   */
  const [businessMessages, setBusinessMessages] = useState(() => {
    if (localStorage.getItem("business") === null)
      return getBusinessChat(usersInfo);
    else
      return JSON.parse(localStorage.getItem("business"));
  });

  /**
   * @type {Object []} Сообщения в обычной переписке
   * {
   * id: {number},      - id сообщения
   * userData,          - ссылка на usersInfo конкретного польователя
   * userText: {string} - текст сообщения
   * }
   */
  const [floodMessages, setFloodMessages] = useState(() => {
    if (localStorage.getItem("flood") === null)
      return getFloodChat(usersInfo);
    else
      return JSON.parse(localStorage.getItem("flood"));
  });

  /**
   * Существующие чаты
   * 
   * @type {Object []} 
   * {
   * dialogId: {number},    - id чата
   * dialogImgSrc: {string},- ссылка на аватарку чата
   * dialogName: {string},  - название чата
   * dialogMessages         - ссыка на все сообщения чата
   * }
   */
  const dialogs = [
    {
      dialogId: 0,
      dialogImgSrc: "https://image.flaticon.com/icons/png/512/2910/2910791.png",
      dialogName: "Business",
      dialogMessages: businessMessages,
    },
    {
      dialogId: 1,
      dialogImgSrc: "https://image.flaticon.com/icons/png/512/170/170069.png",
      dialogName: "Flood",
      dialogMessages: floodMessages,
    }
  ];

  /**
   * Функция указывает id текущего чата
   * 
   * @param {number} chatId Id открытого чата
   */
  function switchChat(chatId) {
    setChatType(chatId);
    changeSmallWidthActiveWindow();
    localStorage.setItem("chatId", chatId);
  }

  /**
   * Функция обновляет список сообщений в чате
   * 
   * @param {string} messagesName Название текущего чата
   */
  function updateMessagesData(chatTypeId) {
    if (chatTypeId === 0) {
      setBusinessMessages(businessMessages.slice());
      localStorage.setItem("business", JSON.stringify(businessMessages));
    }
    else if (chatTypeId === 1) {
      setFloodMessages(floodMessages.slice());
      localStorage.setItem("flood", JSON.stringify(floodMessages));
    }
  }

  /**
   * Функция запускается при нажатии кнопки отправки ссобщения
   * Добавляет новое сообщение в список сообщений текущего чата
   * 
   * @param {Object} messageInfo Информация об отправленном ссобщении
   * {
   * userId: {number},  - Id отправителя 
   * text: {string}     - текст сообщения
   * }
   */
  function handleMessageSend(messageInfo) {
    const dialog = dialogs[chatTypeId];

    if (currentMessageIdx === null) {
      dialog.dialogMessages.push({
        id: new Date() - 0 + Math.random(),
        userData: usersInfo[messageInfo.userId],
        userText: messageInfo.text,
        usersLikes: []
      });
    }
    else {
      dialog.dialogMessages[currentMessageIdx].userText = messageInfo.text;
      setCurrentMessageIdx(null);
    }

    updateMessagesData(chatTypeId);
    scrollChatToBottom();
  }

  /**
   * Функция запускается при нажатии кнопки удаления ссобщения
   * Удаляет сообщение из списка сообщений текущего чата
   * 
   * @param {number} messageIdx Индекс удаленного из чата сообщения
   */
  function handleMessageRemove(messageIdx) {
    const dialog = dialogs[chatTypeId].dialogMessages;

    dialog.splice(messageIdx, 1);
    updateMessagesData(chatTypeId);
  }

  /**
   * Функция запускается при нажатии кнопки редактирования ссобщения
   * Редактирует сообщение из списка сообщений текущего чата
   * 
   * @param {string} text Исходный текст сообщения
   * @param {number} messageIdx Индекс редактируемого сообщения
   */
  function handleMessageCorrect(text, messageIdx) {
    document.getElementById('messageInput').value = text;
    setCurrentMessageIdx(messageIdx);
  }

  /**
   * Функция скроллит чат вниз
   */
  function scrollChatToBottom() {
    setTimeout(() => {
      const block = document.getElementById("chatWrapper").lastChild;

      block.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }, 100);
  }

  /**
   * Функция меняет id активного окна (0 - список чатов, 1 - чат)
   */
  function changeSmallWidthActiveWindow() {
    if (smallWidthActiveWindow === 0) {
      setSmallWidthActiveWindow(1);
      localStorage.setItem("smallWidthActiveWindow", 1);
    }
    else {
      setSmallWidthActiveWindow(0);
      localStorage.setItem("smallWidthActiveWindow", 0);
    }
  }

  /**
   * Функция добавляет / удаляет лайки пользователя под сообщениями
   * 
   * @param {number} messageIdx Индекс сообщения в массиве сообщений чата
   */
  function handleLikeMessageClick(messageIdx) {
    const dialogMessages = dialogs.find((dialog) => dialog.dialogId === chatTypeId).dialogMessages;
    const messageLikes = dialogMessages[messageIdx].usersLikes;
    let idxOfMessage = -1;

    for (let i = 0; i < messageLikes.length; i++) {
      if (messageLikes[i] === currentUserId) {
        idxOfMessage = i;
        break;
      }
    }

    if (idxOfMessage === -1)
      messageLikes.push(currentUserId);
    else
      messageLikes.splice(idxOfMessage, 1);

    updateMessagesData(chatTypeId);
  }

  return (
    <div className={style.content__wrapper}>
      <div className={`${style.content} ${style.content_padding} ${style.content_margin}`}>
        <Header
          smallWidthActiveWindow={smallWidthActiveWindow}
          changeSmallWidthActiveWindow={() => changeSmallWidthActiveWindow()}
        />
        <div className={style.main}>
          <Chatlist
            dialogs={dialogs}
            switchChat={(chatId) => switchChat(chatId)}
            activeChatId={chatTypeId}
            smallWidthActiveWindow={smallWidthActiveWindow}
          />
          <Chat
            messages={dialogs[chatTypeId].dialogMessages}
            currentUserId={currentUserId}
            handleMessageSend={(messageInfo) => handleMessageSend(messageInfo)}
            handleMessageCorrect={(text, messageIdx) => handleMessageCorrect(text, messageIdx)}
            handleLikeMessageClick={(messageIdx) => handleLikeMessageClick(messageIdx)}
            onMessageRemove={(messageIdx) => handleMessageRemove(messageIdx)}
            smallWidthActiveWindow={smallWidthActiveWindow}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
