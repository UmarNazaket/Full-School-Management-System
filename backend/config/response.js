/**
 * Created by Raza Tayyab on 7/5/2017.
 */

'use strict'; // NOSONAR
const errors = require('./errors'),
    winston = require('./winston');

let successResponse = (res, data) => {
    data.response = 200;
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'quality' || process.env.NODE_ENV === 'staging') {
        winston.info(JSON.stringify(data.data));
    }
    res.json(data);
};

let errorResponse = (res, err) => {
    res.json({
        success: 0,
        data: {},
        message: err,
        response: 304
    });
};

let errorResponseWithData = (req, res, err, data) => {
    res.json({
        success: 0,
        message: errors[err.msgCode].msg.EN,
        response: 400,
        data: data
    });
};

module.exports = {
    successResponse,
    errorResponse,
    errorResponseWithData
};