require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const { OPERATIONS_LIST } = require('./data');
const { initMainList } = require('./init');

const { listOfCommands } = require('./commands');

const { TG_TOKEN } = process.env;

const token = TG_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/echo (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"
//   bot.sendMessage(chatId, resp);
// });

bot.setMyCommands(listOfCommands);

initMainList(OPERATIONS_LIST.data);

const listOfSize = [[{ text: '104' }], [{ text: '110' }], [{ text: '116' }]];

const listOfOperation = [
  [
    {
      text: '36. 1.Обтшити п/п  по зрізу  кишені підкладкою з обшивкою  2.Прокласти строчку в "чистий край"  по шву пришивання. ',
    },
  ],
  [
    {
      text: '61. Настрочити бірки на шов сидіння на відстані 3см від шва пришивання пояса.',
    },
  ],
  [
    {
      text: '21. Виконати  закріпки на  стикові строчек поясної машини (2шт). В строчку.',
    },
  ],
];

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  //   console.log(msg);

  if (text === '/start') {
    // console.log(OPERATIONS_LIST.getListModelByChatID(chatId));
    await bot.sendMessage(chatId, 'Оберіть модель', {
      reply_markup: {
        keyboard: OPERATIONS_LIST.getListModelsByChatID(chatId),
      },
    });
  }
  if (text.slice(0, 5) === 'БД124') {
    await bot.sendMessage(chatId, 'Оберіть розмір.', {
      reply_markup: {
        keyboard: OPERATIONS_LIST.getListSKUsByChatIdAndVendorCode(
          chatId,
          '011240011'
        ),
      },
    });
  }
  if (text === '104') {
    await bot.sendMessage(chatId, 'Оберіть операцію.', {
      reply_markup: {
        keyboard: listOfOperation,
      },
    });
  }
  //  bot.sendMessage(chatId, 'Received your message');
});

bot.on('callback_query', msg => {
  console.log(msg);
});
