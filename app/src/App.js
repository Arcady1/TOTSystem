import { Header } from './components/Header/Header';
import { Chatlist } from './components/Chatlist/Chatlist';
import { Chat } from './components/Chat/Chat';
import style from './App.module.css';

function App() {
  return (
    <div className={style.content__wrapper}>
      <div className={`${style.content} ${style.content_padding} ${style.content_margin}`}>
        <Header />
        <div className={style.main}>
          <Chatlist />
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
