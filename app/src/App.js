import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Chatlist } from './components/Chatlist/Chatlist';
import { Chat } from './components/Chat/Chat';
import style from './App.module.css';

function App() {
  const [currentMessageData, setCurrentMessageData] = useState(null);

  // Информация о каждом зарегистрированном пользователе 
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

  // Сообщения в бизнес-переписке
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

  // Сообщения в обычной-переписке
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

  // Чаты
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

  // Какой чат сейчас открыт
  const [chatTypeId, setChatType] = useState(0);

  function switchChat(chatId) {
    setChatType(chatId);
  }

  function updateMessagesData(messagesName) {
    if (messagesName === "Business")
      setBusinessMessages(businessMessages.slice());
    else if (messagesName === "Flood")
      setFloodMessages(floodMessages.slice());
  }

  function handleMessageSend(messageInfo) {
    const dialog = dialogs[chatTypeId];

    if (currentMessageData === null) {
      dialog.dialogMessages.push({
        id: new Date() - 0 + Math.random(),
        userData: usersInfo[messageInfo.userId],
        userText: messageInfo.text
      });

      updateMessagesData(dialog.dialogName);
    }
    else {
      dialog.dialogMessages[currentMessageData.idx].userText = messageInfo.text;

      updateMessagesData(dialog.dialogName);
      setCurrentMessageData(null);
    }
  }

  function handleMessageRemove(messageId) {
    const dialog = dialogs[chatTypeId].dialogMessages;
    const newMessagesArr = dialog.filter((message) => (!(message.id === messageId)));

    if (dialogs[chatTypeId].dialogName === "Business")
      setBusinessMessages(newMessagesArr);
    else if (dialogs[chatTypeId].dialogName === "Flood")
      setFloodMessages(newMessagesArr);
  }

  function handleMessageCorrect(text, messageId) {
    document.getElementById('messageInput').value = text;

    const message = dialogs[chatTypeId].dialogMessages;
    const messageData = {};

    message.find((elem, idx) => {
      if (elem.id === messageId) {
        messageData.id = elem.id;
        messageData.idx = idx;

        return true;
      }

      return false;
    });

    setCurrentMessageData(messageData);
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
            chatId={chatTypeId}
            currentUserId={1}
            handleMessageSend={(messageInfo) => handleMessageSend(messageInfo)}
            onMessageRemove={(messageId) => handleMessageRemove(messageId)}
            handleMessageCorrect={(text, messageId) => handleMessageCorrect(text, messageId)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
