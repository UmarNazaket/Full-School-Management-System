/**
 * Created by Raza Tayyab on 7/14/2017.
 */

const winston = require('./winston'),
    Agenda = require('agenda'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    notifications = require('./notifications');

let agenda = new Agenda({
    db: { address: config.mongodb.host + config.mongodb.db_name },
    maxConcurrency: 10,
    lockLimit: 1,
    defaultLockLimit: 1,
    defaultConcurrency: 1,
    processEvery: '10 seconds',
    defaultLockLifetime: 120000
});

// Push Notifications Job
agenda.define('pushNotification', { priority: 'high' }, job => {
    winston.info(chalk.green('push job received'));
    const information = job.attrs.data.notificationInfo;

    let messageType = information.messageType || '',
        userId = information.userId || '123',
        userType = information.userType.toLowerCase() || 'user',
        message = information.message || '',
        senderName = information.senderName || '',
        badge = information.badge || 0,
        resource = (information.resource) ? information.resource : '',
        status = information.statusCase || '';

    winston.info(chalk.green('Agenda triggered for General notification for user: ' + userId));
    let snsToken = '',
        sessionId = '',
        promise = new Promise((resolve, reject) => {
            if (userType === 'user') {
                return userAccount.findOne({ _id: userId }).then(account => {
                    if (account) {
                        snsToken = account.arnToken;
                        sessionId = account.sessionId;
                    }
                    return resolve();
                });
            } else if (userType === 'driver') {
                return drivers.findOne({ _id: userId }).then(account => {
                    if (account) {
                        snsToken = account.arnToken;
                        sessionId = account.sessionId;
                    }
                    return resolve();
                });
            }
        });
    promise.then(() => {
        if ((snsToken && snsToken !== '') && (sessionId && sessionId !== '')) {
            notifications.sendPush(snsToken, message, messageType, messageType, senderName, badge, resource, status);
        }
    });
});

agenda.on('success:pushNotification', job => {
    winston.info(chalk.green('push sending success to ' + job.attrs.data.notificationInfo.userId));
    job.remove();
});

agenda.on('fail:pushNotification', job => {
    winston.info(chalk.red('Push sending failed to user ' + job.attrs.data.notificationInfo.userId));
});

agenda.on('ready', async () => {
    winston.info('Agenda Started.');
    await agenda.start();
    // await agenda.every('1 minutes', 'RentACarJobPosting');
});

agenda.on('error', (err) => {
    winston.error(err);
});