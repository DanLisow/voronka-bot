const { Router } = require("express");
const router = new Router();
const liveMiddleware = require("../middlewares/liveMiddleware");
const userController = require("../controllers/userController");

router.get(
  [
    "/first/:uniqueId",
    "/second/:uniqueId",
    "/third/:uniqueId",
    "/fourth/:uniqueId",
    "/fifth/:uniqueId",
  ],
  liveMiddleware,
  userController.getUser
);

router.post(
  [
    "/first/:uniqueId",
    "/second/:uniqueId",
    "/third/:uniqueId",
    "/fourth/:uniqueId",
    "/fifth/:uniqueId",
  ],
  userController.sendTask
);

module.exports = router;
