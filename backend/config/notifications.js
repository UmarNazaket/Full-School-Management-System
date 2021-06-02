/**
 * Created by Raza Tayyab on 7/11/2017.
 */

'use strict'; // NO SONAR

const SNS = require('./sns'),
    _SNS = SNS.initialize(),
    promise = require('bluebird'),
    winston = require('./winston');

let generateEndPoint = req => {
    if (!req.body.deviceToken) {
        return promise.resolve();
    }
    return makeEndPointForNotifications(req.body.deviceType, req.body.deviceToken, req.user.userType)
        .catch(err => {
            winston.error(err);
            return promise.reject(err);
        });
};

let makeEndPointForNotifications = (deviceType, deviceToken, userType) => {
    let applicationArn = '';
    if (deviceType === 'android') {
        applicationArn = SNS.androidPlatformApplicationArn();
    } else if (deviceType === 'ios') {
        applicationArn = SNS.iosPlatformApplicationArn(userType);
    }
    return new promise((resolve, reject) => {
        _SNS.createPlatformEndpoint({
            PlatformApplicationArn: applicationArn,
            Token: deviceToken
        }, (err, data) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(data.EndpointArn);
            }
        });
    });
};

let makeEndPointForAndroidUser = (deviceToken, role) => {
    let applicationArn = SNS.androidPlatformApplicationArn();

    return new promise(function(resolve, reject) {
        _SNS.createPlatformEndpoint({
            PlatformApplicationArn: applicationArn,
            Token: deviceToken
        }, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data.EndpointArn);
            }
        });
    });
};

let makeEndPointForIOSUser = (deviceToken, role) => {
    let arn = '';
    if (role === 'user' || role === 'USER') {
        arn = SNS.iosPlatformApplicationArn().user;
    } else if (role === 'Driver' || role === 'DRIVER') {
        arn = SNS.iosPlatformApplicationArn().driver;
    } else {
        return new promise((resolve, reject) => {
            return reject({
                message: 'Invalid Role provide for SNS. It should be either User/Driver.'
            });
        });
    }

    return new promise(function(resolve, reject) {
        _SNS.createPlatformEndpoint({
            PlatformApplicationArn: arn,
            Token: deviceToken
        }, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data.EndpointArn);
            }
        });
    });

};

let sendPush = (endPoint, message, messageType, type, senderName, badgeCount, resourceId, status) => {
    winston.info('sending push to', endPoint);

    let data = {
            alert: message,
            sound: 'default',
            badge: badgeCount,
            resource: resourceId,
            type: type,
            senderName: senderName
        },
        payload = {
            default: message,
            APNS: {
                aps: data
            },
            APNS_SANDBOX: {
                aps: data
            },
            GCM: {
                data: data,
                priority: 'high'
            }
        };

    payload.APNS = JSON.stringify(payload.APNS);
    payload.APNS_SANDBOX = JSON.stringify(payload.APNS_SANDBOX);
    payload.GCM = JSON.stringify(payload.GCM);
    payload = JSON.stringify(payload);

    console.log(payload)
    return new promise(resolve => {
        _SNS.publish({
            Message: payload,
            /* required */
            TargetArn: endPoint,
            MessageStructure: 'json'
        }, (err, data) => {
            if (err && err.code === 'EndpointDisabled') {
                // if error remove endPoint
                winston.info('error', err);
            } else if (err) {
                winston.info('error', err);
            } // an error occurred
            else {
                winston.info('success', data);
                return resolve(data);
            }
        });
    });
};

let pushDeviceNotificationDetail = (sessionId, userId, endPoint, deviceType, deviceToken) => {

    let deviceTypeId = 1;

    if (deviceType === 'android') {
        deviceTypeId = 2;
    } else {
        deviceTypeId = 1;
    }

    return PushNotification.findOneAndUpdate({
        sid: sessionId,
        user: userId
    }, {
        $set: {
            sid: sessionId,
            user: userId,
            arn: endPoint,
            deviceType: deviceTypeId,
            deviceToken: deviceToken
        }
    }, {
        upsert: true
    }).then(dataSaved => {
        winston.info('Push Notification Data Saved.');
    }).catch(err => {
        winston.error(err);
    });
};

let subscriptionToTopic = (userType, userSnsEndPoint) => {

    let subscriptionArn = SNS.platFormSubscriptionARN(userType);

    return new Promise((resolve, reject) => {
        if (subscriptionArn === '') {
            return resolve('No Subscription ARN Key Found');
        } else {
            let params = {
                Protocol: 'application',
                TopicArn: subscriptionArn,
                Endpoint: userSnsEndPoint,
                ReturnSubscriptionArn: true
            };

            console.log(params);
            _SNS.subscribe(params, (err, data) => {
                console.log(err);
                console.log(data);
                if (err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        }
    });
};

let publishMessageToTopic = (payload, userType) => {

    let subscriptionArn = SNS.platFormSubscriptionARN(userType);

    return new Promise((resolve, reject) => {
        if (subscriptionArn === '') {
            return resolve('No Subscription ARN Key Found');
        } else {
            let params = {
                Message: payload,
                TopicArn: subscriptionArn,
                MessageStructure: 'json',
            };
            _SNS.publish(params, (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        }
    });
};

let destroyEndPoint = (endPoint, subscriptionArn) => {
    _SNS.deleteEndpoint({ EndpointArn: endPoint });
    if (subscriptionArn !== '') {
        _SNS.unsubscribe({ SubscriptionArn: subscriptionArn });
    }
    return;
};

module.exports = {
    generateEndPoint,
    makeEndPointForAndroidUser,
    makeEndPointForIOSUser,
    sendPush,
    pushDeviceNotificationDetail,
    subscriptionToTopic,
    publishMessageToTopic,
    destroyEndPoint,
};