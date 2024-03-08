const User = require("../../models/user");
const Live = require("../controllers/livesBotController");

module.exports = async function (ctx, next) {
  const checkUser = await User.findOne({ chatId: ctx.chat.id }).exec();

  if (checkUser) {
    if (checkUser.lives === 0) {
      const { message, image } = Live.endLive();
      ctx.replyWithPhoto(
        { source: image },
        { caption: message, parse_mode: "HTML" }
      );
      return;
    }

    ctx.reply("Вы уже начали");

    return next();
  }

  next();
};
