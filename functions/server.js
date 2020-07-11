"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

const router = express.Router();

require("dotenv").config({
  path: ".env",
});
const Telegram = require("telegraf/telegram");
const BOT_TOKEN = "1336920146:AAF9HoiPQl42WnQ3DAlDnDyO-CdTuws6ncg";
const telegram = new Telegram(BOT_TOKEN, {
  agent: null,
  webhookReply: true,
});
const Telegraf = require("telegraf");
const bot = new Telegraf(BOT_TOKEN);
bot.use((ctx) => {
  telegram.sendMessage(ctx.from.id, `Your Telegram id: ${ctx.from.id}`);
});
bot.startPolling();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

const receiverId = "19263838";

router.get("/", (req, res) => {
  telegram.sendMessage(receiverId, `Hello, bro!`);
  res.send("ok");

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/submitContactInfo", (req, res) => {
  telegram.sendMessage(
    receiverId,
    `Name: ${req.body.name}
    Email Address: ${req.body.email}
    Subject: ${req.body.subject}
    Message: ${req.body.message}`,
  );
  res.send('ok')
};

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
