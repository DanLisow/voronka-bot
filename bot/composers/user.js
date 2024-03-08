const { Composer } = require("telegraf");
const userBotController = require("../controllers/userBotController");
const userCheck = require("../middlewares/userCheckMiddleware");
const User = require("../../models/user");
const s3 = require("../../s3");
const axios = require("axios");
const path = require("path");

const userNotAdmin = new Composer();

userNotAdmin.start(userCheck, async (ctx, next) => {
  const user = await User.findOne({ chatId: ctx.chat.id }).exec();

  if (user) return next();

  ctx.reply("Привет");

  const userImage = await getUserPhoto(ctx);

  const userCreate = await userBotController.create(
    ctx.chat.id,
    ctx.from.username,
    userImage
  );

  ctx.reply(userCreate);

  next();
});

userNotAdmin.use(userBotController.decreaseLives);

async function getUserPhoto(ctx) {
  const userPhotos = await ctx.telegram.getUserProfilePhotos(ctx.from.id, 0, 1);

  if (userPhotos.total_count === 0) {
    return "https://voronka-bot.storage.yandexcloud.net/user.png";
  }

  const userFileLink = await ctx.telegram.getFileLink(
    userPhotos.photos[0][userPhotos.photos[0].length - 1].file_id
  );

  const bufferFile = await axios.get(userFileLink.href, {
    responseType: "arraybuffer",
  });

  const downloadImage = await s3.Upload(
    {
      buffer: bufferFile.data,
      name: `${ctx.chat.id}.jpg`,
    },
    "/images/"
  );

  return downloadImage.Location;
}

module.exports = userNotAdmin;
