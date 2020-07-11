'use strict';
require('dotenv').config({
  path: '.env'
});
const path = require('path');
const serverless = require('serverless-http');

const express = require('express');
const app = express();
const Telegram = require('telegraf/telegram');
const telegram = new Telegram(process.env.BOT_TOKEN, {
    agent: null,
    webhookReply: true,
});
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use((ctx) => {
    telegram.sendMessage(ctx.from.id, `Your Telegram id: ${ctx.from.id}`);
});
bot.startPolling();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

  app.use(express.json());

  app.get('/', (req, res) => {
    telegram.sendMessage(
      process.env.ARTHUR_ID,
      `Hello, bro!`,
    );
    res.send('ok')
  });


module.exports = app;
module.exports.handler = serverless(app);
