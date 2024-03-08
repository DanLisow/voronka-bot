const User = require("../../models/user");
const { Composer } = require("telegraf");

const admin = new Composer();

admin.start((ctx) => {
  ctx.reply("Вы не можете проходить данный курс");
});

admin.on("callback_query", async (ctx) => {
  await ctx.answerCbQuery();

  const query = ctx.update.callback_query.data;

  const callbackAnswer = query.indexOf("approved") === -1;

  const lesson = query.split("-")[1];
  const chatId = query.split("-")[2];

  if (callbackAnswer) {
    ctx.reply("Попробуй еще раз выполнить домашнее задание", {
      chat_id: chatId,
    });

    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);

    return;
  }

  const user = await User.findOne({ chatId: chatId }).exec();

  const nextLesson = findLesson(user.lessons, lesson);

  if (nextLesson === "end") {
    ctx.reply("Ты весь курс прошел епта", {
      chat_id: chatId,
    });

    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);

    return;
  }

  user.lessons[nextLesson] = true;
  user.actualLesson = nextLesson;
  user.availableTime = 24;

  await user.save();

  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);

  ctx.reply(
    `Переходи к следующему уроку\n\n${process.env.BASE_URL}/${nextLesson}/${user.userId}`,
    {
      chat_id: chatId,
      parse_mode: "HTML",
    }
  );

  return;
});

function findLesson(obj, lesson) {
  const keysArr = Object.keys(obj);
  const keysArrIndex = keysArr.indexOf(lesson);

  if (keysArrIndex === keysArr.length - 1) {
    return "end";
  }

  return keysArr[keysArrIndex + 1];
}

module.exports = admin;
