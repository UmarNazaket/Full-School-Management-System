'use strict';

const glob = require('glob');
const winston = require('./winston');

module.exports = (app) => {

    winston.info('routes are loading ...');
    let routePath = 'app/modules/**/*.routes.js';
    let version = '/api/v1/:lang';
    glob.sync(routePath).forEach(function(file) {
        require('../' + file)(app, version);
        winston.info(file + ' is loaded');
    });
};