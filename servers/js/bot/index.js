const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_TOKEN_Barnum;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => bot.sendMessage(msg.chat.id, 'Добрый день! Ждите уведомлений от меня...'));
