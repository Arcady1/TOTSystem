/**
 * Функция возвращет массив сообщений обычной переписки
 * 
 * @param {Object} usersInfo Информация о каждом зарегистрированном пользователе
 * @returns {Object []} Сообщения в обычной переписке
 * {
 * id: {number},      - id сообщения
 * userData,          - ссылка на usersInfo конкретного польователя
 * userText: {string} - текст сообщения
 * usersLikes: {Object []} - массив ссылок на usersInfo пользователей, поставивших лайк под сообщением
 * }
 */
function getFloodChat(usersInfo) {
    return ([{
        id: 201,
        userData: usersInfo[1],
        userText: "Всем привет! Это флууд чат)",
        usersLikes: []
    },
    {
        id: 202,
        userData: usersInfo[2],
        userText: "Хай!",
        usersLikes: []
    },
    {
        id: 203,
        userData: usersInfo[0],
        userText: "Приветствую! Неформальное общение!)",
        usersLikes: []
    }
    ]);
}

export {
    getFloodChat
};