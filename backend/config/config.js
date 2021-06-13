 var glob = require('glob'),
    path = require('path'),
    env = process.env.NODE_ENV || 'development',
    mongoose = require('mongoose'),
    asyncLib = require('async'),
    // _ = require('lodash'),
    winston = require('./winston'),
    // fs = require('fs'),
    autoIncrement = require('mongoose-auto-increment');

global.config = {};

module.exports = function(callback) {

    asyncLib.series([
        function(envCb) {
            // configuring the environment
            glob('config/env/**/*.json', function(err, files) {

                if (err) {
                    return envCb(err);
                } else {
                    // picking up the environment file
                    global.config = require(path.join(__dirname, 'env', env + '.json'));
                    // _.extend(config, JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')));
                    if (!config) {
                        return envCb('error occured while loading config file!');
                    } else {
                        winston.info('loaded config file:' + env);

                        var dbURI = config.mongodb.host + config.mongodb.db_name;
                        // var dbURI = "mongodb+srv://faizan:faizan@cluster0.m2t0w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
                        winston.info('Try to Connect MongoDb: ' + dbURI);
                        // make connection with mongodb
                        if (!mongoose.connection.readyState) {
                            mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, retryWrites: false });
                        } else
                            return envCb();

                        // when successfully connected
                        mongoose.connection.on('connected', function() {
                            winston.info('mongoose connection open to ' + dbURI);

                            // Enabling mongoose debug mode if required
                            mongoose.set('debug', config.mongodb.enableMongoDebugging);
                            return envCb();
                        });

                        autoIncrement.initialize(mongoose.connection);

                        // if the connection throws an error
                        mongoose.connection.on('error', function(err) {
                            //   if you get error for the first time when this gets started make sure to run mongod 
                            return envCb(err);
                        });

                        // when the connection is disconnected
                        mongoose.connection.on('disconnected', function() {
                            return envCb('mongoose connection disconnected');
                        });
                    }
                }
            });

        },
        function(modelsCb) {
            // load all models
            glob('app/modules/**/*.model.js', function(err, files) {

                if (err) {
                    return modelsCb(err);
                } else {
                    winston.info('models are loading ...');
                    files.forEach(function(file) {
                        require(path.join(__dirname, '../', file));
                        winston.info(file, 'is loaded');
                    });
                    require('./agenda');
                    return modelsCb();
                }
            });
        }
    ], function(err) {
        if (err) {
            return callback(err);
        } else {
            return callback();
        }
    });

};