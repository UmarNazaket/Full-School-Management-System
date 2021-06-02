
'use strict'; // NOSONAR
const winston = require('../../../../config/winston'),
    chalk = require('chalk'),
    mongoose = require('mongoose'),
    globalOnlineUsers = mongoose.model('globalOnlineUsers');

let createRoom = (Secret, socket) => {
    socket.join(Secret);
};

let addGlobalUserSocket = (user, socket) => {
    if (user) {
        return globalOnlineUsers.updateOne({ userId: user._id }, { $set: { userId: user._id, socketId: socket.id, appType: user.deviceType } }, { setDefaultsOnInsert: true, upsert: true }).then((updated) => {

        }).catch(function(err) {
            winston.error(chalk.red('There was error adding global online user'));
            winston.error(err);
        });
    } else {
        return null;
    }
};

let removeGlobalUserSocket = async (socketId, userId) => {
    try {
        const socket = global.io.of('/').sockets.get(socketId);
        if (!socket) {
            return globalOnlineUsers.updateOne({ userId: userId, socketId: socketId }, { $set: { socketId: '' } }).then(function(user) {
                return user;
            }).catch(function(err) {
                winston.error(chalk.red('There was error removing socket from mongodb'));
                winston.error(err);
            });
        } else {
            winston.info(chalk.green('socket Id is still connected'));
        }
    } catch (err) {
        winston.error(err);
    }
};

let getGlobalUserSocket = (userId) => {
    if (userId) {
        return globalOnlineUsers.findOne({ userId: userId }).then((sockets) => {
            if (sockets) {
                return sockets;
            } else {
                return null;
            }
        });
    } else {
        return null;
    }
};

let emitToSocket = (key, socketId, userId, socketData) => {
    const socket = global.io.of('/').sockets.get(socketId);
    if (socket) {
        winston.info(chalk.green('Emiting to User Socket: ' + socketId + ' &key=' + key));
        socket.emit(key, socketData, (response) => {
            winston.info(chalk.green('User Socket Acknowledgement : ' + response.status));
        });
        return;
    } else {
        winston.error(chalk.red('Disconnected User SocketId=' + socketId));
        return removeGlobalUserSocket(socketId, userId);
    }
};

let emitToRoom = (room, key, socketData) => {
    winston.info('Emiting to Room: ' + room + ' &key=' + key + ' & data=' + JSON.stringify(socketData));
    global.io.to(room).emit(key, socketData);
    return;
};

let broadcastToAll = (key, socketData) => {
    global.io.sockets.emit(key, socketData);
    return;
};

let checkIfSocketConnected = (socketId) => {
    const socket = global.io.of('/').sockets.get(socketId);
    if (socket) {
        return socket;
    } else {
        return null;
    }
};

let updateAppStatus = (userId, appType, isAppInForeground) => {
    return globalOnlineUsers.updateOne({ userId: userId }, { $set: { appType: appType, isAppInForeground: isAppInForeground } })
        .then(user => {
            return user;
        }).catch(err => {
            winston.error(chalk.red('There was error updating app status'));
            winston.error(err);
        });
};

module.exports = {
    createRoom,
    addGlobalUserSocket,
    removeGlobalUserSocket,
    getGlobalUserSocket,
    emitToSocket,
    emitToRoom,
    broadcastToAll,
    checkIfSocketConnected,
    updateAppStatus
};