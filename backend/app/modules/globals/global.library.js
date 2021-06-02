/**
 * Created by Raza Tayyab on 6/21/2017.
 */

const randomize = require('randomatic'),
    winston = require('../../../config/winston'),
    mailer = require('../../../config/mailer'),
    sms = require('../../../config/sms'),
    {
        validationResult
    } = require('express-validator'),
    {
        errorFormatterV2
    } = require('../../../config/validations'),
    agendaHelper = require('../agenda/agenda.helper'),
    socketHelper = require('../socketIo/api/socket.controller'),
    mongoose = require('mongoose');

let sendSocketDataAndNotification = (socketKeyAndNotificationType, socketRoom, userId, userType, notificationMessage, notificationData, resource, callback) => {
    let pushType = 1,
        socket = {
            resource
        };

    return socketHelper.getGlobalUserSocket(userId).then(socketConnected => {
        if (socketRoom) {
            socketHelper.emitToRoom(socketRoom, socketKeyAndNotificationType, {
                socket
            });
            if (callback && typeof(callback) == 'function') {
                return callback(null);
            }
        } else if (socketConnected) {
            if (socketConnected.socketId !== '' && socketHelper.checkIfSocketConnected(socketConnected.socketId) &&
                ((socketConnected.appType === 'android') || (socketConnected.appType === 'ios' && socketConnected.isAppInForeground))) {
                winston.info('Send Socket Event to User: ' + userId.toString() + ' & UserType: ' + userType);
                socketHelper.emitToSocket(socketKeyAndNotificationType, socketConnected.socketId, userId, {
                    socket
                });
                if (callback && typeof(callback) == 'function') {
                    return callback(null);
                }
            } else {
                winston.info('Send Push Event to User: ' + userId.toString() + ' & UserType' + userType);
                pushJob(userId, notificationMessage, socketKeyAndNotificationType, notificationData, socketKeyAndNotificationType, userType, pushType);
                if (callback && typeof(callback) == 'function') {
                    return callback(null);
                }
            }
        } else {
            winston.info('Send Push Event to User: ' + userId.toString() + ' & UserType' + userType);
            pushJob(userId, notificationMessage, socketKeyAndNotificationType, notificationData, socketKeyAndNotificationType, userType, pushType);
            if (callback && typeof(callback) == 'function') {
                return callback(null);
            }
        }
    });
};

let pushJob = (userId, message, messageType, resource, statusCase, userType, pushType, callback) => {
    agendaHelper.pushJob({
        userId: userId,
        message: message,
        messageType: messageType,
        resource: resource,
        statusCase: statusCase,
        userType: userType
    }, pushType);
    if (callback && typeof(callback) == 'function') {
        return callback(null);
    }
};

let sendEmail = (email, body, vars, template, directory) => {
    return new Promise((resolve, reject) => {
        mailer.sendEmail(email, body, vars, template, directory, (err) => {
            if (err) {
                return reject(err);
            } else {
                return resolve();
            }
        });
    });
};

let sendSMS = (data, cb) => {
    let smsObject = {
        to: data.phoneNumber,
        text: data.message
    };

    sms.sendMessage(smsObject, (err, res) => {
        if (err) {
            return cb(err);
        } else {
            return cb(null, res);
        }
    });
};

let generateCustomCode = (codeLength, expiryMinutes) => {

    const expTime = new Date();

    return {
        code: randomize('0', codeLength),
        expiryTime: addDays(expTime, expiryMinutes)
    };
};

let getValidationResult = async (message, req, res, next) => {

    const validationResults = await validationResult(req).formatWith(errorFormatterV2);

    if (!validationResults.isEmpty()) {
        let errors = validationResults.array();
        winston.error(message, errors[0].msg);
        return next(errors[0]);
    }
    return next();
};

module.exports = {
    sendSocketDataAndNotification,
    sendEmail,
    sendSMS,
    generateCustomCode,
    getValidationResult,
};