require("dotenv").config();
const express = require("express");
const bot = require("./bot/index");
const connect = require("./db");
const app = express();
const path = require("path");
const router = require("./routes/index");

const PORT = process.env.PORT || 5000;

app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

bot.launch();

// Запуск сервера
const start = async () => {
  try {
    connect.on(
      "error",
      console.error.bind(console, "Ошибка подключения к MongoDB:")
    );
    connect.once("open", () => {
      console.log("Успешное подключение к MongoDB");
    });

    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();