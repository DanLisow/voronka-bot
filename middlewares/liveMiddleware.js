const User = require("../models/user");

module.exports = async function (req, res, next) {
  try {
    const uniqueId = req.params.uniqueId;
    const user = await User.findOne({ userId: uniqueId }).exec();

    if (!user) {
      return res.render("warning", { text: "Зайди к нам через телеграм-бота" });
    }

    if (user.lives === 0) {
      return res.render("warning", { text: "У тебя закончились все жизни" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
