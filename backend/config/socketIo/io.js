/**
 * Created by Raza on 17/8/2017.
 */
'use strict'; // NOSONAR

global.io = null;

const winston = require('../winston'),
    chalk = require('chalk'),
    socketio = require('socket.io'),
    cookieParser = require('cookie-parser'),
    passportSocketIo = require('passport.socketio'),
    mongoAdapter = require('socket.io-adapter-mongo'),
    mongoStore = require('connect-mongo');
    session = require('express-session'),
    // redis = require('redis'),
    // redisAdapter = require('socket.io-redis'),
    // RedisStore = require('connect-redis')(session);

module.exports = function(server) {

    winston.info('Launching Socket.io server...');

    global.io = socketio(server, {
        pingInterval: 20000,
        pingTimeout: 15000,
        upgradeTimeout: 30000,
        transports: ['websocket', 'polling']
    });

    adapter = mongoAdapter(config.mongodb.uri);
    io.adapter(adapter);

    // let redisClient = redis.createClient({ host: config.redis.host, port: config.redis.port });

    // let adapter = redisAdapter({
    //     host: config.redis.host,
    //     port: config.redis.port,
    //     // db: config.redis.db,
    // });
    

    // io.adapter(adapter);

    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser, // the same middleware you registrer in express
        key: 'connect.sid', // connect.sid
        secret: config.session.secret,
        store: mongoStore.create({
            mongoUrl: config.mongodb.host + config.mongodb.db_name, //YOUR MONGODB URL
            // ttl: 14 * 24 * 60 * 60,
            autoRemove: 'native' 
        }),
        //  new RedisStore({
        //     host: config.redis.host,
        //     port: config.redis.port,
        //     client: global.redisClient,
        //     ttl: 14 * 24 * 60 * 60,
        //     clear_interval: 3600
        // }),
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 100 * 24 * 3600 * 1000,
        },
        success: onAuthorizeSuccess, // *optional* callback on success
        fail: onAuthorizeFail // *optional* callback on fail/error
    }));

    function onAuthorizeSuccess(data, accept) {
        winston.info(chalk.green.bold('passport.socketio: accepting socket connection...'));
        return accept();
    }

    function onAuthorizeFail(data, message, error, accept) {
        winston.error(chalk.red.bold('Socket connection denied because: ' + message));
        return accept(new Error(message));
    }

    return io;
};