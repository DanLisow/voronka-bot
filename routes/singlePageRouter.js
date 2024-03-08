const { Router } = require("express");
const router = new Router();

router.get(["/first", "/second", "/third", "/fourth", "/fifth"], (req, res) =>
  res.render("warning", { text: "Зайди к нам через телеграм-бота" })
);

module.exports = router;
