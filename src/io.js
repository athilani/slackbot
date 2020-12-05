const { fetchGitHubData, getFileContents, pushCommit } = require("./github.js");
const find = require('lodash/find');
const isNil= require('lodash/isNil');

const readRepoUrl = async (system) =>{
    return await fetchGitHubData();
}

const process = async ({system, who, why, what}, thread, callback) => {
    try {
        const repo = await readRepoUrl()
        const gitRepoDataUrl = repo.data.download_url;
        const content = await getFileContents(gitRepoDataUrl);

        const matched = find(content, function (o) {
            return o.name.toLowerCase() === system
        })
        const repoUrl = matched.description;
        callback(repoUrl, thread);
        await pushCommit(repoUrl, who, why, what)
        callback("successfully push change log to git repository", thread);
    } catch (e) {
        console.log(e)
        const errorMessage = 'error processing request';
        callback(errorMessage, thread);
    }
}
module.exports = { process }

