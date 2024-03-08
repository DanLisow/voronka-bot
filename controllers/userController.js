const bot = require("../bot");
const User = require("../models/user");

const lessonsAbbr = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
};

class UserController {
  async getUser(req, res) {
    try {
      const uniqueId = req.params.uniqueId;
      const actualLesson = req.url.split("/")[1];
      const user = await User.findOne({ userId: uniqueId }).exec();

      if (!user) {
        return res.render("warning", {
          text: "Зайди к нам через телеграм-бота",
        });
      }

      const checkLesson = user.lessons[actualLesson];

      if (!checkLesson) {
        return res.render("warning", {
          text: "Пройди предыдущие уроки, чтобы открыть этот урок",
        });
      }

      return res.render(actualLesson, {
        data: getUserAppereance(user, actualLesson),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendTask(req, res) {
    try {
      const userId = req.body.userId;
      const user = await User.findOne({ userId: userId }).exec();

      if (!user) {
        return res.status(304).send({ message: "Ошибка" });
      }

      const { answer, lesson } = req.body;

      sendHomework(answer, lesson, user.chatId, user.username);

      return res.status(200).send({ message: "Успешно", success: true });
    } catch (error) {
      console.log(error);
      return res.status(304).send({ message: "Ошибка" });
    }
  }
}

const getUserAppereance = (user, lesson) => {
  return {
    username: user.username,
    image: user.image,
    userId: user.userId,
    lives: user.lives,
    lesson: {
      name: lesson,
      key: lessonsAbbr[lesson],
      actual: {
        key: lessonsAbbr[user.actualLesson],
        lesson: user.actualLesson,
      },
    },
  };
};

const sendHomework = (answer, lesson, chatId, username) => {
  const message = `<b>Урок №${lessonsAbbr[lesson]}</b>\n\n<b>Отправил</b>: <a href="tg://user?id=${chatId}">${username}</a>\n<b>Ответ на задание</b>: ${answer}`;

  bot.telegram.sendMessage(process.env.ADMIN, message, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Одобрить",
            callback_data: `approved-${lesson}-${chatId}`,
          },
        ],
        [
          {
            text: "Отклонить",
            callback_data: `reject-${lesson}-${chatId}`,
          },
        ],
      ],
    },
  });

  return;
};

module.exports = new UserController();
