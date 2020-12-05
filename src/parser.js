const  isNil  = require('lodash/isNil');

const getLines = (message) => {
    const lines = message.split('\n');
    if (lines.length < 3) {
        console.error('invalid message format');
        return;
    }
    return lines;
}

const getSystem = message => {
 const result = message.split(':');
    if(isNil(result) && result.length <2){
        return null;
    }
    return result[0] === 'system'?  result[1].trim() : null
}

const getWhat = message => {
    if(isNil(message)){
        return null;
    }
    const result = message.split(':');
    if(isNil(result) || result.length <2){
        return null;
    }
    return result[0].trim() === 'what'?  result[1].trim() : null
}

const getWhy = message => {
    const result = message.split(':');
    if(isNil(result) || result.length <2){
        return null;
    }
    return result[0] === 'why'?  result[1].trim() : null
}
const parse = (message, botUserId, username) => {
    const pureMessage = message.replace(botUserId,'').toLowerCase().trim();
    const lines = getLines(pureMessage);
    if(isNil(lines)){
        return null;
    }
    return {
        system: getSystem(lines[0]),
        who: username,
        why: getWhy(lines[1]),
        what: getWhat(lines[2]),
    }

}

module.exports = { parse }
