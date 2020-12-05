const isBotMessage = message => {
  return message.subtype && message.subtype === 'bot_message';
};

const isMessage = message => {
  return message.text && message.type === 'message';
};

const isMessageInChannel = (message, channelId) => {
  const formattedChannelId = `<@${message.channel}>`;
  return formattedChannelId === channelId;
};

const isMessageToBot = (message, botUserId) => {
  return message.text.includes(botUserId);
};

const isRepliedMessage = message => {
  return message.subtype === 'message_replied';
};

module.exports = { isBotMessage, isMessage, isMessageInChannel, isMessageToBot, isRepliedMessage };
