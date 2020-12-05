const Slackbot = require("slackbots");
const dotenv = require("dotenv");
const parser = require("./parser");
const io = require("./io");
const axios = require("axios");
const { isBotMessage, isMessage, isMessageInChannel, isMessageToBot, isRepliedMessage } = require("./helpers");

dotenv.config();

const getUserFullName = async (message) => {
  const SLACK_API=process.env.SLACK_API
  const SLACK_TOKEN = process.env.SLACK_TOKEN;
  const SLACK_API_USER = `${SLACK_API}` + "?user=" + message.user;
  try {
    const response = await axios.get(SLACK_API_USER, { headers: { 'Authorization': `Bearer ${SLACK_TOKEN}` } });
    return response.data.user.profile.real_name;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const server = () => {
  const CHANNEL_ID = `<@${process.env.CHANNEL_ID}>`;
  const CHANNEL_NAME = process.env.CHANNEL_NAME;
  const BOT_NAME = process.env.BOT_NAME;
  const BOT_USER_ID = `<@${process.env.BOT_USER_ID}>`;
//   const BOT_OWNER_USERNAME = process.env.BOT_OWNER_USERNAME; // not used anywhere
  const SLACK_TOKEN = process.env.SLACK_TOKEN;

  const bot = new Slackbot({
    token: SLACK_TOKEN,
    name: BOT_NAME
  });

  bot.on("start", () => {
    console.log(`${BOT_NAME} is online and listening in channel "${CHANNEL_NAME}"`);
  });

  bot.on("error", error => {
    console.log(error);
  });

  bot.on("message", async message => {
    console.log(message);

    if (
      isMessageInChannel(message, CHANNEL_ID) &&
      isMessage(message) &&
      isMessageToBot(message, BOT_USER_ID) &&
      !isBotMessage(message) &&
      !isRepliedMessage(message)
    ) {
      const username = await getUserFullName(message)
      const result = parser.parse(message.text, BOT_USER_ID, username)
      const repo = result? io.process(result, message.ts, sendMessage): sendMessage('Invalid message format', message.ts)
      console.log(`Answer posted.`);
    }
  });

  const sendMessage = (message, thread) => {
    console.log(`Posting answer: ` + message);
    const params = {
      icon_emoji: ":SlackBot-logo:",
      thread_ts: thread
    };
    bot.postMessageToChannel(CHANNEL_NAME, message, params);
  };
};

module.exports = { server };
