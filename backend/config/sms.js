const winston = require('./winston'),
    request = require('request');

exports.sendMessage = (messageObject, callBack) => {
    if (global.config && global.config.env && global.config.env === 'development') {
        if (callBack) {
            return callBack(null, {});
        } else {
            return;
        }
    }
};