/*eslint-disable no-undef*/
const axios = require("axios");
const dotenv = require("dotenv");
const moment = require('moment');

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_URL =  process.env.GITHUB_URL;
const COMMITTER_NAME = process.env.COMMITTER_NAME
const COMMITTER_EMAIL = process.env.COMMITTER_EMAIL

const fetchGitHubData = async () => {
  try {
    const response = await axios.get(GITHUB_URL, { headers: { 'Authorization': `token ${GITHUB_TOKEN}` } });
   // console.log( response); // this will reveal GITHUB_TOKEN so only use locally
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getFileContents = async url => {
  try {
    const response = await axios.get(url);
    //console.log(`Response body: ` + response.data); //  this will reveal GITHUB_TOKEN so only use locally
    return response.data;
  } catch (error) {
    console.log(error);
    throw error
  }
};

const pushCommit = async (url, who, why, what) => {

  const date_time = moment().format('YYYY-MM-DD:HH:mm:ss');
  const filename = "/changeLog-" + date_time + ".md"
  const commitUrl = url + filename

  const commitMessage =
      `Who: ${who} \n
  Why: ${why} \n
  What: ${what} \n
  When: ${date_time} \n
  `
  const encodedCommitMessage = Buffer.from(commitMessage).toString('base64')

  try {
    const response = await axios.put(commitUrl, {"message": "auto update changeLog", "committer": {"name": `${COMMITTER_NAME}`, "email": `${COMMITTER_EMAIL}`}, "content": encodedCommitMessage, branch: "master"}, { headers: { 'Authorization': `token ${GITHUB_TOKEN}` }});
    // console.log( response);
    return response;
  } catch (error) {
    console.log(error);
    throw error
  }
};


module.exports = { fetchGitHubData, getFileContents, pushCommit };
