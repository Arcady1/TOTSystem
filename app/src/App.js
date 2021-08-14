import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Chatlist } from './components/Chatlist/Chatlist';
import { Chat } from './components/Chat/Chat';
import style from './App.module.css';

/**
 * 
 * @returns {JSX} Main JSX
 */
function App() {
  /**
   * @type {number} Индекс сообщения в чате, которое редактирует пользователь
   * @default null
   * Если еременная === null, то никакое сообщение не редактируется, иначе, если 
   * переменная === {number} - индекс сообщения в массиве сообщений чата, - редактируется
   */
  const [currentMessageIdx, setCurrentMessageIdx] = useState(null);

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
  const [businessMessages, setBusinessMessages] = useState([
    {
      id: 101,
      userData: usersInfo[0],
      userText: "Всем привет!"
    },
    {
      id: 102,
      userData: usersInfo[1],
      userText: "Добрый день!"
    },
    {
      id: 103,
      userData: usersInfo[2],
      userText: "Приветствую :)"
    }
  ]);

  /**
   * @type {Object []} Сообщения в обычной переписке
   * {
   * id: {number},      - id сообщения
   * userData,          - ссылка на usersInfo конкретного польователя
   * userText: {string} - текст сообщения
   * }
   */
  const [floodMessages, setFloodMessages] = useState([
    {
      id: 201,
      userData: usersInfo[1],
      userText: "Всем привет! Это флууд чат)"
    },
    {
      id: 202,
      userData: usersInfo[2],
      userText: "Хай!"
    },
    {
      id: 203,
      userData: usersInfo[0],
      userText: "Приветствую! Неформальное общение!)"
    }
  ]);

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
      dialogImgSrc: "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg",
      dialogName: "Business",
      dialogMessages: businessMessages,
    },
    {
      dialogId: 1,
      dialogImgSrc: "https://i.pinimg.com/originals/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
      dialogName: "Flood",
      dialogMessages: floodMessages,
    }
  ];

  /**
   * @type {number} id открытого чата
   * @default 0
   */
  const [chatTypeId, setChatType] = useState(0);

  /**
   * Функция указывает id текущего чата
   * 
   * @param {number} chatId Id открытого чата
   */
  function switchChat(chatId) {
    setChatType(chatId);
  }

  /**
   * Функция обновляет список сообщений в чате
   * 
   * @param {string} messagesName Название текущего чата
   */
  function updateMessagesData(messagesName) {
    if (messagesName === "Business")
      setBusinessMessages(businessMessages.slice());
    else if (messagesName === "Flood")
      setFloodMessages(floodMessages.slice());
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
        userText: messageInfo.text
      });
    }
    else {
      dialog.dialogMessages[currentMessageIdx].userText = messageInfo.text;
      setCurrentMessageIdx(null);
    }

    updateMessagesData(dialog.dialogName);
    scrollChatToBottom();
  }

  /**
   * Функция запускается при нажатии кнопки удаления ссобщения
   * Удаляет сообщение из списка сообщений текущего чата
   * 
   * @param {number} messageId Id удаленного из чата сообщения
   */
  function handleMessageRemove(messageId) {
    const dialog = dialogs[chatTypeId].dialogMessages;
    const newMessagesArr = dialog.filter((message) => (!(message.id === messageId)));

    if (dialogs[chatTypeId].dialogName === "Business")
      setBusinessMessages(newMessagesArr);
    else if (dialogs[chatTypeId].dialogName === "Flood")
      setFloodMessages(newMessagesArr);
  }

  /**
   * Функция запускается при нажатии кнопки редактирования ссобщения
   * Редактирует сообщение из списка сообщений текущего чата
   * 
   * @param {string} text Исходный текст сообщения
   * @param {number} messageId Id редактируемого сообщения
   */
  function handleMessageCorrect(text, messageId) {
    document.getElementById('messageInput').value = text;

    const message = dialogs[chatTypeId].dialogMessages;

    message.find((elem, idx) => {
      if (elem.id === messageId) {
        setCurrentMessageIdx(idx);
        return true;
      }

      return false;
    });
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

  return (
    <div className={style.content__wrapper}>
      <div className={`${style.content} ${style.content_padding} ${style.content_margin}`}>
        <Header />
        <div className={style.main}>
          <Chatlist
            dialogs={dialogs}
            switchChat={(chatId) => switchChat(chatId)}
            activeChatId={chatTypeId}
          />
          <Chat
            messages={dialogs[chatTypeId].dialogMessages}
            currentUserId={1}
            handleMessageSend={(messageInfo) => handleMessageSend(messageInfo)}
            handleMessageCorrect={(text, messageId) => handleMessageCorrect(text, messageId)}
            onMessageRemove={(messageId) => handleMessageRemove(messageId)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
