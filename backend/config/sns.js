/*
    Programmer: Raza Tayyab
    Date: June 06, 2018.
    This file will be used for push notifications
*/

const aws = require('aws-sdk');

let initialize = () => {
    aws.config.update({
        accessKeyId: config.sns.access.accessKeyId,
        secretAccessKey: config.sns.access.secretAccessKey
    });

    aws.config.region = config.sns.access.region;
    let _SNS = new aws.SNS({
        sns: '2010-03-31'
    });

    return _SNS;
};

let androidPlatformApplicationArn = () => {
    return config.platFormApplicationArn.gcm;
};

let iosPlatformApplicationArn = userType => {
    if (userType.toLowerCase() === 'user') {
        return config.platFormApplicationArn.apn_user;
    } else if (userType.toLowerCase() === 'driver') {
        return config.platFormApplicationArn.apn_driver;
    } else {
        return;
    }
};

let platFormSubscriptionARN = (userType) => {
    if (userType === 'user') {
        return config.sns.promotionSubscriptions;
    } else if (userType === 'sp') {
        return;
    } else {
        return;
    }
};

module.exports = {
    androidPlatformApplicationArn,
    iosPlatformApplicationArn,
    initialize,
    platFormSubscriptionARN,
};