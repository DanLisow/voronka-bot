const { Telegraf, Composer } = require("telegraf");
const user = require("./composers/user");
const admin = require("./composers/admin");

const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);

bot.use(Composer.acl(Number(process.env.ADMIN), admin));
bot.use(user);

module.exports = bot;
