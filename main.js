const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.AIRSOFT);

introduction = 'Привет, это команда Nissenger ✋\n\n';
introduction += 'Нашёл баг или есть чем поделиться с нами? Распиши тут, а мы обязательно прочтём и разберемся 😎\n\n';
introduction += 'Если хочешь, чтобы мы связались с тобой — оставь номер телефона, ник телеграм аккаунта или почту 🤖';

// thanks = 'Спасибо, что написал, для нас это очень важно. Как закончатся уроки, сразу возьмемся за это 🕓';

bot.start((ctx) => {
    ctx.reply(introduction);
});

bot.on('text', (ctx) => {
    if ((ctx.from.id === 1270570382 || ctx.from.id === 999657821) && ctx.chat.id == process.env.AIRSOFT_CHAT_ID) {
        if (ctx.message.reply_to_message) {
            const message = ctx.message.reply_to_message.text;
            const chatid = message.slice(message.indexOf("CHAT-ID:") + 9, message.indexOf("CHAT-FIRSTNAME:") - 1);

            ctx.telegram.sendMessage(chatid, ctx.message.text);
        }
    } else {
        report = '******\tReport\t******\n\n';
        report += `USER-ID: ${ctx.message.from.id}\n`;
        report += `USER-FIRSTNAME: ${ctx.from.first_name}\n`;
        report += `USER-USERNAME: ${ctx.from.username}\n\n`;
        report += `BOT: ${ctx.from.is_bot}\n\n`;
        report += `CHAT-ID: ${ctx.chat.id}\n`;
        report += `CHAT-FIRSTNAME: ${ctx.chat.first_name}\n`;
        report += `CHAT-USERNAME: ${ctx.chat.username}\n\n`;
        report += `Сообщение: "${ctx.message.text}"`;

        ctx.telegram.sendMessage(process.env.AIRSOFT_CHAT_ID, report);
    }
});

bot.launch();
