const { Router } = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const singleRouter = require("./singlePageRouter");

router.get("/", (req, res) => res.render("index"));
router.use("/", userRouter);
router.use("/", singleRouter);

module.exports = router;
