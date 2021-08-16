/**
 * Функция возвращет массив сообщений бизнесс-переписки
 * 
 * @param {Object} usersInfo Информация о каждом зарегистрированном пользователе
 * @returns {Object []} Сообщения в бизнес-переписке
 * {
 * id: {number},      - id сообщения
 * userData,          - ссылка на usersInfo конкретного польователя
 * userText: {string} - текст сообщения
 * usersLikes: {Object []} - массив ссылок на usersInfo пользователей, поставивших лайк под сообщением
 * }
 */
function getBusinessChat(usersInfo) {
    return ([{
        id: 101,
        userData: usersInfo[0],
        userText: "Всем привет!",
        usersLikes: []
    },
    {
        id: 102,
        userData: usersInfo[1],
        userText: "Добрый день!",
        usersLikes: []
    },
    {
        id: 103,
        userData: usersInfo[2],
        userText: "Приветствую :)",
        usersLikes: []
    }
    ]);
}

export {
    getBusinessChat
};