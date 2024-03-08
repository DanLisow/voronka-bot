const User = require("../../models/user");
const Lesson = require("../../models/lesson");
const Live = require("./livesBotController");
const crypto = require("crypto");

const reduceLives = (lives, availableTime = 0) => {
  if (lives === 2) {
    return Live.getOneLive();
  }

  if (lives === 1 && availableTime === 2) {
    return Live.getThreeLive();
  }

  if (lives === 1) {
    return Live.getTwoLive();
  }

  return Live.endLive();
};

class UserBotController {
  async decreaseLives(ctx, next) {
    const delay = process.env.EXPIRES * 1000;

    setTimeout(async function time() {
      const user = await User.findOne({ chatId: ctx.chat.id }).exec();
      if (user.lives === 0) {
        clearTimeout(time);

        return;
      }

      user.availableTime--;

      if (user.lives === 1 && user.availableTime === 2) {
        const { message, image } = reduceLives(user.lives, user.availableTime);
        ctx.replyWithPhoto(
          { source: image },
          { caption: message, parse_mode: "HTML" }
        );
      }

      if (user.availableTime === 0) {
        user.lives--;

        user.availableTime = 24;

        await user.save();

        const { message, image } = reduceLives(user.lives);
        ctx.replyWithPhoto(
          { source: image },
          { caption: message, parse_mode: "HTML" }
        );
      }

      await user.save();

      setTimeout(time, delay);
    }, delay);
  }

  async create(chat, username, image) {
    const uniqueId = crypto
      .randomBytes(3 * 4)
      .toString("base64")
      .replace(/[#_+.-=?!;%:^&$></\\/|]/g, "s");

    const user = new User({
      userId: uniqueId,
      chatId: chat,
      username: username ?? "user-" + uniqueId,
      image: image,
    });

    await user
      .save()
      .then(() => {
        console.log("Пользователь успешно сохранен в базе данных");
      })
      .catch((error) => {
        console.error("Ошибка сохранения пользователя:", error);
      });

    return `${process.env.BASE_URL}/first/${uniqueId}`;
  }
}

module.exports = new UserBotController();
