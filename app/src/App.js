import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Chatlist } from './components/Chatlist/Chatlist';
import { Chat } from './components/Chat/Chat';
import style from './App.module.css';

function App() {
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
      userData: usersInfo[0],
      userText: "Всем привет!"
    },
    {
      userData: usersInfo[1],
      userText: "Добрый день!"
    },
    {
      userData: usersInfo[2],
      userText: "Приветствую :)"
    }
  ]);

  // Сообщения в обычной-переписке
  const [floodMessages, setFloodMessages] = useState([
    {
      userData: usersInfo[1],
      userText: "Всем привет! Это флууд чат)"
    },
    {
      userData: usersInfo[2],
      userText: "Хай!"
    },
    {
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

  function handleMessageSend(messageInfo) {
    const dialog = dialogs.find((elem) => elem.dialogId === messageInfo.chatId);

    dialog.dialogMessages.push({
      userData: usersInfo[messageInfo.userId],
      userText: `${messageInfo.text}`
    });

    if (dialog.dialogName === "Business")
      setBusinessMessages(businessMessages.slice());
    else if (dialog.dialogName === "Flood")
      setFloodMessages(floodMessages.slice());
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
            handleMessageSend={(messageInfo) => handleMessageSend(messageInfo)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
