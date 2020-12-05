const { server } = require("./slack");

const start = () => {
  try {
    server();
  } catch (error) {
    console.log("SlackBot could not be started! 😭", error);
  }
};

start();
