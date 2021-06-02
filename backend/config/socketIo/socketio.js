/**
 * Created by Raza on 17/8/2017.
 */
'use strict';

const winston = require('../winston'),
    chalk = require('chalk'),
    socketHelper = require('../../app/modules/socketIo/api/socket.controller'),
    jsonKeys = require('../../app/modules/socketIo/api/socket_keys.json');

module.exports = function(socket) {
    let userId = socket.request.user._id;
    // let flag = parseInt(socket.request._query['flag'] ? socket.request._query['flag'] : 0);
    const s = chalk.green('socket.io[' + userId + ']');

    socketHelper.addGlobalUserSocket(socket.request.user, socket);
    // io.sockets.connected[socket.id].emit(jsonKeys.connectionEstablished, { connectionEstablished: true });

    winston.info(s + chalk.green('++++++++CONNECTED+++++++ uid: ') + userId + ' socketid: ' + socket.id + ' name: ' + socket.request.user.userName);

    if (socket.request.user.userType === 'driver') {
        console.log('********************* Joining Map Room *******************');
        socketHelper.createRoom(jsonKeys.adminMapUpdate, socket);
    }

    socket.on('disconnect', function() {
        winston.log('info', chalk.red('******************* User Disconnected ******************'));
        winston.log('info', s + chalk.red('++++++++++++++ DISCONNECTED +++++++++++') + ' userName : ' + socket.request.user.userName + ' ' + socket.request.user._id);
        socketHelper.removeGlobalUserSocket(socket.id, socket.request.user._id);
        if (socket.request.user.userType === 'driver') {
            console.log('********************* Leaving Map Room *******************');
            socket.leave(jsonKeys.leaveMapRoom);
        }
    });

    // reconnection Failed
    socket.on('reconnect_failed', () => {
        winston.info('***************Reconnection Failed**********************');
        winston.info(chalk.red(socket.id));
        winston.info('***************Reconnection Failed**********************');
        socketHelper.removeGlobalUserSocket(socket.id, socket.request.user.id);
    });

    // connection restored
    socket.on('reconnect', () => {
        winston.info('***************Reconnection Success**********************');
        winston.info(chalk.red(socket.id));
        socketHelper.addGlobalUserSocket(socket.request.user.id, socket.id);
        winston.info('***************Reconnection Success**********************');
    });

    // connection restored
    socket.on('reconnecting', () => {
        winston.info('*************** Reconnection Attempt **********************');
        winston.info(chalk.red(socket.id));
        winston.info('*************** Reconnection Attempt **********************');
    });

    // Custom Sockets Methods
    socket.on(jsonKeys.locationUpdate, (data, acknowledgement) => {
        winston.info('*************** Socket Location Update Method **********************');
        winston.log('debug', 'Driver coordinates: ' + JSON.stringify(data));
    });
};