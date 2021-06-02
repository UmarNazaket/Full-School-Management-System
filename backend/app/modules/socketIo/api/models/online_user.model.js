'use strict'; // NOSONAR

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var globalOnlineUsers = new Schema({
    userId: { type: String },
    socketId: { type: String },
    appType: { type: String, default: 'android' },
    isAppInForeground: { type: Boolean, default: true }
});

mongoose.model('globalOnlineUsers', globalOnlineUsers);