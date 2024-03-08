const path = require("path");

class LivesBotController {
  static getOneLive() {
    const message =
      "<b>⚠️Отпал первый плавник, потому что ты не проходишь урок.</b>\n\n" +
      "Если потерять 3 плавника — доступ к тренингу закроется.\n\n" +
      "<b>Проходи урок</b> и сдавай задание, чтобы все восстановить💪";

    return {
      message: message,
      image: path.resolve(__dirname, "../../images", "one-live.jpg"),
    };
  }

  static getTwoLive() {
    const message =
      "<b>🦈⚠️Отпал второй плавник, потому что ты 2 дня не проходишь урок.</b>\n\n" +
      "Если отпадет еще 1 плавник — я закрываю тебе доступ к урокам и бонусам.\n\n" +
      "<b>Проходи урок</b> и сдавай задание, чтобы все восстановить💪";

    return {
      message: message,
      image: path.resolve(__dirname, "../../images", "two-live.jpg"),
    };
  }

  static getThreeLive() {
    const message =
      "<b>⚠️⚠️⚠️Осталось 2 часа.</b>\n\n" +
      "Ты потерял третий плавник, потому что так и не посмотрел уроки.\n\n" +
      "Через 2 часа система закроет доступ к урокам, бонусам и боту.\n\n" +
      "<b>Проходи урок</b> и сдавай задание, чтобы все восстановить💪";

    return {
      message: message,
      image: path.resolve(__dirname, "../../images", "three-live.jpg"),
    };
  }

  static endLive() {
    const message = "<b>Доступ закрыт.</b>";

    return {
      message: message,
      image: path.resolve(__dirname, "../../images", "end-live.jpg"),
    };
  }
}

module.exports = LivesBotController;
