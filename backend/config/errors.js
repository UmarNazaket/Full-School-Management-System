/**
 * Created by Raza Tayyab on 8/12/2017.
 */
const glob = require('glob');
const _ = require('lodash');
const fs = require('fs'),
    winston = require('./winston');

winston.info('error messages are loading ...');
let routePath = 'app/modules/**/*.errors.json';
// initialising with common error message objects
let errorObject = {
    1: {
        'msg': {
            'EN': 'User does not exist.'
        }
    },
    2: {
        'msg': {
            'EN': 'Incorrect password.'
        }
    },
    3: {
        'msg': {
            'EN': 'User is not authenticated.'
        }
    },
    4: {
        'msg': {
            'EN': 'User is not authorized to visit the api.'
        }
    },
    10: {
        'msg': {
            'EN': 'Street Address is required.'
        }
    },
    11: {
        'msg': {
            'EN': 'Postal Code is required.'
        }
    },
    12: {
        'msg': {
            'EN': 'City is required.'
        }
    },
    13: {
        'msg': {
            'EN': 'State is required.'
        }
    },
    14: {
        'msg': {
            'EN': 'Country is required.'
        }
    },
};

glob.sync(routePath).forEach(function(file) {
    _.extend(errorObject, JSON.parse(fs.readFileSync(file, 'utf-8')));
    winston.info(file + ' is loaded');
});

module.exports = errorObject;